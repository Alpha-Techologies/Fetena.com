import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ResultsPage = () => {
  const [results, setResults] = useState({});
  useEffect(() => {
    // Fetch exam results from the server

    fetchUserResults(1);
  }, []);

  const onPaginationChange = (page) => {
    fetchUserResults(page);
  };

  const fetchUserResults = async (page) => {
    try {
      const response = await axios.get("/api/exams/taken-exams?page=" + page);
      const data = response.data.data;

      const result = data.data.map((result, index) => {
        // const score = result

        return {
          key: index,
          examName: result.exam.examName,
          score: result.userAnswers.score,
          examDate: new Date(result.startTime).toLocaleString(),
        };
      });

      setResults({ ...data, tableData: result });
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };
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
    <div className="flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold text-blue-900 text-left">
        Your Exam Results
      </h1>
      <div className="flex flex-col gap-4 items-start w-full">
        <Table
          className="w-full"
          columns={columns}
          dataSource={results.tableData}
          pagination={{
            current: results.paginationData?.currentPage,
            total: results.paginationData?.totalPages * 10,
            onChange: onPaginationChange,
          }}
          rowKey={"key"}
        />
        ;
      </div>
    </div>
  );
};
export default ResultsPage;
