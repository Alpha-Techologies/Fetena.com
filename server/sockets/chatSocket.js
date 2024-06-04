// initialize the chat socket
const users = {}; // This maps userId to socketId

const chatSocket = (io, socket) => {
  // Join a room
  socket.on("joinRoom", ({ userId, roomId }) => {
    socket.join(roomId);
    users[userId] = { socketId: socket.id, roomId };
    console.log(`User ${userId} joined room ${roomId}`);
  });

  // Handle sending a chat message
  socket.on("sendMessage", ({ userId, roomId, message }) => {
    if (users[userId] && users[userId].roomId === roomId) {
      console.log(`User ${userId} sent message to room ${roomId}: ${message}`);
      io.in(roomId).emit("chatMessage", { userId, message });
    } else {
      console.log(`User ${userId} not in room ${roomId}`);
    }
  });
};

module.exports = chatSocket;
