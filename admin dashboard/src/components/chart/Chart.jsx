import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Chart = ({ data, title, dataKey, grid }) => {
  return (
    <div className="chartContainer">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#5550bd" />
          {/* <YAxis /> */}
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          {grid && <CartesianGrid strokeDasharray="5 5" stroke="#e0dfdf" />}
          <Tooltip />
          {/* <Legend /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
