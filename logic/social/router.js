function router(io, socket, username) {
  require("./chat.js")(io, socket, username);
  require("./onlineFriends.js")(io, socket, username);
  require("./friends.js")(io , socket , username);
  require("./setStatus.js")(io , socket , username);
  require("./clan.js")(io , socket , username);
}

module.exports = router;
