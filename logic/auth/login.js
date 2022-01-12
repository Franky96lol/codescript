const config = require("../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");
const authenticator = require("./authenticator.js");

const bcrypt = require("bcryptjs");

//funcion de logeo de usuario
function login(req, res, next) {
  //recopilamos los datos insertados
  if (!req.body) return;
  let username, password, token;
  try {
    username = req.body.username;
    password = req.body.password;
  } catch (err) {
    return {
      status: "Error",
      message:
        "Ups!\nA ocurrido un error. Si este problema continua , reportelo.",
      error: err
    };
  }

  /*verificamos si los tokens coinciden
  if (token != config.APPTOKEN)
    return {
      status: false,
      message: "Esta usando una aplicación obsoleta o de terceros. Verifique."
    };*/

  //comprobamos si existe el usuario
  if (!fs.existsSync(config.DB + "/accounts/" + username + ".json"))
    return {
      status: false,
      message: "Nombre de usuario o contraseña incorrectos."
    };
  //si existe almacenamos los datos momentaneamente
  let account = helper.readFile(config.DB + "/accounts/" + username + ".json");
  if(!account) return {status : false , message : "Ups! \nOcurrio un error"};
  //comprobamos si esta verificado su correo
  if(!account.verified) return {status : false , message : "Debe verificar su correo."};
  
  //comprobamos si las contraseñas coinciden
  if (!bcrypt.compareSync(password, account.password))
    return {
      status: false,
      message: "Nombre de usuario o contraseña incorrectos."
    };
  //si las contraseñas coinciden damos acceso al usuario
  //comprobamos si la cuenta tiene un id
  if (account.id == null || account.id == undefined)
    return {
      status: false,
      message: "La cuenta se encuentra corrupta. Reporte este error."
    };
  return { status: true, message: authenticator.generateToken(account.id) };
}

module.exports = login;
