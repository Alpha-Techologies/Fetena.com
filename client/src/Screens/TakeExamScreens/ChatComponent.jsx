import { useEffect, useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { MessageBox } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
import { takeExam } from "../../Redux/features/dataActions";
import { toast } from "react-toastify";

const ChatComponent = ({ exam, socket }) => {
  const { user } = useSelector((state) => state.auth);
  const { currentTakeExamSession } = useSelector((state) => state.data);
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState({ chat: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (message) => {
        console.log("message received", message);
        const newMessage = {
          position: "left",
          title: "Invigilator - Direct Message",
          type: "text",
          text: message.message,
          date: "message.date",
        };
        setChatList((prev) => {
          return {
            chat: [
              ...prev.chat,
              {
                position: "left",
                title: "Invigilator - Direct Message",
                type: "text",
                text: message.message,
                date: "message.date",
              },
            ],
          };
        });

        console.log(chatList);
      };

      const handleReceiveAnnouncement = (message) => {
        console.log("announcemet received");
        console.log(message);
        setChatList((prev) => {
          return {
            chat: [
              ...prev.chat,
              {
                position: "left",
                title: "Invigilator - Announcement",
                type: "text",
                text: message,
                date: "message.date",
              },
            ],
          };
        });
        socket.on("receiveMessage", handleReceiveMessage);

        socket.on("announcement", handleReceiveAnnouncement);

        return () => {
          socket.off("receiveMessage", handleReceiveMessage);
          socket.off("announcement", handleReceiveAnnouncement);
        };
      };
    }
  }, [socket]);

  useEffect(() => {
    dispatch(takeExam(exam._id))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          console.log(res.payload);
          // const temp = res.payload.data._id;
          // setTakeExamId(temp);
          // console.log(temp, "takeExamId");

          // socket.emit("joinExam", id, res.payload.data._id);
        } else {
          toast.error(res.payload.message);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
    if (currentTakeExamSession) {
      for (const message of currentTakeExamSession.chatMessages) {
        const newMessage = {
          position: message.sender === user._id ? "right" : "left",
          title:
            message.sender === user._id
              ? "You"
              : "Invigilator - Direct Message",
          type: "text",
          text: message.message,
          date: "message.date",
        };
        setChatList((prev) => {
          return {
            chat: [...prev.chat, newMessage],
          };
        });
      }
    }
  }, []);

  const sendMessage = () => {
    if (chatMessage !== "" && socket) {
      socket.emit("sendMessage", exam._id, false, {
        sender: user._id,
        receiver: exam.createdBy._id,
        message: chatMessage,
      });
      setChatList((prev) => {
        return {
          chat: [
            ...prev.chat,
            {
              position: "right",
              title: "You",
              type: "text",
              text: chatMessage,
              date: "message.date",
            },
          ],
        };
      });
    }
  };

  return (
    <div className='h-screen flex flex-col justify-between overflow-auto'>
      <MessageList
        key={1}
        className='message-list mt-2 mb-2'
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={chatList.chat}
      />
      <div className='flex items-center gap-2 w-[90%]'>
        <Input
          className='w-full'
          value={chatMessage}
          placeholder={"Type your message here"}
          onChange={(e) => setChatMessage(e.target.value)}
        />
        <div className='w-[20%]'>
          <Icon
            onClick={() => sendMessage()}
            className='w-5 h-5 text-primary-500'
            icon='carbon:send-filled'
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
