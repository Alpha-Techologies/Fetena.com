import { useState } from "react";
import testimonals from "../SampleData/testimonals";
import { Icon } from "@iconify/react";
import Button from "./Button";
import { Link } from "react-router-dom";
// console.log(testimonals);



const TestimonySection = () => {
  const [subject, setSubject] = useState("Math");
  const [animate, setAnimate] = useState(false);

  const handleClickAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 100);
  };

  return (
    <div className='flex flex-col gap-4 my-16 items-center justify-center'>
      <h2>
        But I teach{" "}
        <span className='text-primary-500 font-bold italic'>{subject}</span>,
        will Fetena.com work for me and my students?{" "}
      </h2>
      <div className='flex flex-wrap gap-4 items-center justify-center'>
        {Object.keys(testimonals).map((key) => (
          <div
            className={`${
              key === subject
                ? "bg-primary-500 text-white"
                : "bg-white text-primary-500"
            } border border-primary-500 px-4 py-1 rounded-md hover:bg-primary-500 hover:text-white cursor-pointer`}
            onClick={() => {setSubject(key); handleClickAnimation()}}
            key={key}>
            {key}
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-4'>
      <div className={`transition-opacity ease-in-out  ${animate ? "opacity-70" : "opacity-100"} flex lg:gap-4 lg:flex-row flex-col gap-4 items-center justify-center my-4`}>         
         <div className='bg-primary-500 sm-w-full lg:w-1/2 text-white p-8 px-8 flex flex-col gap-2'>
            <div>
              <h3 className='text-xl font-bold italic'>
                {testimonals[subject].teacher[0]}
              </h3>
              <p className='text-md italic'>
                {testimonals[subject].teacher[1]}
              </p>
            </div>
            <p>{testimonals[subject].testimonal}</p>
            <p className='italic'>{testimonals[subject].school}</p>
          </div>
          <div className='flex flex-col items-start justify-start'>
            <h3 className='font-bold text-primary-500'>
              Fetena.com's Integrated exam tools for your subjects include:
            </h3>
            <ul className='flex flex-col items-start justify-start'>
              {testimonals[subject].tools.map((tool) => (
                <li
                  key={tool}
                  className='flex items-center justify-center gap-2'>
                  {" "}
                  <Icon
                    className='text-primary-500'
                    icon='ic:twotone-double-arrow'
                  />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={` flex gap-4 items-center justify-center`}>
         <Link to='/sign-in'><Button text={"Try It Now"} /></Link>
          <a href="#how-it-works"><Button text={"How It Works"} /></a>
        </div>
      </div>
    </div>
  );
};
export default TestimonySection;
