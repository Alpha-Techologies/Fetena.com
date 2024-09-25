import { Menu, Switch } from "antd";
import Calculator from "./Calculator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import moment from "moment";

const CountDown = ({ showCountdown, startTime, duration, onCountdownEnd }) => {
  // console.log(startTime, duration, "start time and duration");
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      const countdownEnd = moment(startTime).add(duration * 60, "seconds");
      const remaining = countdownEnd.diff(now, "seconds");

      if (remaining <= 0) {
        clearInterval(interval);
        onCountdownEnd(); // Call the onCountdownEnd function
      } else {
        setTimeRemaining(remaining);
      }

      // console.log(timeRemaining, "time remaining");
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, onCountdownEnd]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  const formattedTimeRemaining = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return (
    <div className={`${showCountdown ? "" : "hidden"}`}>
      <h2>Countdown</h2>
      <p>{formattedTimeRemaining}</p>
    </div>
  );
};

const ExamTools = ({ exam, isCharging, batteryLevel, examinee, showMaterial, setShowMaterial }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [examToolItems, setExamToolItems] = useState([]);
  let countdownStart = null;
  let countdownEnd = null;

  useEffect(() => {
    if (Object.keys(examinee).length !== 0) {
      console.log(examinee, "examinee");
      setStartTime(examinee.startTime);
      console.log(startTime, "start time");
      countdownStart = moment(new Date(examinee.startTime));
    }
  }, [examinee]);

  useEffect(() => {
    if (exam && Object.keys(examinee).length !== 0) {
      setDuration(exam.duration);
      console.log(duration);
      countdownEnd = countdownStart.add(duration * 60, "seconds");
    }
    setExamToolItems([]);
    populateExamToolItems();
  }, [exam, examinee]);

  // useEffect(() => {
  //   setStartTime(moment());
  //   console.log(startTime);
  // }, [])

  const onCalculatorChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setShowCalculator(checked);
  };

  const onMaterialChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setShowMaterial(checked);
  };

  const onCountdownChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setShowCountdown(checked);
  };

  const onCountdownEnd = () => {
    console.log("countdown ended");
  };

  const populateExamToolItems = () => {
    if (exam.examType === "pdfUpload") {
      setExamToolItems((prev) => [
        ...prev,
        { key: "1", label: "PDF Exam" },
      ]);
    } else if (exam.examType === "online") {
      setExamToolItems((prev) => [...prev, { key: "1", label: <span>Exam</span> }]);
    } else if (exam.examType === "worksheet") {
      setExamToolItems((prev) => [
        ...prev,
        { key: "1", label: <span>Worksheet</span>},
      ]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   setExamToolItems([])
  //   populateExamToolItems()
  // }, [exam])

  return (
    <div className='flex flex-col flex-grow gap-12 h-auto justify-between'>
      <Menu
        theme='light'
        mode='inline'
        defaultSelectedKeys={["1"]}
        items={examToolItems}
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
              onChange={onCalculatorChangeSwitch}
            />
          </div>
        )}
        {exam.material && (
          <div className='flex gap-2 items-center justify-center'>
            <Icon className="w-5 h-5" icon='ph:files' />
            <p>Material</p>
            <Switch
              size='small'
              defaultChecked={showMaterial}
              onChange={onMaterialChangeSwitch}
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
        <div className='flex gap-2 items-center'>
          <div>
            <CountDown
              showCountdown={showCountdown}
              startTime={startTime}
              duration={duration}
              onCountdownEnd={onCountdownEnd}
            />
          </div>
          {/* <Switch
            size='small'
            defaultChecked={showCountdown}
            onChange={onCountdownChangeSwitch}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ExamTools;
