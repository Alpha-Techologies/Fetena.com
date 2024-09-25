import Peer from "peerjs";
import { useEffect, useState } from "react";

const usePeer = () => {
  const [peer, setPeer] = useState(null);

  useEffect(() => {
    const newPeer = new Peer();

    // newPeer.on("open", () => {
    //   console.log("Connected to PeerJS server");
    // });

    newPeer.on("connection", (conn) => {
      conn.on("close", () => {
        setTimeout(reload, 1000);
      });
    });

    newPeer.on("close", () => {
      console.log("Disconnected from PeerJS server");
    });

    setPeer(newPeer);

    return () => {
      newPeer.disconnect();
    };
  }, []);

  return [peer];
};

export default usePeer;
