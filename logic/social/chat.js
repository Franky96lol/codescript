const config = require("../../config.js");

const chat = (io, socket, username) => {
  socket.on("join_chat", room => {
    socket.join(room);
    console.log(username + " se ah unido al chat " + room);
  });

  socket.on("message", data => {
    if(global.users[username] == undefined) return;
    io.to(data.room).emit("message", {
      room: data.room,
      type : data.type,
      from: global.users[username].nickname,
      message: filterWords(data.message),
      color: global.users[username].color,
      time : new Date().getTime()
    });
  });
};

function filterWords(message) {
  const badwords = [
    "pinga",
    "fuck",
    "dick",
    "singao",
    "puta",
    "perro",
    "noob",
    "maricon",
    "marica",
    "pussy",
    "gay",
    "gey"
  ];
  for (let i = 0; i < badwords.length; i++) {
    let pat =
      badwords[i].slice(0, -1).replace(/([a-z])/g, "$1[^a-z]*") +
      badwords[i].slice(-1);
    let rxp = new RegExp(pat, "ig");
    message = message.replace(rxp, "****");
  }
  return message;
}
module.exports = chat;
