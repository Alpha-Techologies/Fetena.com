import { Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers, toggleUserActivation } from "../Redux/features/dataActions";
import { toast } from "react-toastify";

const UsersSysAdmin = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const url = 'http://localhost:8080'
    const [openRowId, setOpenRowId] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const showPopconfirm = (rowId) => {
      // setOpen(true);
      setOpenRowId(rowId);
    };

    const handleCancel = () => {
      console.log("Clicked cancel button");
      // setOpen(false);
      setOpenRowId(null);
    };

    const handleActivate = (userId) => {
      console.log(userId, "handleActivate")
      dispatch(
        toggleUserActivation({ id: userId, activation: { active: true } })
      )
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("User activated successfully");
            setOpenRowId(null);
            fetchUsers();
          } else {
            toast.error(res.payload.message);
            setOpenRowId(null);
            // fetchUsers();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error in the server!");
        });
    }
    
    const handleDeactivate = (userId) => {
      console.log(userId, "handleDeactivate")
      dispatch(toggleUserActivation({id: userId, activation: {active: false}}))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("User deactivated successfully");
          setOpenRowId(null);
          fetchUsers();
        } else {
          toast.error(res.payload.message);
          setOpenRowId(null);
          // fetchUsers();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server!");
      });
    }

    const columns = [
      {
        title: "Pic.",
        dataIndex: "profilePhoto",
        key: "profilePhoto",
        render: (text) => (
          <img
            className='rounded-full w-5 h-5'
            src={url + text}
          />
        ),
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "Action",
        key: "active",
        dataIndex: "id",
        render: (text, record) => (
          <Popconfirm
            title='Warning'
            description='Are you sure to continue?'
            open={openRowId === text}
            onConfirm={
              record.active
                ? () => handleDeactivate(text)
                : () => handleActivate(text)
            }
            okButtonProps={{
              loading: confirmLoading,
            }}
            onCancel={handleCancel}>
            <Button
              className={`${
                record.active
                  ? "bg-red-500"
                  : "bg-blue-500"
              } text-white`}
              onClick={() => showPopconfirm(text)}>
              {record.active
                ? "Deactivate"
                : "Activate"
                }
            </Button>
          </Popconfirm>
        ),
      },
    ];

    const fetchUsers = () => {
      setUsers([]);
      dispatch(getAllUsers())
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            console.log(res.payload.data.data);
            const data = res.payload.data.data;
              const updatedUsers = data.map((item) => ({
                key: item._id,
              id: item._id,
              profilePhoto: item.profilePhoto,
              fullName: item.fullName,
              email: item.email,
              phoneNumber: item.phoneNumber,
              active: item.active,
            }));
            setUsers(updatedUsers);
            console.log("fetced users", updatedUsers);
          } else {
            toast.error(res.payload.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error in the server!");
        });
    };

    useEffect(() => {
      fetchUsers();
    }, []);

  return (
    <div className='flex flex-col gap-4 items-start'>
      <h1 className='text-2xl font-bold text-blue-900 text-left'>
        Users List
      </h1>
      <Table
        className='w-full'
        columns={columns}
        dataSource={users}
      />
    </div>
  );
}
export default UsersSysAdmin