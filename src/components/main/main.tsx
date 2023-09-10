import dayjs from "dayjs";
import { myStore, themeStore } from "../../store";
import { useEffect, useState } from "react";
import Chart from "./charts/chart";
import Chart3 from "./charts/chart3";
import Chart2 from "./charts/chart2";
import Chart4 from "./charts/chart4";
import Chart5 from "./charts/chart5";

export default function Main() {
  const { weatherData, currentCounty } = myStore();
  const { theme, setTheme } = themeStore();
  // const [data, setData] = useState<JSX.Element[] | undefined>(undefined);

  // useEffect(() => {
  //   if (data.sunset && data.sunrise) {
  //     if (data.sunset > Date.now() && Date.now() > data.sunrise) {
  //       theme === 'dark' && setTheme('light');
  //     } else {
  //       theme === 'light' && setTheme('dark');
  //     }
  //   }
  // }, [data.sunrise, data.sunset, setTheme, theme]);

  // const time = dayjs(Date.now());

  // //! //////////////////////////////////////////////////////////////////

  // const data = weatherData?.list.map((item) => (
  //   <div key={item.dt}>
  //     {item.sys.pod}

  //     {currentCounty}
  //     {item.weather[0].description}
  //     <img
  //       src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
  //       alt='Weather forecast'
  //     />
  //   </div>
  // ));

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
