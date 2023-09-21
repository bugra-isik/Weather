import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { myStore, themeStore } from "../../store";
import { unix } from "dayjs";
import { useWindowSize } from "@uidotdev/usehooks";

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

  let chartFontSize;
  const windowSize = useWindowSize();
  const sm = 650;

  if ((windowSize.width ?? sm + 1) < sm) {
    chartFontSize = "10px";
  } else {
    chartFontSize = "";
  }

  const localThemeTW = theme == "light" ? "#ffe168" : "#3b3c40";
  return (
    <div
      className={`flex h-40 w-full items-center justify-center sm:basis-1/3 lg:basis-1/2`}
    >
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 25,
            left: 25,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="name"
            stroke={theme == "light" ? "#ffe168" : "#13588B"}
          />
          <Area
            type="natural"
            dataKey="Sıcaklık"
            label={{
              fill: `${theme == "light" ? "#CCB454" : "#355773"}`,
              padding: "40px",
              fontSize: chartFontSize,
            }}
            stroke={localThemeTW}
            fill={localThemeTW}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
