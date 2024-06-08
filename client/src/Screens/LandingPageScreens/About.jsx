import React from 'react'
import FeatureSection1 from "../../Components/FeatureSection1";
import Faq from '../../Components/Faq';
import { Card } from 'antd';


const featuresData = {
  title: "For Examiners or Examinees",
  description:
    "Our company is dedicated to helping landlords and property developers to rent and sell out their properties. If you want to save time and money, while expanding, you might want to be interested in our professional services Our company could be your ideal partner for renting or selling your property. We are committed to our customers and promoters and our main objective is to be transparent while achieving results",
  btnLink: "/search",
  btnLabel: "Get started",
  imgSrc:
    "https://cdn.builder.io/api/v1/image/assets/TEMP/c896fd2f9a710e96a67f61747bd44eabe79c29f09d865cab24fd45c535cbefc8?apiKey=da0e5699a0964f23ab3a2091e7f935a3&",
};


const About = () => {
  
  return (
    <div className='mt-28'>

    <FeatureSection1 featuresData={featuresData} />
    
    <div
          
          className='mx-48 my-8'
         >

<h1 className='text-3xl font-bold text-blue-900 mb-8 text-center'>FAQ's</h1>


<Faq />
         </div>



         <div
           
           className='mx-16 my-16'
          >

<h1 className='text-3xl font-bold text-blue-900 mb-8 text-center'>Contact Us</h1>


<div className=" flex flex-col justify-between px-32  gap-4">
<p className="font-semibold"><span className="font-bold text-blue-700">Address : </span>Addis Ababa Science & Technology University , Addis Ababa , Ethiopia</p>
<div className='flex gap-2 items-center justify-center'>

<p className="font-semibold"><span className="font-bold text-blue-700">Email : </span>fetena@gmail.com</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Tel : </span>+2519456789</p>
</div>



          </div>

          </div> 



    </div>






  )
}

export default About