import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Card,
  Table,
  Form,
  Select,
  Tag,
  Input,
  Alert,
  InputNumber,
} from "antd";
import moment from "moment";

const { TextArea } = Input;


const ResultsTab = ({seeStatusOf, setSeeStatusOf}) => {

const currentTime = moment();

  const resultsTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Submision Time",
      key: "submissionTime",
      dataIndex: "submissionTime",
    },
  ];

  const resultsTableData = [
    {
      key: "1",
      name: "John Brown",
      email: "johnbrown@gmail.com",
      points: "8/10",
      submissionTime: currentTime.format(),
    },
    {
      key: "2",
      name: "John Brown",
      email: "johnbrown@gmail.com",
      points: "8/10",
      submissionTime: currentTime.format(),
    },
    {
      key: "3",
      name: "John Brown",
      email: "johnbrown@gmail.com",
      points: "8/10",
      submissionTime: currentTime.format(),
    },
  ];

  const ResultsOverviewPage = () => {
    return (
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-3 gap-4 w-full'>
          <Card>
            <div>
              <p className='font-bold text-xl italic'>4</p>
              <p>Exams Marked</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className='font-bold text-xl italic'>10</p>
              <p>Ongoing</p>
            </div>
          </Card>
        </div>
        <Table
          columns={resultsTableColumns}
          dataSource={resultsTableData}
        />
      </div>
    );
  };

  const ResultsIndividualPage = () => {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between w-full'>
          <div
            onClick={() => setSeeStatusOf("all")}
            className='flex items-center gap-2 text-primary-500 cursor-pointer'>
            <Icon icon='lets-icons:back' />
            Back to Overview
          </div>
          <div className='flex items-center gap-4'>
            <div className='px-4 py-1 rounded-full flex items-center gap-2 border border-primary-500 cursor-pointer'>
              <Icon icon='hugeicons:file-export' /> Export
            </div>
            <div className='px-4 py-1 rounded-full flex items-center gap-2 border border-primary-500 cursor-pointer'>
              <Icon icon='mdi:email-send-outline' /> Send to Email
            </div>
          </div>
        </div>
        <div className='flex items-start flex-col gap-4'>
          <div className='flex items-center justify-start'>
            <span className='font-bold text-xl justified'>
              Yohannes Teshome
            </span>
            {false ? (
              <p className='text-green-500 ml-2 flex items-center justify-center'>
                <Icon icon='icon-park-outline:dot' /> Ongoing
              </p>
            ) : (
              <p className='text-gray-500 ml-2 flex items-center justify-center'>
                <Icon icon='icon-park-outline:dot' /> Finished
              </p>
            )}
          </div>
          <p className='text-gray-500'>
            {" "}
            <span className='text-primary-500 font-semibold'>
              {" "}
              Email:{" "}
            </span>{" "}
            0J9qg@example.com
          </p>
        </div>
        {/* True/False Question */}
        <Card className=' w-11/12 mx-auto bg-gray-50 rounded-none'>
          <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
            <h3 className='text-blue-900 font-semibold text-lg'>Question 1</h3>
            <p className='font-semibold text-blue-900'>Points 1</p>
          </div>
          <div className='mt-4 mx-4 flex items-start'>
            <h3 className='font-semibold text-[1rem]'>Some question</h3>
          </div>
          <div className='mt-8 flex items-center h-fit justify-start mx-4 w-72 '>
            <Form.Item label='Your Answer'>
              <Select defaultActiveFirstOption={"true"}>
                <Select.Option value='true'>True</Select.Option>
                <Select.Option value='false'>False</Select.Option>
              </Select>
            </Form.Item>
            {/* {true ? (
                <Icon
                  className='text-green-500'
                  icon='icon-park-solid:correct'
                />
              ) : (
                <Icon
                  className='text-red-500'
                  icon='icomoon-free:cross'
                />
              )} */}
          </div>
          <div className='flex flex-col gap-2 w-full'>
            {"aa" === "a" ? (
              <Tag
                className='flex items-center w-fit gap-2'
                color='blue'>
                <Icon icon='mdi:checkbox-marked-outline' />
                Manually Marked
              </Tag>
            ) : "aa" === "aa" ? (
              <Tag
                className='flex items-center w-fit gap-2'
                color='green'>
                <Icon icon='lucide:bot' />
                Automatically Marked
              </Tag>
            ) : (
              <Tag
                className='flex items-center w-fit gap-2'
                color='red'>
                <Icon icon='mage:file-question-mark' />
                Not Yet Marked
              </Tag>
            )}
            <div className='flex gap-2 items-center w-full'>
              <Alert
                message='Answered Correctly'
                className='w-[90%]'
                type='success'
                showIcon
              />
              <InputNumber
                className='w-[10%]'
                min={1}
                max={10}
                defaultValue={3}
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              {"aa" === "a" ? (
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='blue'>
                  <Icon icon='mdi:checkbox-marked-outline' />
                  Manually Marked
                </Tag>
              ) : "aa" === "aa" ? (
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='green'>
                  <Icon icon='lucide:bot' />
                  Automatically Marked
                </Tag>
              ) : (
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='red'>
                  <Icon icon='mage:file-question-mark' />
                  Not Yet Marked
                </Tag>
              )}
              <div className='flex gap-2 items-center w-full'>
                <Alert
                  message='Incorrect Answer'
                  className='w-[90%]'
                  type='error'
                  showIcon
                />
                <InputNumber
                  className='w-[10%]'
                  min={1}
                  max={10}
                  defaultValue={3}
                />
              </div>
            </div>
          </div>
        </Card>
        {/* Short Answer */}
        <Card className='bg-gray-50 w-11/12 mx-auto my-2'>
          <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
            <h3 className='text-blue-900 font-semibold text-lg'>Question 2</h3>
            <p className='font-semibold text-blue-900'>Points 1</p>
          </div>

          <div className='mt-4 mx-4 flex items-start '>
            <h3 className='font-semibold text-[1rem]'>Some Question</h3>
          </div>

          <div className='mt-4 flex items-start mx-4 mb-4'>
            <TextArea
              rows={4}
              placeholder='Enter your question here'
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-2 w-full'>
              <div className='flex gap-2 items-center justify-between w-full'>
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='blue'>
                  <Icon icon='mdi:checkbox-marked-outline' />
                  Manually Marked Question
                </Tag>

                <InputNumber
                  className='w-[10%]'
                  min={1}
                  max={10}
                  defaultValue={3}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div>
      {seeStatusOf === "all" ? (
        <ResultsOverviewPage />
      ) : (
        <ResultsIndividualPage />
      )}
    </div>
  );
};

export default ResultsTab;
