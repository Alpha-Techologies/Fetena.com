import { Card, Form, Button, Input, Avatar, Pagination, Badge,Tag } from "antd";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from 'axios';



const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const { Meta } = Card;

const RelatedExams = () => {

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/exams?limit=4&fields=examName,organization");
        setExams(response.data.data.data);
        console.log(response.data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);





  const ExamCard = ({ _id, examName, organization }) => {
    return (
      <Link to={`/dashboard/exams/${_id}`} key={_id}>
        <Card
          className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200'
          style={{ width: 300 }}
        >
          <div className='flex gap-4'>
            <Icon
              icon='healthicons:i-exam-multiple-choice-outline'
              className='text-4xl text-blue-700'
            />
            <div className='flex-col flex items-start gap-2'>
              <h3 className='font-bold text-md'>{examName}</h3>
              <div className='flex gap-1'>
                <Tag color={"yellow"}>English</Tag>
                <Tag color={"red"}>Maths</Tag>
                <Tag color={"blue"}>Physics</Tag>
              </div>
              <p className='font-semibold flex gap-2 items-center justify-center'>
                {organization?.name}{" "}
                {organization?.isVerified && (
                  <span>
                    <Icon className='text-blue-500' icon='mdi:verified' />
                  </span>
                )}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div className='flex flex-col gap-4 my-2'>
      <div className='flex justify-between gap-4 items-center'></div>
      <div>
        <Card
          style={{ width: "100%" }}
          tabProps={{ size: "middle" }}>
          <h1 className='text-xl font-bold text-blue-900 my-4 text-left'>
            Related Exams
          </h1>

          <div className='flex flex-wrap gap-2'>
                {exams && exams.map((exam) => (
                  <ExamCard key={exam._id} {...exam} />
                ))}
              </div>

          <div className='text-right mt-4'>
            <Link
              to='/dashboard/exams'
              className='text-blue-700 font-semibold'>
              See more...
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RelatedExams;
