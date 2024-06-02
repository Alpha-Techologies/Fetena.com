const chatSocket = require("./chatSocket");
const notificationSocket = require("./notificationSocket");

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    // Register notification and chat handlers
    notificationSocket(io, socket);
    chatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
    });
  });
};

module.exports = initSocket;
