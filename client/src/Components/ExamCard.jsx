import { Icon } from "@iconify/react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

Icon
const ExamCard = () => {
  return (
    <Link to='/dashboard/exams/dfghkfdghkd'>
      <Card
        className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200'
        style={{
          width: 300,
          // marginTop: 16,
        }}
        // key={index}
        // loading={loading}
      >
        <div className='flex gap-4'>
          <Icon
            icon='healthicons:i-exam-multiple-choice-outline'
            className='text-4xl text-blue-700'
          />
          <div className='flex-col flex items-start gap-2'>
            <h3 className='font-bold text-md'>English exam</h3>
            <div className='flex gap-1'>
              <Tag color={"yellow"}>English</Tag>
              <Tag color={"red"}>Maths</Tag>
              <Tag color={"blue"}>Physics</Tag>
            </div>
            <p className='font-semibold flex gap-2 items-center justify-center'>
              AASTU{" "}
              <span>
                <Icon
                  className='text-blue-500'
                  icon='mdi:verified'
                />
              </span>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
export default ExamCard