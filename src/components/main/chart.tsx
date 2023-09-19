import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { myStore, themeStore } from "../../store";
import { unix } from "dayjs";

export default function Chart() {
  const { weatherData } = myStore();
  const { theme } = themeStore();

  
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
  
  const localThemeTW = theme == "light" ? "#ffe168" : "#3b3c40";
  return (
    <div className={`flex h-40 basis-1/2 items-center justify-center`}>
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 25,
            left: 25,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" stroke="#13588B" />
          <Area
            type="natural"
            dataKey="Sıcaklık"
            label={{
              fill: `#355773`,
              padding: "40px",
              
              
            }}
            stroke={localThemeTW}
            fill={localThemeTW}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
