//Configuracion principal del servidor
const config = {
  URL: "https://amber-living-rhythm.glitch.me",
  PORT: process.env.PORT || 8081, //puerto de escucha
  DIRNAME: __dirname, //directorio raiz
  DB: __dirname + "/database", //path a la base de datos
  LOGIC: __dirname + "/logic", //path a la logica
  RES : __dirname + "/res", //path a los recursos
  TOKEN: {
    secret: process.env.TOKEN,
    expire: "6h"
  },
  APPTOKEN: process.env.APPTOKEN,
  server: {
    version: "v0.0.1"
  }
};

module.exports = config;
