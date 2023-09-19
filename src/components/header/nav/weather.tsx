import { motion } from "framer-motion";
import { myStore, themeStore } from "../../../store";
import { WeatherIcons } from "./svg/SVG";

// eslint-disable-next-line react-refresh/only-export-components
export const iconObject: Record<string, JSX.Element> = {
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

const iconDescriptions: Record<string, string> = {
  "clear sky": "Açık Gökyüzü",
  "few clouds": "Az Bulutlu",
  "overcast clouds": "Parçalı Bulut",
  drizzle: "Hafif Yağmur",
  rain: "Yağmur",
  "shower rain": "Sağanak Yağmur",
  thunderstorm: "Gök Gürültülü Fırtına",
  mist: "Sis",
  snow: "Kar",
};

export default function Weather() {
  const { currentCounty, weatherData2, currentCity } = myStore();

  const { theme } = themeStore();

  const localTheme = theme === "light" ? "text-dark" : "text-light";

  return (
    <>
      {weatherData2 && (
        <div
          className={`flex h-full basis-2/3 rounded-2xl  font-openSans  font-black text-white`}
        >
          <div
            className={`grid basis-3/5 select-none  grid-cols-2 items-center justify-items-center rounded-2xl bg-theme4 text-light`}
          >
            <ul className={`text-end text-5xl`}>
              <li className={`capitalize`}>
                {currentCounty?.toLocaleLowerCase() ?? weatherData2?.name}
              </li>
              <li className={`capitalize`}>
                {(currentCity !== "" && currentCity?.toLocaleLowerCase()) ||
                  "Ankara"}
              </li>
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
            className={`flex basis-2/5 items-center justify-center rounded-r-2xl text-xl`}
          >
            <div className={`w-1/2`}>
              <>{iconObject[weatherData2.weather[0].icon]}</>
            </div>

            <ul className={`text-lg`}>
              <li>{iconDescriptions[weatherData2.weather[0].description]}</li>
              <li className={`${localTheme}`}>
                Rüzgar: {(weatherData2.wind.speed * (1000 / 360)).toFixed(1)}{" "}
                km/s
              </li>
              <li className={`${localTheme}`}>
                Nem: {weatherData2.main.humidity}%
              </li>
            </ul>
          </motion.div>
        </div>
      )}
    </>
  );
}
