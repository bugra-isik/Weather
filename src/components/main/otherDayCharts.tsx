import { unix } from "dayjs";
import { myStore } from "../../store";
import { iconObject } from "../header/nav/iconObjects";

export default function OtherDayCharts() {
  const { weatherData } = myStore();

  const element = [];

  if (weatherData?.list) {
    for (let i = 8; i < weatherData?.list.length; i += 8) {
      element.push(weatherData?.list.slice(i, i + 8));
    }
  }

  const test = element.map((item, index) => {
    const tempMax = Math.max(...item.map((e) => e.main.temp_max)).toFixed(1);
    const tempMin = Math.min(...item.map((e) => e.main.temp_min)).toFixed(1);
    const day = unix(item[5].dt).locale("tr").format("dddd");
    const icon = item[5].weather[0].icon;

    return (
      <ul
        key={index}
        className={`flex items-center justify-evenly bg-theme5 text-light text-2xl 2xl:text-5xl `}
      >
        <li>{day}</li>
        <div className={`flex`}>
          <li>{tempMax}</li>
          <li> /</li>
          <li>{tempMin}°C</li>
        </div>
        <li className={`w-1/5`}>{iconObject[icon]}</li>
      </ul>
    );
  });

  return (
    <div className={`grid basis-1/2 grid-cols-2 gap-5 bg-theme1`}>{test}</div>
  );
}
