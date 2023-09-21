import { motion } from "framer-motion";
import { myStore } from "../../../store";
import { iconDescriptions, iconObject } from "./iconObjects";

export default function Weather() {
  const { currentCounty, weatherData2, currentCity } = myStore();

  return (
    <>
      {weatherData2 && (
        <div
          className={`flex h-full w-full basis-2/3 flex-col rounded-2xl font-black text-white sm:gap-5 sm:grid sm:grid-cols-2 md:gap-10 2xl:gap-10`}
        >
          <div
            className={`grid h-28 select-none grid-cols-2 items-center gap-5 rounded-2xl bg-theme4 text-light sm:h-full sm:basis-1/2  sm:items-center sm:justify-items-center sm:p-0 sm:pl-5`}
          >
            <ul
              className={`w-36 lg:w-full justify-self-end text-end text-2xl sm:text-2xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-4xl`}
            >
              <li className={`capitalize`}>
                {currentCounty?.toLocaleLowerCase() ?? weatherData2?.name}
              </li>
              <li className={`capitalize`}>
                {(currentCity !== "" && currentCity?.toLocaleLowerCase()) ||
                  "Ankara"}
              </li>
            </ul>

            {weatherData2 && (
              <div
                className={` text-6xl sm:justify-self-auto sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl`}
              >
                {weatherData2?.main.temp.toFixed(1)}°
              </div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-10 grid basis-2/5 grid-cols-2 items-center gap-5 rounded-r-2xl text-xl sm:mt-0 sm:flex sm:items-center sm:justify-between lg:flex-row `}
          >
            <div className={`my-5 w-24 justify-self-end sm:my-0 lg:w-32 2xl:w-40`}>
              {iconObject[weatherData2.weather[0].icon]}
            </div>
            <ul
              className={`whitespace-nowrap text-lg text-light md:text-xl lg:text-xs xl:text-base 2xl:text-2xl`}
            >
              <li>{iconDescriptions[weatherData2.weather[0].description]}</li>
              <li>
                Rüzgar: {(weatherData2.wind.speed * (1000 / 360)).toFixed(1)}{" "}
                km/s
              </li>
              <li>Nem: {weatherData2.main.humidity}%</li>
            </ul>
          </motion.div>
        </div>
      )}
    </>
  );
}
