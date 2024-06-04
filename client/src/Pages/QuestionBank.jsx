import { Card, Form, Button, Input, Avatar, Pagination, Badge, Tag, Space, Table, Popover, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';


const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const { Meta } = Card;



const QuestionBank = () => {
  const [activeTabKey, setActiveTabKey] = useState("All");
  const [basicInfoForm] = Form.useForm();
  const { workspace } = useSelector((state) => state.data);
  const { userOrganizationsIdAndRole } = useSelector((state) => state.data);
  const [exams, setExams] = useState([]);
  const [pages, setPages] = useState(1); // Total pages of organizations
  const [current, setCurrent] = useState(1); // Current page number





  const fetchData = async (page=1,active=true,access="") => {
    const id = workspace._id
  
    if (userOrganizationsIdAndRole[id] && userOrganizationsIdAndRole[id] === "admin") {


    
    try {
      const response = await axios.get(`/api/exams/my-exam/${id}?active=${active}&access=${access}`);
      
     console.log(response.data.data.data,"bitch")
      setExams(response.data.data.data);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  };



  useEffect(() => {
    

    fetchData(1,true);
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
            <Link to={`/dashboard/exams/preview/${record.key}`}>
              <Icon icon="fa6-solid:binoculars" className="text-blue-800 font-bold text-2xl hover:text-black" />
            </Link>
          </Popover>
    
          <Popover title="Delete Exam" trigger="hover" className="cursor-pointer">
            {console.log("record",record)}
            {record.active ? (
              
              <Icon icon="material-symbols:delete" className="text-blue-800 font-bold text-2xl hover:text-black" onClick={() => confirmDelete(record.key)} />
            ) : (
              <Icon icon="pajamas:redo" className="text-blue-800 font-bold text-2xl hover:text-black" onClick={() => archiveExam(record.key)} />
            )}
          </Popover>
        </Space>
      ),
    }
    
    ,
  ];


  const filterByStatus = (key) => {
    if (key === 'Active') {
      fetchData(1);    }
    else {
      fetchData(1,false);
    }
  }

  const filterByAccess = (key) => {
    if (key === 'Open') {
      fetchData(1,true,"open");    }
    else {
      fetchData(1,true,"closed");
    }
  }


  const data = exams.map((exam) => ({
    key: exam._id,
    examName: exam.examName,
    examKey: exam.examKey,
    createdBy: exam.createdBy.firstName + ' ' + exam.createdBy.lastName,
    createdAt: new Date(exam.createdAt).toLocaleString(),
    securityLevel: exam.securityLevel,
    access: exam.access,
    active: exam.active
  }));
  


  const handleDelete = async (examId) => {
    try {
      await axios.delete(`/api/exams/${examId}`);
      toast.success("Exam deleted successfully");
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));
    } catch (error) {
      console.error("Error deleting exam:", error);
      toast.error("Failed to delete exam");
    }
  };


  const confirmDelete = (examId) => {
    console.log("exam id",examId)
    Modal.confirm({
      title: "Are you sure you want to delete this exam?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(examId),
    });
  };


 
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-blue-900 text-left'>Question bank</h1>

        

       <div className="flex gap-4">

   

        <div className='flex flex-col justify-start w-96'>
          <Search
            placeholder='Search Exams'
            allowClear
            enterButton='Search'
            size='medium'
            onSearch={onSearch}
          />
         
        </div>


        <span className='flex items-center'>
  <span className='w-full font-semibold text-blue-800'>Status :</span>
  <Select
    defaultValue=''
    className='h-full ml-2'
    style={{
      width: 'auto',
      minWidth: 100, // Ensure a minimum width for better appearance
    }}
    onChange={(value) => filterByStatus(value)}
    options={[
      {
        value: "Active",
        label: "Active",
      },
      {
        value: "Archived",
        label: "Archived",
      },
    ]}
    dropdownMatchSelectWidth={false} // Prevent the dropdown from matching the select's width
  />
</span>

</div>

       

      </div>
      <div>
       
      <Table columns={columns} dataSource={data} />;

      </div>
    </div>
  );
};

export default QuestionBank;
