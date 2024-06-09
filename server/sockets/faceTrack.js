const TakeExam = require("../models/take.exam.model");

const faceTrack = (io, socket) => {
  socket.on("join-as-streamer", (streamerId) => {
    socket.broadcast.emit("streamer-joined", streamerId);
  });

  socket.on("disconnect-as-viewer", () => {
    socket.broadcast.emit("viewer-disconnected");
  });

  socket.on("join-as-viewer", async (takeExamId, viewerId) => {
    const takeExam = await TakeExam.findOne({ _id: takeExamId });

    if (!takeExam) {
      console.log(`TakeExam ${takeExamId} not found`);
      return;
    }
    console.log(`View ${takeExamId} .`);

    io.to(takeExam.socketId).emit("viewer-connected", viewerId);  
  });
};

module.exports = faceTrack;
