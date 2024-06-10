import React, { useState, useEffect } from 'react';
import AreaChart from '../Screens/DashboardScreens/components/AreaChart';
import LineChartt from '../Screens/DashboardScreens/components/LineChart';
import BarChart from '../Screens/DashboardScreens/components/BarChart';
import { Card } from 'antd';
import Stats from '../Screens/DashboardScreens/components/Stats';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ResultsPage from './ResultsPage';

import UserOrganizationsPage from './UserOrganizationsPage';


const DashboardPage = () => {
  const [examStats, setExamStats] = useState({});
  const [orgStats, setOrgStats] = useState({});
  const { workspace } = useSelector((state) => state.data);

  const fetchOrgStats = async () => {
    if (!workspace?._id) return;

    const id = workspace._id;

    try {
      const orgResponse = await axios.get(`/api/stats/org/${id}`);
      const examResponse = await axios.get(`/api/stats/exam/${id}`);

      setExamStats(examResponse.data);
      setOrgStats(orgResponse.data);

      console.log('examResponse', examResponse);
      console.log('orgResponse', orgResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




 

  useEffect(() => {
    fetchOrgStats();
  }, [workspace]);

  if (!workspace) {
    return (
      <div className='flex flex-col gap-2'>
      <Stats orgStats={orgStats} examStats={examStats} />
      <Card>
        <LineChartt examStats={examStats} />
      </Card>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mx-2 lg:gap-2'>
      <Card>
        <ResultsPage />
        </Card>
        <Card>
        <UserOrganizationsPage />
</Card>
        </div>
        </div>

    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <Stats orgStats={orgStats} examStats={examStats} />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mx-2 lg:gap-2'>
        <Card>
          <h3 className='text-xl font-bold text-start mb-4 mx-2 text-blue-900'>Exams by Security</h3>
          <AreaChart examStats={examStats} />
        </Card>
        <Card>
          <BarChart examStats={examStats} />
        </Card>
      </div>
      <Card>
        <LineChartt examStats={examStats} />
      </Card>
    </div>
  );
};

export default DashboardPage;
