import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const fetchLogs = async () => {
  try {
    const response = await axios.get(`/api/log`);
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};

const ActivityLogPage = () => {
  const [logs, setLogs] = useState([]);

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

  const formatLogsData = (logs) => {
    return logs.map((log, index) => ({
      key: index,
      date: new Date(log.createdAt).toLocaleString(),
      user: log.user ? log.user.name || log.user._id : "Unknown",
      action: log.action,
      details: `${log.entity.name} with ID ${log.entity.id}`,
    }));
  };

  useEffect(() => {
    const getLogs = async () => {
      const data = await fetchLogs();
      setLogs(formatLogsData(data));
    };

    getLogs();
  }, []);

  return (

    <div className='flex flex-col gap-4 items-start'>
       <h1 className='text-2xl font-bold text-blue-900 text-left'>Activity Logs</h1>
      <div className='flex flex-col gap-4 items-start  w-full'>
        <Table
          className='w-full'
          columns={columns}
          dataSource={data}
          rowKey={"key"}
          scroll={{ x: 900 }}
        />
        ;

    <div className="flex flex-col gap-4 items-start my-4">
      <h1 className="text-2xl font-bold text-blue-900 text-left">Activity Logs</h1>
      <div className="flex flex-col gap-4 items-start my-4">
        <Table className="w-full" columns={columns} dataSource={logs} rowKey={"key"} />

      </div>
    </div>
  );
};

export default ActivityLogPage;