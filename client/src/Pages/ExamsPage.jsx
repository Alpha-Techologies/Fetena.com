  import { Card, Form, Button,Input,Avatar,Pagination,Badge } from "antd";
  import { useState } from "react";
  import { toast } from "react-toastify";
  import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";


const { Search } = Input

const onSearch = (value, _e, info) => console.log(info?.source, value);

const {Meta} = Card

  const tabListNoTitle = [
    {
      key: "All",
      label: "All",
    },
    {
      key: "Featured",
      label: "Featured",
    },
    {
      key: "Taken",
      label: "Taken",
    },
  ];

  const ExamsPage = () => {
    const [activeTabKey, setActiveTabKey] = useState("All");
    const [basicInfoForm] = Form.useForm();

    const onTabChange = (key) => {
      if (activeTabKey === "All" && key !== "All") {
        basicInfoForm
          .validateFields()
          .then(() => {
            setActiveTabKey(key);
          })
          .catch(() => {
            toast.error("Please complete all required fields in Basic Info");
          });
      } else if (activeTabKey === "Featured" && key !== "Featured") {
        // Add validation or other functionality specific to Exam Questions tab
        setActiveTabKey(key);
      } else {
        setActiveTabKey(key);
      }
    };




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
               <p className="font-semibold flex gap-2 items-center justify-center">AASTU <span><Icon icon="gravity-ui:seal-check" className="text-lg text-blue-800" /></span></p>
              </div>

              </div>
           
                            

          
          </Card>
          </Link>

      )
    };
    

    return (
      <div className="flex flex-col gap-4 my-4">
         <div className="flex justify-between gap-4 items-center">

        <h1 className='text-3xl font-bold text-blue-900'>Exams</h1>

        <div className='flex flex-col justify-start w-96'>
        <Search
          placeholder='Search Exams'
          allowClear
          enterButton='Search'
          size='medium'
          onSearch={onSearch}
        />
      </div>
       
        <Link to='/dashboard/create-exam' className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded">
          {" "}
          <Icon className="text-white w-4 h-4" icon='material-symbols:add' /> Create Exam
        </Link>
      </div>
        <div>
          <Card
            style={{ width: "100%" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
            tabProps={{ size: "middle" }}
          >
            {activeTabKey === "All" && (
              <>
                    <div className='grid grid-cols-4 gap-4'>

            <ExamCard />
            <ExamCard />
            
            <ExamCard />
            <ExamCard />
            
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
                </div>
                {/* <Pagination current={current} total={pages} onChange={onPaginationChange} /> */}
                <Pagination current='1' total='5'  className="mt-4" />

            </>
            ) }
            {activeTabKey === "Featured" && <p>Featured</p>}
            {activeTabKey === "Taken" && <p>Taken</p>}
          </Card>
        </div>
      </div>
    );
  };

  export default ExamsPage;
