import { WeatherIcons } from "./svg/SVG";

const iconObject: Record<string, JSX.Element> = {
  "01d": <WeatherIcons.ClearSky />,
  "01n": <WeatherIcons.ClearSkyN />,
  "02d": <WeatherIcons.FewClouds />,
  "02n": <WeatherIcons.FewCloudsN />,
  "03d": <WeatherIcons.ScatteredClouds />,
  "03n": <WeatherIcons.ScatteredClouds />,
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
  "clear sky": "Açık gökyüzü",
  "few clouds": "Az bulutlu",
  "scattered clouds": "Bulutlu",
  "overcast clouds": "Parçalı bulutlu",
  "light rain": "Hafif yağmurlu",
  rain: "Yağmurlu",
  "shower rain": "Sağanak yağmurlu",
  thunderstorm: "Gök gürültülü fırtına",
  mist: "Sis",
  snow: "Kar",
};

export { iconDescriptions, iconObject };
