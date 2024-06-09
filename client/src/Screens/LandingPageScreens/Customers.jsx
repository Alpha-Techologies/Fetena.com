import React from "react";
import { Card, Form, Button, Input, Avatar, Pagination, Badge } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Customers = () => {
  const SupportCard = ({data}) => {
    return (
      <Card
        className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200 "
        style={{
          width: 380,
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Icon
              icon="healthicons:i-exam-multiple-choice-outline"
              className="text-4xl text-blue-700"
            />
            <h3 className="font-bold text-lg">{data.title}</h3>
          </div>
          <ul className="flex-col flex items-start gap-2">
            <li className="border-b py-2 line-clamp-1">
            {data.desc1}
            </li>
            <li className="border-b py-2 line-clamp-1">
            {data.desc2}
            </li>

            <li className="border-b py-2 line-clamp-1">
            {data.desc3}            </li>

            <li className="border-b py-2 line-clamp-1">
             {data.desc4}
            </li>
          </ul>
        </div>
      </Card>
    );
  };


  const data = [
    {
      title: "High Schools",
      desc1: "Streamline examination processes.",
      desc2: "Easy exam creation, administration, and grading.",
      desc3: "Saves time and reduces administrative burdens.",
      desc4: "Convenient online exams for students with instant feedback."
    },
    {
      title: "Universities",
      desc1: "Conduct secure and efficient exams.",
      desc2: "Supports various question formats.",
      desc3: "Robust security features to prevent cheating.",
      desc4: "Real-time monitoring and detailed performance analytics."
    },
    {
      title: "Training Centers",
      desc1: "Manage certification exams.",
      desc2: "User-friendly interface for quick exam setup.",
      desc3: "Automated grading system for prompt results.",
      desc4: "Helps trainees gauge progress and identify improvement areas."
    },
    {
      title: "Professional Certification Bodies",
      desc1: "Deliver high-stakes exams.",
      desc2: "Advanced security measures and real-time monitoring.",
      desc3: "Ensures certification process integrity.",
      desc4: "Accessible exams from any location."
    },
    {
      title: "Language Schools",
      desc1: "Assess students' language proficiency.",
      desc2: "Multiple-choice questions, essay submissions, and automated grading.",
      desc3: "Ideal for language exams.",
      desc4: "Secure, online environment for practice and exams."
    },
    {
      title: "Corporate Training Programs",
      desc1: "Evaluate employee learning and development.",
      desc2: "Comprehensive exam logs and real-time monitoring.",
      desc3: "Provides insights into employee performance.",
      desc4: "Tailors training initiatives effectively."
    },
    {
      title: "Tutoring Services",
      desc1: "Provide customized assessments for students.",
      desc2: "Create personalized exams for individual learning needs.",
      desc3: "Immediate feedback and detailed performance reports for students.",
      desc4: "Immediate feedback and detailed performance reports for students."
    },
    {
      title: "Government Institutions",
      desc1: "Conduct various administrative exams.",
      desc2: "Secure environment ensures fair and transparent exams.",
      desc3: "Automated grading and comprehensive exam logs.",
      desc4: "Efficient exam management and result dissemination."
    }
  ];
  

  return (
    <div className="flex flex-col gap-4 mt-24 mx-auto">
      <div className="flex flex-col items-center justify-center px-auto mb-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-left">
          Who can use Fetena
        </h1>

        <div className="flex flex-wrap gap-4 items-center justify-center px-autol">
          <SupportCard data={data[0]} />
          <SupportCard data={data[1]} />
          <SupportCard data={data[2]} />
          <SupportCard data={data[3]} />
          <SupportCard data={data[4]} />
          <SupportCard data={data[5]} />
          <SupportCard data={data[6]} />
          <SupportCard data={data[7]} />

        </div>
      </div>
    </div>
  );
};

export default Customers;
