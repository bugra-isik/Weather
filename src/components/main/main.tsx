import dayjs from "dayjs";
import { myStore, themeStore } from "../../store";
import { useEffect, useState } from "react";
import Chart from "./charts/chart";
import Chart3 from "./charts/chart3";
import Chart2 from "./charts/chart2";
import Chart4 from "./charts/chart4";
import Chart5 from "./charts/chart5";

export default function Main() {
  const { weatherData, weatherData2, currentCounty } = myStore();
  const { theme, setTheme } = themeStore();

  useEffect(() => {
    setTheme(
      weatherData2?.weather[0].icon.slice(-1) === "n" ? "dark" : "light",
    );
  }, [setTheme, weatherData2?.weather]);

  console.log(theme);
  return (
    <div className={`flex basis-2/3 flex-col bg-green-500`}>
      <Chart />
      <div className={`flex basis-1/2 flex-col bg-red-700 `}>
        <Chart2 />
        <Chart3 />
        <Chart4 />
        <Chart5 />
      </div>
    </div>
  );
}
