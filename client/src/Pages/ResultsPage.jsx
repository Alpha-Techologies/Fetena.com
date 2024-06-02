import { Table } from "antd";

const ResultsPage = () => {

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      key: "examName",
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "examDate",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ];

  const data = [
    {
      key: "1",
      examName: "Math Exam",
      examDate: "2022-01-01",
      score: 85,
    },
    {
      key: "2",
      examName: "Science Exam",
      examDate: "2022-02-01",
      score: 92,
    },
    {
      key: "3",
      examName: "English Exam",
      examDate: "2022-03-01",
      score: 78,
    },
  ];

  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>Your Exam Results</h1>
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
}
export default ResultsPage;