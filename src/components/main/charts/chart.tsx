import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";
import { myStore } from "../../../store";
import { unix } from "dayjs";
import { useWindowSize } from "@uidotdev/usehooks";

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

  let chartFontSize;
  const { width } = useWindowSize();
  const sm = 650;

  if ((width ?? sm + 1) < sm) {
    chartFontSize = "10px";
  } else {
    chartFontSize = "";
  }

  const fontWeight = () => (width && width < 640 && 300) || 500;
  const fontSize = () => (width && width < 640 && 12) || 16;
  const margin = () => (width && width < 640 && 25) || 50;

  const localThemeTW = "#ffe168";
  return (
    <div
      className={`flex h-40 w-full items-center justify-center sm:basis-1/3 lg:basis-1/2`}
    >
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          data={data}
          margin={{
            top: margin(),
            right: 25,
            left: 25,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" stroke={"#13588B"} fontWeight={fontWeight()} fontSize={fontSize()}/>
          <Area
            type="natural"
            dataKey="Sıcaklık"
            label={{
              fill: "#ffe168",
              fontSize: chartFontSize,
              dy: -15,
            }}
            stroke={localThemeTW}
            fill={localThemeTW}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
