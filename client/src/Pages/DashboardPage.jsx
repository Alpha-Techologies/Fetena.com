import AreaChart from '../Screens/DashboardScreens/components/AreaChart';
import LineChartt from '../Screens/DashboardScreens/components/LineChart';
import BarChart from '../Screens/DashboardScreens/components/BarChart';
import { Card } from 'antd';
import Stats from '../Screens/DashboardScreens/components/Stats';
import { useState,useEffect } from 'react';
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';


const DashboardPage = () => {

const [examStats,setExamStats] = useState({})
const [orgStats,setOrgStats] = useState({})
const { workspace } = useSelector((state) => state.data);


const fetchOrgStats = async () => {
  const id = workspace._id;

  try {
    const orgResponse = await axios.get(
      `/api/stats/org/${id}`
    );


    const examResponse = await axios.get(
      `/api/stats/exam/${id}`
    );
    await setExamStats(examResponse.data)
    await setOrgStats(orgResponse.data)



   console.log(examResponse,"examResponse")

   console.log(orgResponse,"orgResponse")

setExamStats(examResponse.data)
setOrgStats(orgResponse.data)

 

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  }



useEffect(() => {
  fetchOrgStats();
},[])

  return (
    <div className='flex flex-col gap-2'>
    
    <Stats orgStats={orgStats} examStats={examStats} />
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mx-2 lg:gap-2 '>

  <Card >

<AreaChart examStats={examStats} />
  </Card>
  <Card>

<BarChart  examStats={examStats} />
  </Card>
 
  
</div>
<Card>
<LineChartt examStats={examStats} />
    </Card>

    </div>
  )
}
export default DashboardPage