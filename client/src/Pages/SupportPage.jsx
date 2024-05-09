import React from 'react';
import Faq from '../Components/Faq';
import { Card, Form, Button,Input,Avatar,Pagination,Badge } from "antd";
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';

const SupportPage = () => {

  const SupportCard = () => {
    return (




      <Card
      
      
      className="hover:shadow-md transition-all ease-in-out duration-300"
          style={{
            width: 380,
            // marginTop: 16,
          }}
          // key={index}
          // loading={loading}
          >
            <div className="flex flex-col gap-4">
              <div className='flex gap-2 items-center'>

            <Icon icon="healthicons:i-exam-multiple-choice-outline" className="text-4xl text-blue-700" />
             <h3 className="font-bold text-lg">English exam</h3>
              </div>
            <ul className="flex-col flex items-start gap-2">
           <li className='border-b py-2'>Lorem, ipsum dolor sit amet consectetur adipisicing</li>
           <li className='border-b py-2'>Lorem, ipsum dolor sit amet consectetur adipisicing</li>

           <li className='border-b py-2'>Lorem, ipsum dolor sit amet consectetur adipisicing</li>

           <li className='border-b py-2'>Lorem, ipsum dolor sit amet consectetur adipisicing</li>

          
            </ul>

            </div>
         
                          

        
        </Card>

    )
  };
  



  return (
    <div className='flex flex-col gap-4 p-4'>


     
        <h1 className="text-2xl font-bold text-primary-600 text-left">Support Site</h1>
      


<Card
            style={{ width: "100%" }}
           className='p-2'
            tabProps={{ size: "middle" }}
          >

<h1 className='text-2xl font-bold text-blue-900 mb-4 text-left'>How to use Fetena</h1>

<div className='grid grid-cols-3 gap-4'>

<SupportCard />
<SupportCard />
<SupportCard />
<SupportCard />


</div>



          </Card>

        <Card
            style={{ width: "100%" }}
           className='p-2'
            tabProps={{ size: "middle" }}
          >

<h1 className='text-2xl font-bold text-blue-900 mb-4 text-left'>FAQ's</h1>


<Faq />
          </Card>


          <Card
            style={{ width: "100%" }}
           className='p-2'
            tabProps={{ size: "middle" }}
          >

<h1 className='text-2xl font-bold text-blue-900 mb-4 text-left'>Contact Us</h1>

<div className=" flex flex-wrap justify-between py-2 px-8 rounded-sm border ">
<p className="font-semibold"><span className="font-bold text-blue-700">Address : </span>Addis Ababa Science & Technology University , Addis Ababa , Ethiopia</p>

<p className="font-semibold"><span className="font-bold text-blue-700">Email : </span>fetena@gmail.com</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Tel : </span>+2519456789</p>



          </div>

          </Card> 

   
    </div>
  )
}

export default SupportPage