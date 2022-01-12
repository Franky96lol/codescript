const config = require("../../config.js");
const helper = require(config.LOGIC + "/helper.js");
const fs = require("fs");

function firstEnter(io, socket, username) {
  if (global.users[username].firstEnter) {
    socket.emit("first_enter", false);
  } else socket.emit("first_enter", true);

  socket.on("verify_nickname", nick => {
    let char = /^[a-zA-Z0-9]+$/;

    if (fs.existsSync(config.DB + "/nicknames/" + nick + ".json")) {
      socket.emit("verify_nickname", {
        status: false,
        message:
          "<small style='color:red'>El nombre se encuentra en uso</small>"
      });
    } else if (nick.length < 4) {
      socket.emit("verify_nickname", {
        status: false,
        message: "<small style='color:red'>El nombre es muy corto.</small>"
      });
    } else if (nick.length > 10) {
      socket.emit("verify_nickname", {
        status: false,
        message: "<small style='color:red'>El nombre es muy largo.</small>"
      });
    } else if (!char.test(nick)) {
      socket.emit("verify_nickname", {
        status: false,
        message:
          "<small style= 'color:red'>El nombre posee caracteres incorrectos</small>"
      });
    } else
      socket.emit("verify_nickname", {
        status: true,
        message: "<small style='color:green'>Correcto!</small>"
      });
  });

  socket.on("new_nickname", data => {
    global.users[username].nickname = data.nickname;
    global.users[username].color = data.color;
    helper.writeFile(config.DB + "/nicknames/" + data.nickname + ".json", {
      owner: username
    });

    global.users[username].firstEnter = true;
  });
}

module.exports = firstEnter;
