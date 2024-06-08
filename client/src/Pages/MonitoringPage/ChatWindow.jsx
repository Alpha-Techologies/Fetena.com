import { Icon } from "@iconify/react";
import { current } from "@reduxjs/toolkit";
import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { MessageList } from "react-chat-elements";
import { useSelector } from "react-redux";

const ChatWindow = ({ currentUser, seeStatusOf, currentExam, socket }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [announcementList, setAnnouncementList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setAnnouncementList([])
    if ((Object.keys(currentExam).length !== 0)) {
      console.log("is it in here")
      for (const item of currentExam?.announcement) {
        const newMessage = {
          position: "right",
          title: "You",
          type: "text",
          text: item,
          date: "message.date",
        };
        setAnnouncementList((prev) => [...prev, newMessage]);
      }
    }
  }, [currentExam]);

  useEffect(() => {
    // console.log(currentUser, 'curUser in chat')
    setChatList([])
    if (Object.keys(currentUser).length !== 0) {
      for (const chat of currentUser?.chatMessages) {
        const newMessage = {
          position: chat.sender === user._id ? "right" : "left",
          title: chat.sender === user._id ? "You" : "Invigilator",
          type: "text",
          text: chat.message,
          date: "message.date",
        };
        setChatList((prev) => [...prev, newMessage]);
      }
    }
   }, [currentUser])

  // console.log(currentUser, currentExam, seeStatusOf, "currentUser in chat");

  useEffect(() => {
    if (socket) {
      console.log("receiving message admin", socket);
      const handleReceiveMessage = (message) => {
        console.log("message received", message);
        const newMessage = {
          position: "left",
          title: "Examinee",
          type: "text",
          text: message.message,
          date: "message.date",
        };
        setChatList((prev) => [...prev, newMessage]);
      };

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [socket]);

  const announceMessage = () => {
    console.log("announce message function");
    if (chatMessage !== "" && socket) {
      socket.emit("announcement", currentExam._id, chatMessage);
      setAnnouncementList((prev) => [
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

  const sendMessage = () => {
    console.log("send message function");
    if (chatMessage !== "") {
      socket.emit("sendMessage", currentExam._id, true, {
        sender: user._id,
        receiver: currentUser?.user?._id,
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
    <Card className='h-fit overflow-auto max-h-72'>
      <div className='flex items-center justify-center text-primary-500 gap-4 '>
        {seeStatusOf === "all" ? (
          <Icon
            className='w-5 h-5'
            icon='mingcute:announcement-line'
          />
        ) : (
          <Icon
            className='w-5 h-5'
            icon='fluent:chat-12-filled'
          />
        )}
        <p className='text-md'>
          {seeStatusOf === "all"
            ? "Announce"
            : "Message " + currentUser?.user?.fullName}
        </p>
      </div>
      <div className='h-full flex flex-col justify-between'>
        <MessageList
          key={1}
          className='message-list mt-2 mb-2 bg-[#f5f5f5] rounded-lg h-full py-2'
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={seeStatusOf === "all" ? announcementList : chatList}
        />

        <div className='flex items-center gap-2'>
          <Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder={
              seeStatusOf === "all"
                ? "Message All"
                : "Message " + currentUser?.user?.fullName
            }
          />
          <Icon
            onClick={
              seeStatusOf === "all"
                ? () => announceMessage()
                : () => sendMessage()
            }
            className='w-5 h-5 text-primary-500'
            icon='carbon:send-filled'
          />
        </div>
      </div>
    </Card>
  );
};

export default ChatWindow;
