const jwt = require("jsonwebtoken");
const config = require("../config");

const chatService = require("../service/conversation.service");

let connection = null;

class Realtime {
  constructor() {
    this._io = null;
    this._users = {};
  }
  connect(server) {
    const io = require("socket.io")(server);

    io.use(function (socket, next) {
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, config.jwtSecret, function (
          err,
          decoded
        ) {
          if (err) {
            console.log("socket auth token parse error");
            return next(new Error("Authentication error"));
          }
          socket.decoded = decoded;
          next();
        });
      } else {
        console.log("socket auth error");
        next(new Error("Authentication error"));
      }
    });

    this._io = io;

    io.on("connection", (socket) => {
      let self = this;
      const { username } = socket.decoded;
      this._users[username] = socket.id;

      socket.on("statusConnetion", (data) => {
        console.log(data);
      });

      socket.on("disconnect", function () {
        console.log(socket.id, " socket has disconnected");
      });

      console.log(`New socket connection: ${socket.id}`);

      socket.on("message", async function (data) {
        await chatService.sendChat(username, data.receiver, data.text);

        if (data.receiver in self._users) {
          io.sockets.connected[self._users[data.receiver]].emit(
            "message",
            data
          );
        }
      });
    });
  }

  sendToAll(event, data) {
    this._io.sockets.emit(event, data);
  }

  static init(server) {
    if (!connection) {
      connection = new Realtime();
      connection.connect(server);
    }
  }

  static getConnection() {
    if (!connection) {
      throw new Error("no active connection");
    }
    return connection;
  }
}

module.exports = {
  connect: Realtime.init,
  connection: Realtime.getConnection,
};
