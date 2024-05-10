import { Card, Form, Button,Input,Avatar,Pagination,Badge } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";


const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

const {Meta} = Card



const RelatedExams = () => {






  const ExamCard = () => {
    return (
      <Link to='/dashboard/exams/dfghkfdghkd' >
      <Card
      
      
      className="hover:shadow-md transition-all ease-in-out duration-300"
          style={{
            width: 300,
            // marginTop: 16,
          }}
          // key={index}
          // loading={loading}
          >
            <div className="flex   gap-4">
            <Icon icon="healthicons:i-exam-multiple-choice-outline" className="text-4xl text-blue-700" />
            <div className="flex-col flex items-start gap-2">
             <h3 className="font-bold text-md">English exam</h3>
             <div className="flex gap-2">
             <p className="text-yellow-500">english</p>
             <p className="text-red-500">maths</p>
             <p className="text-blue-500">maths</p>
             </div>
             <p>created by <span className="text-blue-700 font-semibold">Yosef</span></p>
            </div>

            </div>
         
                          

        
        </Card>
        </Link>

    )
  };
  

  return (
    <div className="flex flex-col gap-4 my-4">
       <div className="flex justify-between gap-4 items-center">


     
     
      
    </div>
      <div>

        <Card
          style={{ width: "100%" }}
          tabProps={{ size: "middle" }}
        >
               <h1 className='text-xl font-bold text-blue-900 my-4 text-left'>Related Exams</h1>

       
                  <div className='grid grid-cols-4 gap-4 mb-4'>

          <ExamCard />
          <ExamCard />
          
          <ExamCard />
          <ExamCard />
          
         
              </div>
             
<div className="text-right">
<Link to='/dashboard/exams' className="text-blue-700 font-semibold">See more...</Link>
</div>
             
         
        </Card>
       
      </div>
    </div>
  );
};

export default RelatedExams;
