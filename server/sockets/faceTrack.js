const faceTrack = (io, socket) => {
  socket.on("join-as-streamer", (streamerId) => {
    socket.broadcast.emit("streamer-joined", streamerId);
  });

  socket.on("disconnect-as-streamer", (streamerId) => {
    socket.broadcast.emit("streamer-disconnected", streamerId);
  });

  socket.on("join-as-viewer", (viewerId) => {
    socket.broadcast.emit("viewer-connected", viewerId);
  });
};

module.exports = faceTrack;
