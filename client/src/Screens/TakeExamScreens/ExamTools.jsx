import { Menu, Switch } from "antd";
import Calculator from "./Calculator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import moment from "moment";


const ExamTools = ({exam, isCharging, batteryLevel}) => {
    const [currentTime, setCurrentTime] = useState(moment());
    const [showCalculator, setShowCalculator] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(moment());
      }, 1000 * 60);

      return () => {
        clearInterval(interval);
      };
    }, []);
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setShowCalculator(checked);
  };
  return (
    <div className='flex flex-col flex-grow gap-12 h-auto justify-between'>
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            // icon: <UserOutlined />,
            label: "Exam",
          },
          {
            key: "2",
            // icon: <UserOutlined />,
            label: "References",
          },
        ]}
      />
      {showCalculator && <Calculator />}
      <div className='flex flex-col gap-2 items-center justify-center text-black'>
        {exam.toolsPermitted.includes("calculator") && (
          <div className='flex gap-2 items-center justify-center'>
            <Icon
              className='w-5 h-5'
              icon='ph:calculator-fill'
            />
            <p>Calculator</p>
            <Switch
              size='small'
              defaultChecked={showCalculator}
              onChange={onChangeSwitch}
            />
          </div>
        )}
        <div className='flex gap-2'>
          {isCharging ? (
            <Icon
              className='text-green-500 w-6 h-6'
              icon='tabler:battery-charging'
            />
          ) : batteryLevel < 10 ? (
            <Icon
              className='text-error-500 w-6 h-6'
              icon='tabler:battery'
            />
          ) : batteryLevel < 40 ? (
            <Icon
              className='text-yellow-500 w-6 h-6'
              icon='tabler:battery-2'
            />
          ) : batteryLevel < 50 ? (
            <Icon
              className='text-yellow-500 w-6 h-6'
              icon='tabler:battery-3'
            />
          ) : (
            <Icon
              className='text-green-500 w-6 h-6'
              icon='tabler:battery-4-filled'
            />
          )}
          <p>Battery Level: {batteryLevel}%</p>
        </div>

        <div className='flex gap-2'>
          <Icon
            className='w-6 h-6 text-primary-500'
            icon='mingcute:time-line'
          />
          <p>Time: {currentTime.format("hh:mm")}</p>
        </div>
      </div>
    </div>
  );
};


export default ExamTools