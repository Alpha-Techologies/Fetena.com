import { useEffect, useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { MessageBox } from "react-chat-elements";
import { MessageList } from "react-chat-elements";

const ChatComponent = ({ exam, socket }) => {
  const { user } = useSelector((state) => state.auth);
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (message) => {
        console.log("message received", message);
        const newMessage = {
          position: "left",
          title: "Invigilator",
          type: "text",
          text: message.message,
          date: "message.date",
        };
        setChatList((prev) => [...prev, newMessage]);
      };

      const handleReceiveAnnouncement = (message) => {
        console.log("announcemet received");
        console.log(message);
        setChatList((prev) => [
          ...prev,
          {
            position: "left",
            title: "Invigilator",
            type: "text",
            text: message,
            date: "message.date",
          },
        ]);
      };

      socket.on("receiveMessage", handleReceiveMessage);

      socket.on("announcement", handleReceiveAnnouncement);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.off("announcement", handleReceiveAnnouncement);
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (chatMessage !== "" && socket) {
      socket.emit("sendMessage", exam._id, false, {
        sender: user._id,
        receiver: exam.createdBy._id,
        message: chatMessage,
      });
      setChatList((prev) => [
        ...prev,
        {
          position: "right",
          title: "You",
          type: "text",
          text: chatMessage,
          date: "message.date",
        },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <MessageList
        key={1}
        className="message-list mt-2 mb-2"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={chatList}
      />
      <div className="flex items-center gap-2 w-[90%]">
        <Input
          className="w-full"
          value={chatMessage}
          placeholder={"Type your message here"}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <div className="w-[20%]">
          <Icon
            onClick={() => sendMessage()}
            className="w-5 h-5 text-primary-500"
            icon="carbon:send-filled"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
