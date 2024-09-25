import { Icon } from "@iconify/react/dist/iconify.js";
import { List, Card, Avatar, Tag, Divider } from "antd";
import { useState } from "react";

const serverURL = import.meta.env.VITE_SERVER_URL;

const ExamineeListWindow = ({ examineeList, setSeeStatusOf }) => {
  const [highlight, setHighlight] = useState(null);

  const handleItemClick = (index, userId) => {
    setHighlight(index);
    setSeeStatusOf(userId);
  };

  return (
    <Card className="w-2/6 h-fit">
      <div className="flex flex-col gap-4">
        <Tag color="blue">
          <p className="font-semibold text-lg text-center">Examinees</p>
        </Tag>
      </div>

      {/* Overview Item */}
      <List
        itemLayout="horizontal"
        dataSource={[{ title: "Overview" }]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={
                    <Icon icon="material-symbols:overview-outline-rounded" />
                  }
                />
              }
              title={
                <Divider orientation="left">
                  <a
                    className={
                      "flex gap-2 items-center justify-center font-semibold  text-[1rem]" +
                        highlight ===
                      -1
                        ? "bg-blue-900 text-blue-900"
                        : ""
                    }
                    onClick={() => handleItemClick(-1, "all")}
                  >
                    {item.title}
                  </a>
                </Divider>
              }
            />
          </List.Item>
        )}
      />

      {/* Examinee List */}
      <List
        className="border border-gray-200 rounded-md"
        itemLayout="horizontal"
        dataSource={examineeList}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            className={`cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 ${
              highlight === index ? "bg-blue-100" : ""
            }`}
            onClick={() => handleItemClick(index, item.user._id)}
          >
            <List.Item.Meta
              avatar={<Avatar src={`${serverURL}${item.user.profilePhoto}`} />}
              title={
                <div className="flex items-center justify-center gap-4">
                  <a
                    onClick={() => handleItemClick(index, item.user._id)}
                    className={`font-semibold text-[1rem] ${
                      highlight === index ? "text-blue-900" : "text-green-900"
                    }`}
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
