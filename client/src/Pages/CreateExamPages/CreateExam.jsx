import { Card } from "antd";
import { useState } from "react";

const tabListNoTitle = [
  {
    key: "article",
    label: "article",
  },
  {
    key: "app",
    label: "app",
  },
];
const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  
};

const CreateExam = () => {
    const [activeTabKey1, setActiveTabKey1] = useState("tab1");
    const [activeTabKey2, setActiveTabKey2] = useState("app");
    const onTab1Change = (key) => {
      setActiveTabKey1(key);
    };
    const onTab2Change = (key) => {
      setActiveTabKey2(key);
    };
  return (
    <div className='flex flex-col gap-4 my-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Create Exam</h1>
      </div>
      <div>
        <Card
          style={{
            width: "100%",
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey2}
          tabBarExtraContent={<a href='#'>More</a>}
          onTabChange={onTab2Change}
          tabProps={{
            size: "middle",
          }}>
          {contentListNoTitle[activeTabKey2]}
        </Card>
      </div>
    </div>
  );
};
export default CreateExam;
