import { Table } from "antd";

const ActivityLogPage = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  const data = [
    {
      key: "1",
      date: "2022-01-01",
      user: "John Doe",
      action: "Created",
      details: "Exam with ID 12345",
    },
    {
      key: "2",
      date: "2022-01-02",
      user: "Jane Smith",
      action: "Updated",
      details: "Exam with ID 67890",
    },
    {
      key: "3",
      date: "2022-01-03",
      user: "Bob Johnson",
      action: "Deleted",
      details: "Exam with ID 24680",
    },
    {
      key: "4",
      date: "2022-01-03",
      user: "Bob Johnson",
      action: "Gave Exam",
      details: "Exam with ID 24680",
    },
  ];
  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>Activity Logs</h1>
      <div className='flex flex-col gap-4 items-start my-4'>
        <Table
          className='w-full'
          columns={columns}
          dataSource={data}
          rowKey={"key"}
        />
        ;
      </div>
    </div>
  );
};
export default ActivityLogPage;