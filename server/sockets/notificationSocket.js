// notification socket implementation
// the notification socket accepts the io as a parameter and implements the send notification function
// the send notification function emits the notification to the user

const users = {}; // This maps userId to socketId

const notificationSocket = (io, socket) => {
  // Register user
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  // Send notification to a user
  socket.on("sendNotification", (payload) => {
    console.log(payload);
    const { userId, notification } = JSON.parse(payload);
    if (users[userId]) {
      console.log(`Sending notification to user ${userId}: ${notification}`);
      io.to(users[userId]).emit("notification", notification);
    } else {
      console.log(`User ${userId} not connected`);
    }
  });
};

module.exports = notificationSocket;
