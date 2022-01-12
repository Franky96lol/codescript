//Caracteres posibles
const possible =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//funcion para obtener un caracter aleatorio
function getARandomOneInRange() {
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

//funcion para generar un string aleatorio
function generateId(num) {
  let token = "";
  for (let x = 0; x < num; x++) {
    token += getARandomOneInRange();
  }

  return "a" + token;
}
module.exports = generateId;
