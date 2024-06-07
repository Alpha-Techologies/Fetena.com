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
    <div className='flex flex-col gap-4 items-start'>
      <h1 className='text-2xl font-bold text-blue-900 text-left'>Your Exam Results</h1>
      <div className='flex flex-col gap-4 items-start w-full'>
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