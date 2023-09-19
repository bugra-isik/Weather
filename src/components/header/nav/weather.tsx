import { motion } from "framer-motion";
import { myStore } from "../../../store";
import { iconDescriptions, iconObject } from "./iconObjects";

export default function Weather() {
  const { currentCounty, weatherData2, currentCity } = myStore();

  return (
    <>
      {weatherData2 && (
        <div
          className={`flex h-full basis-2/3 rounded-2xl  font-openSans  font-black text-white`}
        >
          <div
            className={`grid basis-3/5 select-none  grid-cols-2 items-center justify-items-center rounded-2xl bg-theme4 text-light`}
          >
            <ul className={`text-end text-base xl:text-2xl 2xl:text-5xl`}>
              <li className={`capitalize`}>
                {currentCounty?.toLocaleLowerCase() ?? weatherData2?.name}
              </li>
              <li className={`capitalize`}>
                {(currentCity !== "" && currentCity?.toLocaleLowerCase()) ||
                  "Ankara"}
              </li>
            </ul>

            {weatherData2 && (
              <div className={`text-2xl xl:text-5xl 2xl:text-8xl`}>
                {weatherData2?.main.temp.toFixed(1)}°
              </div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex basis-2/5 items-center justify-center rounded-r-2xl text-xl`}
          >
            <div className={`w-1/2`}>
              <>{iconObject[weatherData2.weather[0].icon]}</>
            </div>

            <ul className={`text-sm text-light 2xl:text-lg`}>
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
