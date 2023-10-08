import { unix } from "dayjs";
import { myStore } from "../../../store";
import { iconObject } from "../../header/nav/iconObjects";

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
    const icon = item[0].weather[0].icon;

    return (
      <ul
        key={index}
        className={`bg-gradient-to-r from-theme5 to-theme4 grid items-center h-14 grid-cols-2  text-sm text-light sm:h-auto sm:w-auto sm:text-2xl md:h-32 md:text-4xl lg:h-auto lg:justify-evenly lg:p-0 lg:px-5 lg:text-2xl 2xl:text-4xl`}
      >
        <li className={`pl-5`}>{day}</li>
        <li
          className={`grid grid-cols-2 items-center gap-1 md:gap-20 whitespace-nowrap`}
        >
          <div>{`${tempMax} / ${tempMin}°C`}</div>
          <div className={`w-7 sm:w-10 md:w-14 lg:w-12 xl:w-16 2xl:w-16`}>
            {iconObject[icon]}
          </div>
        </li>
      </ul>
    );
  });

  return (
    <div
      className={`grid basis-2/3 gap-5 bg-theme1 lg:basis-1/2 lg:grid-cols-2`}
    >
      {test}
    </div>
  );
}
