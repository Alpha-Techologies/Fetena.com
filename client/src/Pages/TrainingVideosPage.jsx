import { Card, Form, Button, Input, Avatar, Pagination, Image } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';


const { Search } = Input;
const { Meta } = Card;

const TrainingVideosPage = () => {
 
    const ExamCard = () => {
        const [videoId, setVideoId] = useState("9SMreNyP4uM"); // Default video ID
    
        const opts = {
          width: "100%",
          height: "100%",
        };
    
        return (
          
            <div className="relative aspect-w-16 aspect-h-9">
              <YouTube videoId={videoId} opts={opts} />
            </div>
         
        );
      };

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-3xl font-bold text-blue-900">Training Videos</h1>
      </div>
      <div>
        <Card style={{ width: "100%" }}>
          <div className="grid grid-cols-4 gap-4">
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrainingVideosPage;
