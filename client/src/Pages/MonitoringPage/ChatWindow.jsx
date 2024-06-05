import { Icon } from "@iconify/react";
import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { MessageList } from "react-chat-elements";
import useSocketIO from "../../utils/socket/useSocketIO";
import { useSelector } from "react-redux";


const ChatWindow = ({ currentUser, seeStatusOf, currentExam }) => {

    const [socket] = useSocketIO();
    const [chatMessage, setChatMessage] = useState("");
    const [chatList, setChatList] = useState([]);
    const { user } = useSelector((state) => state.auth);

    console.log(currentUser, currentExam, seeStatusOf, 'currentUser in chat')

    useEffect(() => {
      console.log(socket, "socket in chat");
      if (socket) {
        console.log("receiving message admin", socket);

        const handleReceiveMessage = (message) => {
          console.log("message received");
          console.log(message);
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

  const sendMessage = () => {
    console.log("send message function");
    if (chatMessage !== "") {
      socket.emit("sendMessage", currentExam._id, true, {
        sender: user._id,
        receiver: seeStatusOf,
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
    <Card className='h-fit'>
      <div className='flex items-center justify-center text-primary-500 gap-4'>
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
            : "Message " + currentUser.user.fullName}
        </p>
      </div>
      <div className='h-full flex flex-col justify-between'>
        <MessageList
          key={1}
          className='message-list mt-2 mb-2 bg-[#f5f5f5] rounded-lg h-full py-2'
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={chatList}
        />

        <div className='flex items-center gap-2'>
          <Input
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder={
              seeStatusOf === "all"
                ? "Message All"
                : "Message " + currentUser.user.fullName
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
