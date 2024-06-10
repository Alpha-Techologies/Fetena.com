import {
  Card,
  Form,
  Button,
  Input,
  Avatar,
  Pagination,
  Badge,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const { Search } = Input;

const { Meta } = Card;

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

const UserExamsPage = () => {
  const [activeTabKey, setActiveTabKey] = useState("All");
  const [basicInfoForm] = Form.useForm();
  const { workspace } = useSelector((state) => state.data);
  const { userOrganizationsIdAndRole } = useSelector((state) => state.data);
  const [exams, setExams] = useState([]);
  const [pages, setPages] = useState(1); // Total pages of organizations
  const [current, setCurrent] = useState(1); // Current page number
  const [searchText, setSearchText] = useState(""); // Search text

  const onSearch = (value, _e, info) => {
    setSearchText(value); // Update search text
    console.log(searchText);
  };

  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(
        `/api/exams/get-public?fields=examName,organization&page=${page}&sort=-createdAt&examName=${searchText}`
      );
      setExams(response.data.data.data);
      setPages(response.data.data.totalPages); // Set the total number of pages
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchText]);

  const onPaginationChange = (page) => {
    setCurrent(page);
    fetchData(page);
  };

  const ExamCard = ({ _id, examName, organization }) => {
    return (
      <Link
        to={`/dashboard/exams/${_id}`}
        key={_id}>
        <Card
          className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200'
          style={{ width: 280 }}>
          <div className='flex gap-4'>
            <Icon
              icon='healthicons:i-exam-multiple-choice-outline'
              className='text-4xl text-blue-700'
            />
            <div className='flex-col flex items-start gap-2'>
              <h3 className='font-bold text-md text-primary-500 truncate'>
                {examName}
              </h3>
              <p className='font-semibold flex gap-2 items-center justify-center'>
                {organization?.name}{" "}
                {organization?.isVerified && (
                  <span>
                    <Icon
                      className='text-blue-500'
                      icon='mdi:verified'
                    />
                  </span>
                )}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4 items-center'>
        <h1 className='text-2xl font-bold text-blue-900 text-left'>Exams</h1>

        <div className='flex gap-2 justify-start w-96'>
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
            <Icon
              className='text-white w-4 h-4'
              icon='material-symbols:add'
            />{" "}
            Create Exam
          </Link>
        )}
      </div>
      <div>
        <Card style={{ width: "100%" }}>
          {activeTabKey === "All" && (
            <>
              <div className='flex flex-wrap gap-2'>
                {exams &&
                  exams.map((exam) => (
                    <ExamCard
                      key={exam._id}
                      {...exam}
                    />
                  ))}
              </div>
              <Pagination
                className='mt-8'
                current={current}
                total={pages * 10}
                onChange={onPaginationChange}
              />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserExamsPage;
