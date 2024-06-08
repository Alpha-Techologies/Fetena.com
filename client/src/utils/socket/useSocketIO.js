// useSocketIO.js
import { useEffect, useState } from "react";
import io from "socket.io-client";

// const serverURL = "http://localhost:3000";
const serverURL = import.meta.env.VITE_SOCKET_URL;

const useSocketIO = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io(serverURL, { transports: ["websocket"] }); // Replace with your server URL

    // Set up event listeners
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return [socket];
};

export default useSocketIO;
