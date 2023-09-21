import { myStore, themeStore } from "../../store";
import { useEffect } from "react";
import Chart from "./chart";
import OtherDayCharts from "./otherDayCharts";

export default function Main() {
  const { weatherData2 } = myStore();
  const { setTheme } = themeStore();

  useEffect(() => {
    setTheme(
      weatherData2?.weather[0].icon.slice(-1) === "n" ? "dark" : "light",
    );
  }, [setTheme, weatherData2?.weather]);

  return (
    <div className={`flex basis-2/3 flex-col sm:rounded bg-theme1 p-5`}>
      <Chart />

      <OtherDayCharts />
    </div>
  );
}
