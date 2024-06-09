import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";


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
      title: "IP Address",
      dataIndex: "ipAddress",
      key: "ipAddress",
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

  const fetchLogs = async () => {
    try {
      const response = await axios.get("/api/log");
      console.log(response, "logs")
      // setLogs(response.data.data.data)
      formatLogsData(response.data.data.data)
      console.log('this is')
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };
  

  const formatLogsData = (tempLogs) => {
    for (const log of tempLogs){
      setLogs((prev) => [...prev, {
        key: log._id,
      date: new Date(log.createdAt).toLocaleString(),
      user: log.user.fullName,
      ipAddress: log.ipAddress,
      action: log.action,
      details: `${log.entity.name} with ID ${log.entity.id}`,
      }])
    }
    
  };

  useEffect(() => {
    fetchLogs()
    
  }, []);

  return (
    <div className="flex flex-col gap-4 items-start my-4">
      <h1 className="text-2xl font-bold text-blue-900 text-left">Activity Logs</h1>
      <div className="flex flex-col gap-4 items-start w-full">
        <Table
          className="w-full"
          columns={columns}
          dataSource={logs}
          rowKey={"key"}
          scroll={{ x: 900 }}
        />
      </div>
    </div>
    </div>
    </div>
  );
};

export default ActivityLogPage;