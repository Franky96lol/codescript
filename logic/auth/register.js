const config = require("../../config.js");
const fs = require("fs");
const helper = require(config.LOGIC + "/helper.js");
const idGenerator = require(config.LOGIC + "/id.generator.js");
const bcrypt = require("bcryptjs");

//funcion de registro de usuario
function register(req, res, next) {
  //recopilamos la informacion del cliente enviada mediante POST

  let username, email, password, rpassword, token;
  try {
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    rpassword = req.body.rpassword;
  } catch (err) {
    return {
      message: "error",
      submessage:
        "Ups! \nOcurrio un error al intentar crear la cuenta.\n" +
        "Por favor, si el problema persiste reportelo.",
      error: err
    };
  }

  //verificamos si los tokens coinciden
 /* if (token != config.APPTOKEN)
    return {
      status: false,
      message: "Esta usando una aplicación obsoleta o de terceros. Verifique."
    };*/
  if (username == undefined)
    //verificamos que no existan datos indefinidos
    return {
      status: false,
      message: "El nombre de usuario  no puede estar vacio."
    };
  if (email == undefined)
    return { status: false, message: "El correo no puede estar vacio." };
  if (password == undefined)
    return {
      status: false,
      message: "La contraseña no puede estar vacia."
    };

  //si no existen datos indefinidos pasamos a verificar los datos
  //verificamos que la cuenta no esta en uso
  if (fs.existsSync(config.DB + "/accounts/" + username + ".json"))
    return {
      status: false,
      message: "Esta cuenta se encuentra en uso.\nIntente otro nombre."
    };
  //si la cuenta no existe procedemos a verificar que los passwords coincidan y tengan la longitud minima
  if (password.length < 8)
    return {
      status: false,
      message: "La contraseña debe tener al menos 8 caracteres."
    };
  if (password != rpassword)
    return {
      status: false,
      message: "Las contraseñas insertadas no coinciden."
    };
  //si las contraseñas coinciden y tienen la longitud minima verificamos que el correo sea un correo valido
  if (!validateEmail(email))
    return {
      status: false,
      message: "El correo insertado no posee un formato valido."
    };
  //si es un correo valido verificamos que ya no exista una cuenta con ese correo
  if (existsEmail(email))
    return {
      status: false,
      message: "El correo insertado ya se encuentra en uso. Intente otro."
    };
  //si todo es correcto pasamos los valores a el modelo de la cuenta
  let char = /^[a-zA-Z0-9]+$/;
  if (!char.test(username)) {
    return {
      status: false,
      message: "El nombre de usuarios posee caracteres invalidos."
    };
  }
  //modelo basico de cuenta de usuario
  const account = {
    id: "",
    username: "",
    nickname: "",
    pic : "/basic.jpg",
    email: "",
    password: "",
    followers : [],
    following : [],
    repos : [],
    works : [],
    likes : 0,
    firstEnter: false,
    suscribed: false,
    verified: false, //cuenta verificada (por defecto false)
    acclevel: 1 //0 = baneado , 1 = usuario regular , 2 = maestro , 3 = moderador , 4 = admin
  };
  account.id = idGenerator(12); //generamos el id unico de 12 caracteres alfanumericos
  account.username = username;
  account.nickname = "fpj_" + idGenerator(6);
  account.color = generateColor();
  account.email = email;
  account.password = bcrypt.hashSync(password, 10); //generamos un hash para mayor proteccion de la contraseña

  //escribimos en la base de datos los datos del usuario
  try {
    helper.writeFile(config.DB + "/accounts/" + username + ".json", account);

    setEmail(email);
    const nodemailer = require("nodemailer");
    const transport = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: "fireshoot.dev@gmail.com",
        pass: "hnm4Pz9h"
      }
    });

    const message = {
      from: "codescript-team@email.com",
      to: email,
      subject: "Verificación de Cuenta.",
      html:
      ` 
      <div bgcolor="#ff0000" align="center"> 
      <hr> 
      <h1 align="center"> Verificación de correo electrónico. </h1> 
      <p align="center"> Al verificar el correo usted acepta los Términos y Condiciones de ScriptCode.</p> 
      <br> 
      <a class="boton" href="` + config.URL + '/auth/verifyMail/' + username + '/' + account.id + `"> • Verificar Correo </a> 
      <br> 
      <br> 
      <hr> 
      <p>  </p> 
      </div> `
      
    };

    transport.sendMail(message, function(err, info) {
      if (err) {
      } else {
      }
    });

    //si se escribe correctamente hacemos saber al usuario de que se ah registrado correctamente
    return { status: true, message: "Se a registrado correctamente. \nSe a enviado a su correo el link de activación de su cuenta." };
  } catch (err) {
    //capturamos si ocurre un error y lo enviamos a la consola y al usuario (esperemos nunca llegar aqui)
    console.log(err);
    return {
      status: "error",
      message:
        "Ups! \nA ocurrido un error.\nSi este error persite , por favor reportelo.",
      error: err
    };
  }
}

const generateColor = () => {
  const randomColor = (
    Math.floor(Math.random() * (16777215 - 5000000)) + 5000000
  ).toString(16);
  return randomColor;
};
//funcion para validar que un correo tenga el formato apropiado
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//funcion para verificar que un correo no esta en uso
function existsEmail(_email) {
  let emails = helper.readFile(config.DB + "/emails.json");

  for (let email of emails) {
    if (email == _email) return true;
  }
  return false;
}

//funcion para insertar el nuevo correo de usuario en la lista de correos
function setEmail(_email) {
  let emails = helper.readFile(config.DB + "/emails.json");

  emails.push(_email);
  helper.writeFile(config.DB + "/emails.json", emails);
}

module.exports = register;
