// import Stats from "../Screens/DashboardScreens/components/Stats"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import AreaChart from '../Screens/DashboardScreens/components/AreaChart';
import LineChartt from '../Screens/DashboardScreens/components/LineChart';
import PieChart from '../Screens/DashboardScreens/components/PieChart';
import BarChart from '../Screens/DashboardScreens/components/BarChart';
import { Card } from 'antd';
import Stats from '../Screens/DashboardScreens/components/Stats';
const DashboardPage = () => {
  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
  return (
    <div className='flex flex-col gap-2'>
    
    <Stats />
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mx-2 lg:gap-2 '>

  <Card >

<AreaChart  />
  </Card>
  <Card>

<BarChart />
  </Card>
 
  
</div>
<Card>
<LineChartt />
    </Card>

    </div>
  )
}
export default DashboardPage