import { Icon } from "@iconify/react";
import { List, Card, Avatar } from "antd";
// const serverURL = "http://localhost:3000";
const serverURL = false ? "http://localhost:8080" : "http://13.49.21.227:8080";

const ExamineeListWindow = ({ examineeList, setSeeStatusOf }) => {
  return (
    <Card className="w-2/6 h-fit">
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Examinees</p>

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
              title={<a onClick={() => setSeeStatusOf("all")}>{item.title}</a>}
            />
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={examineeList}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`${serverURL + item.user.profilePhoto}`} />}
              title={
                <a onClick={() => setSeeStatusOf(item.user._id)}>
                  {item.user.fullName}
                </a>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ExamineeListWindow;
