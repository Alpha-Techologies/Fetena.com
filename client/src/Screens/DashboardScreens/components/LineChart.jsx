import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Function to format the date to a readable format
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    const { examStats } = this.props;

    // Transform the examStats data to match the format required by the LineChart
    const data = examStats.examsByStartDate?.map(item => ({
      name: formatDate(item._id),
      count: item.count
    }));

    return (
      <>
      <h3 className='text-xl font-bold text-start mb-4 mx-2 text-blue-900'>Exams Generated History</h3>

      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#1E3A8A" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </>

    );
  }
}
