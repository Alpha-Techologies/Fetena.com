import { Table } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"

const OrganizationStaffPage = () => {

  const { workspace } = useSelector(state => state.data)
  console.log(workspace.examiners);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag
                color={color}
                key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  return (
    <div className='flex flex-col gap-4 items-start my-4'>
      <h1 className='text-3xl font-bold justify-self-start'>
        Organizations Staffs
      </h1>
      <div className='flex flex-col gap-4 items-start my-4'>
        {/* <Table
          columns={columns}
          dataSource={data}
        /> */}
        ;
      </div>
    </div>
  );
}
export default OrganizationStaffPage