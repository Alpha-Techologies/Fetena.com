import { Card, Input, Button, Badge, Divider, Tag } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import RelatedExams from "../Components/RelatedExams";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const { Meta } = Card;

const ExamDetailPage = () => {
  const { id } = useParams(); // Get the exam ID from the URL
  const [exam, setExam] = useState(null);
  const { workspace } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`/api/exams/${id}`);
        setExam(response.data.data.data[0]);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        toast.error("Failed to fetch exam details");
      }
    };

    fetchExamDetails();
  }, [id]);

  if (!exam) {
    return <p>Loading...</p>; // Show a loading indicator while fetching data
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap justify-between gap-4 items-center'>
        <div className='flex gap-4 items-center '>
          <Icon
            onClick={() => window.history.back()}
              icon='fluent-emoji-high-contrast:left-arrow'
              className='text-2xl text-primary-500 cursor-pointer'
            />
           <h1 className='text-2xl font-bold text-blue-900 text-left'>Exam Details</h1>
        </div>

        <div className="flex gap-4">
          {workspace && (
            <>
              <Link
                to={`/dashboard/exams/editexam/${id}`}
                className="flex items-center gap-2 bg-blue-50 hover:bg-primary-600 hover:text-white text-primary-800 border  border-primary-200 font-bold py-2 px-4 rounded "
              >
                <Icon icon="line-md:pencil-twotone" /> Edit
              </Link>
              <Link className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
                <Icon className="w-5 h-5" icon="mdi:certificate-outline" /> Add
                Certification
              </Link>
            </>
          )}
        </div>
      </div>
      <div>
        <Card style={{ width: "100%" }} tabProps={{ size: "middle" }}>
          <div className="w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border ">
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Exam Name : </span>
              {exam.examName}
            </p>
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Starts at : </span>
              {new Date(exam.startDate).toLocaleString()}
            </p>
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Points : </span>
              {exam.points}
            </p>
            {/* <p className='font-semibold'>
              <span className='font-bold text-blue-700'>Questions : </span>{exam.questions}
            </p> */}
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Time limit : </span>
              {exam.duration} Minutes
            </p>
          </div>

          <div className="w-full  flex flex-wrap gap-16 py-2 px-8 my-4">
            <p className="font-semibold flex gap-2 items-center justify-center">
              <span className="font-bold text-blue-700">Organization : </span>
              {exam.organization?.name}{" "}
              {exam.organization?.isVerified && (
                <Icon className="text-blue-500" icon="mdi:verified" />
              )}
            </p>

            <p className="font-semibold flex gap-2 items-center justify-center">
              <span className="font-bold text-blue-700">Created by : </span>
              {exam.createdBy.firstName} {exam.createdBy.lastName}
            </p>
          </div>

          <div className="w-full  flex flex-col gap-2 py-4 px-8 my-4 items-start">
            <h3 className="text-xl font-bold text-blue-900">Instructions</h3>
            <div
              className="text-left w-4/6"
              dangerouslySetInnerHTML={{ __html: exam.instruction }}
            />

            <p className="font-bold mt-4">Good Luck!</p>
          </div>
          <div className="flex justify-center items-center my-4">
            <Link
              to={"/take-exam/" + id}
              className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-center w-36"
            >
              <Icon className="w-5 h-5" icon="system-uicons:write" /> Take Exam
            </Link>
          </div>
        </Card>
        {/* <RelatedExams /> */}
      </div>
    </div>
  );
};

export default ExamDetailPage;
