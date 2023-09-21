import { motion } from "framer-motion";
import { myStore } from "../../../store";
import { iconDescriptions, iconObject } from "./iconObjects";

export default function Weather() {
  const { currentCounty, weatherData2, currentCity } = myStore();

  return (
    <>
      {weatherData2 && (
        <div
          className={`flex h-full w-full basis-2/3 sm:gap-5 2xl:gap-10 flex-col rounded-2xl font-black text-white sm:flex-row`}
        >
          <div
            className={`grid h-28 select-none grid-cols-2 items-center justify-items-center rounded-2xl bg-theme4 pl-5 text-light sm:h-full sm:basis-3/5 sm:p-0`}
          >
            <ul
              className={` text-end text-2xl sm:text-2xl md:text-4xl lg:text-lg xl:text-3xl 2xl:text-5xl`}
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
                className={`justify-self-start sm:justify-self-auto text-5xl sm:text-5xl md:text-7xl lg:text-4xl xl:text-6xl 2xl:text-8xl`}
              >
                {weatherData2?.main.temp.toFixed(1)}°
              </div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-10 flex basis-2/5 gap-5 items-center justify-between rounded-r-2xl text-xl sm:mt-0 lg:flex-row `}
          >
            <div className={`my-5 w-24 lg:w-full sm:my-0`}>
              {iconObject[weatherData2.weather[0].icon]}
            </div>
            <ul className={`text-light md:text-xl lg:text-xs xl:text-xs 2xl:text-xl whitespace-nowrap`}>
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
