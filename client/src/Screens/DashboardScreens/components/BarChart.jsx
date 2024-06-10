import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/bar-chart-has-no-padding-2hlnt8';

  render() {
    const { examStats } = this.props;

    // Transform the examStats data to match the format required by the BarChart
    const data = examStats.examsByType?.map(item => ({
      name: item._id,
      count: item.count
    }));

    return (
      <div style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="count" fill="#1E3A8A" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
