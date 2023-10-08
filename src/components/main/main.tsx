import { myStore, themeStore } from "../../store";
import { useEffect } from "react";
import Chart from "./charts/chart";
import OtherDayCharts from "./charts/otherDayCharts";

export default function Main() {
  const { weatherData2 } = myStore();
  const { setTheme } = themeStore();

  useEffect(() => {
    setTheme(
      weatherData2?.weather[0].icon.slice(-1) === "n" ? "dark" : "light",
    );
  }, [setTheme, weatherData2?.weather]);

  return (
    <div className={`flex basis-2/3 flex-col bg-theme1 p-5 sm:rounded`}>
      <Chart />
      <OtherDayCharts />
    </div>
  );
}
