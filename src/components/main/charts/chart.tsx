import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { myStore } from "../../../store";
import { unix } from "dayjs";

export default function Chart() {
  const { weatherData } = myStore();

  const element = [];

  if (weatherData?.list) {
    for (let i = 0; i < weatherData?.list.length; i += 8) {
      element.push(weatherData?.list.slice(i, i + 8));
    }
  }

  const data = element[0]?.map((e) => ({
    name: unix(e.dt).format("HH:mm"),
    Sıcaklık: e.main.temp_max.toFixed(1),
  }));

  return (
    <div className={`h-40 basis-1/2`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 50,
            left: 0,
            bottom: 10,
          }}
        >
          {/* <CartesianGrid strokeDasharray="1 1" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="natural" dataKey="Sıcaklık" stroke="#000" fill="#000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
