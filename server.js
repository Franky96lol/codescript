//inicializacion de modulos
const config = require("./config.js");
const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = require(config.LOGIC + "/router.js");
const helper = require(config.LOGIC + "/helper.js");
const bodyParser = require("body-parser");
const auth = require(config.LOGIC + "/auth/authenticator.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
app.use("/", router);

//rutas publicas
app.use(express.static(config.DIRNAME + '/res'));

//controlador de rutas
app.use((req, res) => res.sendFile(config.RES + "/pages/error404.html"));

//inicializacion del servidor
server.listen(config.PORT, () =>
  console.log("Server running on port " + config.PORT)
);

//variable contenedora de los users
global.users = {};

/*
let accs = fs.readdirSync(config.DB + '/accounts/');
let nicks = fs.readdirSync(config.DB + '/nicknames/');
for(let acc of accs){
    if(acc!= "test.json")fs.unlinkSync(config.DB + '/accounts/' + acc);
}
for(let nick of nicks){
    if(nick != "test.json")fs.unlinkSync(config.DB + '/nicknames/' + nick);
}*/

io.on("connection", function(socket) {
    if(!socket.handshake.query) {
      socket.disconnect("Error de session!"); 
      return;
    };
    if(!socket.handshake.query.token || !socket.handshake.query.token) {
      socket.disconnect("Error de session!"); 
      return;
    };
    if(!auth.verifyToken(socket.handshake.query.token)){
      socket.disconnect("Session agotada!"); 
      return;
    };
    let username = socket.handshake.query.username;
    if(!global.users[username]){
      if(fs.existsSync(config.DB + "/accounts/" + username + ".json")){
          global.users[username] = helper.readFile(config.DB + '/accounts/' + username + ".json");
      }else{
         socket.diconnect("Usuario no encontrado");
        return;
      }
    }
    
});
