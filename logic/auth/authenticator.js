const config = require("../../config.js");

const jwt = require("jsonwebtoken");

//funcion generadora de tokens
function generateToken(_id) {
  if (_id == null || _id == undefined) return null; //si el id insertado es nulo o indefinido retornamos null
  return jwt.sign({ id: _id }, config.TOKEN.secret, {
    expiresIn: config.TOKEN.expire
  }); //generamos el token almacenando el id de usuario en el
}

//verificacion de token
function verifyToken(_token) {
  let token;

  if (_token != undefined) token = _token;
 // if (req.body.token != undefined) token = req.body.token;
  if (token == null || token == undefined) return false; //si el token es nulo o indefinido retornamos false
  return jwt.verify(token, config.TOKEN.secret, err => {
    if (err) return false; //si ocurre un error al parsear el token retornamos false
    return jwt.decode(token).id; //si el token es verificado retornamos el id decodificado
  });
}

module.exports = { generateToken, verifyToken };
