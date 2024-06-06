import { Menu, Switch } from "antd";
import Calculator from "./Calculator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import moment from "moment";

const CountDown = ({ startTime, duration }) => {
  // console.log(startTime, duration, "start time and duration");
  const [timeRemaining, setTimeRemaining] = useState(duration);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const countdownEnd = moment("2024-06-06T00:55:40.921+00:00").add(
        duration * 60,
        "seconds"
      );
      const remaining = countdownEnd.diff(now, "seconds");
      setTimeRemaining(remaining);
      // console.log(timeRemaining, "time remaining");
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTimeRemaining = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return (
    <div>
      <h2>Countdown</h2>
      <p>{formattedTimeRemaining}</p>
    </div>
  );
};

const ExamTools = ({ exam, isCharging, batteryLevel, examinee }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [showCalculator, setShowCalculator] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [countdown, setCountdown] = useState(null);
  let countdownStart = null;
  let countdownEnd = null;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(examinee).length !== 0) {
      console.log(examinee, "examinee");
      setStartTime(examinee.startTime);
      console.log(startTime, "start time");
      countdownStart = moment(examinee.startTime);
    }
  }, [examinee]);

  useEffect(() => {
    if (exam && Object.keys(examinee).length !== 0) {
      setDuration(exam.duration);
      console.log(duration);
      countdownEnd = countdownStart.add(duration * 60, "seconds");
    }
  }, [exam, examinee]);

  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = moment();
  //     const diff = countdownEnd.diff(now, "seconds");
  //     setCountdown(diff);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [countdownEnd])

  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setShowCalculator(checked);
  };
  return (
    <div className="flex flex-col flex-grow gap-12 h-auto justify-between">
      <Menu
        theme="light"
        mode="inline"
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
      <div className="flex flex-col gap-2 items-center justify-center text-black">
        {exam.toolsPermitted.includes("calculator") && (
          <div className="flex gap-2 items-center justify-center">
            <Icon className="w-5 h-5" icon="ph:calculator-fill" />
            <p>Calculator</p>
            <Switch
              size="small"
              defaultChecked={showCalculator}
              onChange={onChangeSwitch}
            />
          </div>
        )}
        <div className="flex gap-2">
          {isCharging ? (
            <Icon
              className="text-green-500 w-6 h-6"
              icon="tabler:battery-charging"
            />
          ) : batteryLevel < 10 ? (
            <Icon className="text-error-500 w-6 h-6" icon="tabler:battery" />
          ) : batteryLevel < 40 ? (
            <Icon className="text-yellow-500 w-6 h-6" icon="tabler:battery-2" />
          ) : batteryLevel < 50 ? (
            <Icon className="text-yellow-500 w-6 h-6" icon="tabler:battery-3" />
          ) : (
            <Icon
              className="text-green-500 w-6 h-6"
              icon="tabler:battery-4-filled"
            />
          )}
          <p>Battery Level: {batteryLevel}%</p>
        </div>

        <div className="flex gap-2">
          <Icon
            className="w-6 h-6 text-primary-500"
            icon="mingcute:time-line"
          />
          <p>Time: {currentTime.format("hh:mm")}</p>
        </div>
        <div>
          <CountDown startTime={startTime} duration={duration} />
        </div>
      </div>
    </div>
  );
};

export default ExamTools;
