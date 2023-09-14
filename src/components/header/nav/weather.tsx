import { motion } from "framer-motion";
import { myStore } from "../../../store";
import { inputTexts } from "./constants";
import { WeatherIcons } from "./svg/SVG";

export default function Weather() {
  const { currentCounty, weatherData2, currentCity } = myStore();

  const iconObject: Record<string, JSX.Element> = {
    "01d": <WeatherIcons.ClearSky />,
    "01n": <WeatherIcons.ClearSkyN />,
    "02d": <WeatherIcons.FewClouds />,
    "02n": <WeatherIcons.FewCloudsN />,
    "03d": <div />,
    "03n": <div />,
    "04d": <WeatherIcons.OvercastClouds />,
    "04n": <WeatherIcons.OvercastClouds />,
    "09d": <WeatherIcons.Drizzle />,
    "09n": <WeatherIcons.Drizzle />,
    "10d": <WeatherIcons.Rain />,
    "10n": <WeatherIcons.RainN />,
    "11d": <WeatherIcons.Thunderstorm />,
    "11n": <WeatherIcons.Thunderstorm />,
    "13d": <WeatherIcons.Snow />,
    "13n": <WeatherIcons.Snow />,
    "50d": <WeatherIcons.Mist />,
    "50n": <WeatherIcons.Mist />,
  };

  return (
    <>
      {weatherData2 ? (
        <div
          className={`flex h-full basis-2/3 rounded-2xl  font-openSans  font-black text-white`}
        >
          <div
            className={`grid basis-2/3 select-none grid-cols-2 items-center justify-items-center rounded-l-2xl bg-blue-500`}
          >
            <ul className={`text-end text-5xl`}>
              {currentCounty && weatherData2 && (
                <>
                  <li className={`capitalize`}>
                    {currentCounty?.toLocaleLowerCase()}
                  </li>
                  <li className={`capitalize`}>
                    {currentCity?.toLocaleLowerCase()}
                  </li>
                </>
              )}
            </ul>

            {weatherData2 && (
              <div className={`text-8xl`}>
                {weatherData2?.main.temp.toFixed(1)}°
              </div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex basis-1/3 items-center justify-center rounded-r-2xl bg-black text-xl`}
          >
            {iconObject[weatherData2?.weather[0]?.icon]}
          </motion.div>
        </div>
      ) : (
        <div
          className={`flex h-full basis-2/3 rounded-2xl  font-openSans  font-black text-white`}
        >
          <div
            className={`flex basis-2/3 select-none items-center justify-center rounded-l-2xl bg-blue-500 text-5xl`}
          >
            <span className={`animate-pulse`}>{inputTexts[0]}</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex basis-1/3 items-center justify-center rounded-r-2xl bg-black text-xl`}
          >
            {iconObject[`01d`]}
          </motion.div>
        </div>
      )}
    </>
  );
}
