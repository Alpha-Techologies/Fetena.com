import { useEffect, useState } from "react";
import { Input } from "antd";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { MessageBox } from "react-chat-elements";
import { MessageList } from "react-chat-elements";
import { takeExam } from "../../Redux/features/dataActions";
import { toast } from "react-toastify";
import axios from "axios";

const ChatComponent = ({ exam, socket, takeExamId }) => {
  const { user } = useSelector((state) => state.auth);
  const { currentTakeExamSession } = useSelector((state) => state.data);
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState({ chat: [] });
  const [examinee, setExaminee] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("in the use effect", socket);
    if (socket) {
      console.log("recieving message");
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

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
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
      };
      socket.on("announcement", handleReceiveAnnouncement);

      return () => {
        socket.off("announcement", handleReceiveAnnouncement);
      };
    }
  }, [socket]);

  useEffect(() => {
    console.log(takeExamId, "takeExam in chat component");

    const getTakeExamId = async (takeExamId) => {
      try {
        const response = await axios.get(`/api/exams/exam-taker/${takeExamId}`);

        console.log(response, "resp getTakeExamId  ");
        const tempExaminee = response.data.data.data[0];
        console.log(tempExaminee);

        setExaminee(response.data.data.data[0]);
        console.log(examinee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (takeExamId) {
      getTakeExamId(takeExamId);
    }
  }, [takeExamId]);

  useEffect(() => {
    if (Object.keys(examinee).length !== 0) {
      console.log(examinee, "examinee");
      for (const message of examinee.chatMessages) {
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
  }, [examinee]);

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
