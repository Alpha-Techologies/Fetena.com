import * as React from "react";
import { Card } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
function IconImage({ src, alt }) {
  return (
    <div className="flex justify-center items-center p-1 bg-zinc-100">
      <img loading="lazy" src={src} alt={alt} className="aspect-[1.2] fill-indigo-500 w-[18px]" />
    </div>
  );
}

function UserStats({userStats}) {
 
  return (
    <div className="flex justify-center flex-wrap  gap-4 w-full ">


<Card
          className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200'
          style={{ width: 400 }}
        >
          <div className='flex gap-4'>
            <Icon
              icon='healthicons:i-exam-multiple-choice-outline'
              className='text-4xl text-blue-700'
            />
            <div className='flex-col flex items-start gap-2'>
            <h3 className='font-bold text-xl text-primary-500 truncate'>{userStats.totalExams}</h3>              
              <p className='font-semibold flex gap-2 items-center justify-center'>
               Exams Taken
              </p>
            </div>
          </div>
        </Card>



        <Card
          className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200'
          style={{ width: 400 }}
        >
          <div className='flex gap-4'>
            <Icon
              icon='healthicons:i-exam-multiple-choice-outline'
              className='text-4xl text-blue-700'
            />
            <div className='flex-col flex items-start gap-2'>
            <h3 className='font-bold text-xl text-primary-500 truncate'>{userStats.orgsFollowed}</h3>              
              <p className='font-semibold flex gap-2 items-center justify-center'>
               Organizations Followed
              </p>
            </div>
          </div>
        </Card>


        <Card
          className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200'
          style={{ width: 400 }}
        >
          <div className='flex gap-4'>
            <Icon
              icon='healthicons:i-exam-multiple-choice-outline'
              className='text-4xl text-blue-700'
            />
            <div className='flex-col flex items-start gap-2'>
            <h3 className='font-bold text-xl text-primary-500 truncate'>{userStats.examsByCertificate}</h3>              
              <p className='font-semibold flex gap-2 items-center justify-center'>
               Certificates earned
              </p>
            </div>
          </div>
        </Card>


       
    
    </div>

  );
}

export default UserStats;