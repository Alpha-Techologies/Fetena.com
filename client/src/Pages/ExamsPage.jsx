import { Card, Form, Button, Input, Avatar, Pagination, Badge, Tag,Space, Table,Popover  } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import ExamCard from "../Components/ExamCard"

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const { Meta } = Card;



const ExamsPage = () => {
  const [activeTabKey, setActiveTabKey] = useState("All");
  const [basicInfoForm] = Form.useForm();
  const { workspace } = useSelector((state) => state.data);
  const { userOrganizationsIdAndRole } = useSelector((state) => state.data);
  const [exams, setExams] = useState([]);
  const [pages, setPages] = useState(1); // Total pages of organizations
  const [current, setCurrent] = useState(1); // Current page number





  const fetchData = async (page=1) => {
    const id = workspace._id
  
    if (userOrganizationsIdAndRole[id] && userOrganizationsIdAndRole[id] === "admin") {


    
    try {
      const response = await axios.get(`/api/exams/my-exam/${id}`);
      
     console.log(response.data.data.data,"bitch")
      setExams(response.data.data.data);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  };

  useEffect(() => {
    

    fetchData();
  }, []);




  const onPaginationChange = (page) => {
    setCurrent(page); // Update the current page
    fetchData(page); // Fetch data for the new page
  }
  


  const columns = [
    {
      title: 'Exam name',
      dataIndex: 'examName',
      key: 'examName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Exam key',
      dataIndex: 'examKey',
      key: 'examKey',
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Security level',
      dataIndex: 'securityLevel',
      key: 'securityLevel',
    },
    {
      title: 'Access',
      dataIndex: 'access',
      key: 'access',
    },
   
   
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" className="grid grid-cols-4 gap-2">
          <Popover title="Edit Exam" trigger="hover">
            <Icon icon="line-md:pencil-twotone" className="text-blue-800 font-bold text-2xl hover:text-black" />
          </Popover>
    
          <Popover title="Exam Details" trigger="hover">
            <Link to={`/dashboard/exams/${record.key}`}>
              <Icon icon="mdi:eye" className="text-blue-800 font-bold text-2xl hover:text-black" />
            </Link>
          </Popover>
    
          <Popover title="Preview Exam" trigger="hover">
            <Icon icon="fa6-solid:binoculars" className="text-blue-800 font-bold text-2xl hover:text-black" />
          </Popover>
    
          <Popover title="Delete Exam" trigger="hover">
            <Icon icon="material-symbols:delete" className="text-blue-800 font-bold text-2xl hover:text-black" />
          </Popover>
        </Space>
      ),
    }
    ,
  ];
  // const data = [
  //   {
  //     examName: 'John Brown',
  //     examKey: 32,
  //     createdBy: 'New York No. 1 Lake Park',
  //     createdAt:'New York No. 1 Lake Park',
  //     access: 'New York No. 1 Lake Park',
  //   },
   
  // ];


  const data = exams.map((exam) => ({
    key: exam._id,
    examName: exam.examName,
    examKey: exam.examKey,
    createdBy: exam.createdBy.firstName + ' ' + exam.createdBy.lastName,
    createdAt: new Date(exam.createdAt).toLocaleString(),
    securityLevel: exam.securityLevel,
    access: exam.access,
  }));
  


 
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <h1 className='text-2xl font-bold text-blue-900 text-left'>Exams</h1>

        <div className='flex flex-col justify-start w-96'>
          <Search
            placeholder='Search Exams'
            allowClear
            enterButton='Search'
            size='medium'
            onSearch={onSearch}
          />
        </div>

        {workspace?._id in userOrganizationsIdAndRole && (
          <Link
            to='/dashboard/create-exam'
            className='flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded'>
            <Icon className='text-white w-4 h-4' icon='material-symbols:add' />{" "}
            Create Exam
          </Link>
        )}
      </div>
      <div>
       
      <Table columns={columns} dataSource={data} />;

      </div>
    </div>
  );
};

export default ExamsPage;
