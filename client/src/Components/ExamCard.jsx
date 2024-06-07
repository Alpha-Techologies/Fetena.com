import { Icon } from "@iconify/react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

Icon
const ExamCard = ({exam, key}) => {
  return (
    <Link to={'/dashboard/exams/' + exam._id}>
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
            <h3 className='font-bold text-md'>{ exam.examName }</h3>
            <p className='font-semibold flex gap-2 items-center justify-center'>
              {exam.organization?.name}
              { exam.organization?.isVerified && <span>
                <Icon
                  className='text-blue-500'
                  icon='mdi:verified'
                />
              </span>}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
export default ExamCard