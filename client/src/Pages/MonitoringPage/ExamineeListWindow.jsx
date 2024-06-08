import { Icon } from "@iconify/react";
import { List, Card, Avatar, Tag, Divider } from "antd";

// const serverURL = "http://localhost:3000";


  const serverURL = import.meta.env.VITE_API_URL;



const ExamineeListWindow = ({ examineeList, setSeeStatusOf }) => {
  return (
    <Card className="w-2/6 h-fit">
      <div className="flex flex-col gap-4">
        <Tag color="blue">
          <p className="font-semibold text-lg text-center">Examinees</p>
        </Tag>

        {/* <Search
            placeholder='Search Examinee'
            allowClear
          /> */}

        {/* <span className='font-semibold italic'>Submitted (4)</span> */}
      </div>
      <List
        itemLayout="horizontal"
        dataSource={[{ title: "Overview" }]}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                
                <Avatar
                  src={
                    <Icon icon="material-symbols:overview-outline-rounded" />
                  }
                />
              }
              title={
                <Divider orientation="left">
                  <a
                    className=" flex gap-2 items-center justify-center font-semibold  text-blue-800 text-[1rem]"
                    onClick={() => setSeeStatusOf("all")}
                  >
                    {item.title}
                  </a>
                </Divider>
              }
            />
          </List.Item>
        )}
      />
      <List
        className="-mt-2 border  px-2 border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out"
        itemLayout="horizontal"
        dataSource={examineeList}
        renderItem={(item, index) => (
          <List.Item onClick={() => setSeeStatusOf(item.user._id)}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`${serverURL + item.user.profilePhoto}`}
                  className="flex items-center justify-center"
                />
              }
              title={
                <div className="flex items-center justify-center gap-4">
                  <a
                    onClick={() => setSeeStatusOf(item.user._id)}
                    className=" font-semibold text-[1rem]"
                  >
                    {item.user.fullName}
                  </a>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ExamineeListWindow;
