import { Table, Tag } from "antd";
import { getAllActivities } from "../Redux/features/dataActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ActivitiesSysAdmin = () => {
  const dispatch = useDispatch();
  const [activitesList, setActivitesList] = useState([]);
  const url = "http://localhost:8080";

  const columns = [
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
    },
    {
      title: "Logo",
      dataIndex: "organizationLogo",
      key: "organizationLogo",
      render: (text) => (
        <img
          className='rounded-full w-5 h-5'
          src={url + text}
        />
      ),
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "User Profile",
      dataIndex: "userProfile",
      key: "userProfile",
      render: (text) => (
        <img
          className='rounded-full w-5 h-5'
          src={url + text}
        />
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "User Email",
      dataIndex: "userEmail",
      key: "userEmail",
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
      render: (text) =>
        text === "created" ? (
          <Tag
            className='capitalize'
            color='green'>
            {text}
          </Tag>
        ) : text === "edited" ? (
          <Tag
            className='capitalize'
            color='blue'>
            {text}
          </Tag>
        ) : text === "archived" ? (
          <Tag
            className='capitalize'
            color='red'>
            {text}
          </Tag>
        ) : text === "loggedIn" ? (
          <Tag
            className='capitalize'
            color='purple'>
            {text}
          </Tag>
        ) : text === "deactivated" ? (
          <Tag
            className='capitalize'
            color='red'>
            {text}
          </Tag>
        ) : text === "activated" ? (
          <Tag
            className='capitalize'
            color='green'>
            {text}
          </Tag>
        ) : text === "delete" ? (
          <Tag
            className='capitalize'
            color='red'>
            {text}
          </Tag>
        ) : (
          <Tag
            className='capitalize'
            color='green'>
            {text}
          </Tag>
        ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  const fetchAllActivites = () => {
    setActivitesList([]);
    dispatch(getAllActivities())
      .then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "fulfilled") {
          const tempData = res.payload.data.data;
          for (const data of tempData) {
            setActivitesList((prev) => [
              ...prev,
              {
                key: data._id,
                entity: data.entity.name,
                user: data.user.fullName,
                userProfile: data.user.profilePhoto,
                userEmail: data.user.email,
                organization: data.organization.name,
                organizationLogo: data.organization.logo,
                ipAddress: data.ipAddress,
                action: data.action,
                time: data.createdAt,
              },
            ]);
          }
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
  };

  useEffect(() => {
    fetchAllActivites();
  }, []);

  return (
    <div className='flex flex-col gap-4 items-start'>
      <h1 className='text-2xl font-bold text-blue-900 text-left'>Activities Log</h1>
      <Table
        className='w-full'
        columns={columns}
        dataSource={activitesList}
      />
    </div>
  );
};
export default ActivitiesSysAdmin;
