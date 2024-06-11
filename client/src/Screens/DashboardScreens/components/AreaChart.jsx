import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-area-chart-4y9cnl';

  render() {
    const { examStats } = this.props;

    // Transform the examStats data to match the format required by the AreaChart
    const data = examStats.examsBySecurity?.map(item => ({
      name: item._id,
      count: item.count
    }));

    return (
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#1E3A8A" fill="#1E3A8A" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
