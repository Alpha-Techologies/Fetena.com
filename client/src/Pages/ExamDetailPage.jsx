import { Card, Input, Button,Badge,Divider } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import RelatedExams from "../Components/RelatedExams";

const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

const {Meta} = Card


const ExamDetailPage = () => {






 

  return (
    <div className="flex flex-col gap-4 my-4">
       <div className="flex justify-between gap-4 items-center">

       <div className="flex gap-4 items-center ">
      <Link to='/dashboard/exams'>
        <Icon icon="fluent-emoji-high-contrast:left-arrow"  className="text-2xl text-primary-500" />
            
            </Link>
        <h1 className="text-2xl font-bold text-primary-600">English Exam</h1>
      </div>

      <div className='flex flex-col justify-start w-96'>
     
    </div>
     
      <Link to='/dashboard/create-exam' className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
        {" "}
        <Icon className="text-white w-4 h-4" icon='material-symbols:add' /> Take Exam
      </Link>
    </div>
      <div>
        <Card
          style={{ width: "100%" }}
          tabProps={{ size: "middle" }}
        >
          <div className="w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border ">
<p className="font-semibold"><span className="font-bold text-blue-700">Due : </span>April 1 at 1:59 am</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Points : </span>18</p>

<p className="font-semibold"><span className="font-bold text-blue-700">Question : </span>18</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Time limit : </span>27 Minutes</p>

<p className="font-semibold"><span className="font-bold text-blue-700">Allowed Attempts : </span>Unlimited</p>

          </div>

          <div className="w-full  flex flex-wrap gap-16 py-2 px-8 my-4">
          <p className="font-semibold"><span className="font-bold text-blue-700">Exam Code : </span>ET4566787GB</p>
          <p className="font-semibold flex gap-2 items-center justify-center"><span className="font-bold text-blue-700">Organization : </span>AASTU <span><Icon icon="gravity-ui:seal-check" className="text-lg text-blue-800" /></span></p>
          <div className="flex gap-2"><span className="font-bold text-blue-700">Tags : </span>
          <p className="text-yellow-500">english</p>
               <p className="text-red-500">maths</p>
               <p className="text-blue-500">maths</p>
          </div>
          <p className="font-semibold flex gap-2 items-center justify-center"><span className="font-bold text-blue-700">Created by : </span>Yosef Lakew </p>


          

</div>

<div className="w-full  flex flex-col gap-2 py-4 px-8 my-4 items-start">
<h3 className='text-xl font-bold text-blue-900'>Instructions</h3>
<p className="text-left w-4/6">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis consectetur accusamus, culpa veniam perspiciatis suscipit ut impedit totam similique aperiam? Libero, placeat. Veniam velit libero assumenda distinctio accusantium expedita sed.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto soluta ab ipsam, qui repellendus ut incidunt delectus ipsum error repudiandae hic nemo doloremque consequuntur, ipsa, provident reiciendis inventore adipisci? Facilis?
</p>

<p className="text-left w-4/6">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis consectetur accusamus, culpa veniam perspiciatis suscipit ut impedit totam similique aperiam? Libero, placeat. Veniam velit libero assumenda distinctio accusantium expedita sed.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto soluta ab ipsam, qui repellendus ut incidunt delectus ipsum error repudiandae hic nemo doloremque consequuntur, ipsa, provident reiciendis inventore adipisci? Facilis?
</p>
<p className="font-bold mt-4">Good Luck!</p>

          </div>
          <div className="flex justify-center items-center my-4">

          <Link to='/dashboard/create-exam' className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded text-center w-36">
        {" "}
        <Icon className="text-white w-4 h-4" icon='material-symbols:add' /> Take Exam
      </Link>
          </div>

         
        </Card>
        <RelatedExams />
      </div>
    </div>
  );
};

export default ExamDetailPage;