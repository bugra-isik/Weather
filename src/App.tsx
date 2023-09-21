import Nav from "./components/header/nav/nav";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { myStore } from "../src/store";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import "dayjs/locale/tr";
import { WeatherIcons } from "./components/header/nav/svg/SVG";

export default function App() {
  const {
    setApi,
    sendZipCode,
    zipApi,
    setZipApi,
    setWeatherData,
    setWeatherData2,
    weatherData2,
  } = myStore();

  const [spinner, setSpinner] = useState(false);

  const fetchDB = useCallback(async () => {
    const response = await axios.get("/data.json");
    try {
      setApi(response.data);
    } catch (error) {
      console.log(`fetchDB----->error`);
    }
  }, [setApi]);

  const apiKey = "38688aebf7e994592fd083f105e84d5f";
  const initialZipCode = "06680";

  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();
  const [url, setUrl] = useState<string>();
  const [url2, setUrl2] = useState<string>();
  const zipURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${
    sendZipCode ?? initialZipCode
  },TR&appid=${apiKey}`;
  useEffect(() => {
    if (zipApi) {
      const { lat, lon } = zipApi;
      setLat(lat);
      setLon(lon);
    }
    setUrl(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
    setUrl2(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
  }, [zipApi, lat, lon]);

  const fetchGeo = useCallback(async () => {
    await axios
      .get(zipURL)
      .then((e) => setZipApi(e.data))
      .catch(() => console.log(zipURL));
  }, [setZipApi, zipURL]);

  const fetchURL = useCallback(async () => {
    url &&
      lat &&
      (await axios
        .get(url)
        .then((e) => setWeatherData(e.data))
        .catch(() => console.log(url)));
  }, [setWeatherData, url, lat]);

  const fetchURL2 = useCallback(async () => {
    url2 &&
      lat &&
      (await axios
        .get(url2)
        .then((e) => setWeatherData2(e.data))
        .catch(() => console.log(url2)));
  }, [lat, setWeatherData2, url2]);

  useEffect(() => {
    fetchDB();
  }, [fetchDB]);

  useEffect(() => {
    fetchGeo();
  }, [fetchGeo]);

  useEffect(() => {
    fetchURL();
  }, [fetchURL]);

  useEffect(() => {
    fetchURL2();
  }, [fetchURL2]);

  if (weatherData2) {
    setTimeout(() => {
      setSpinner(true);
    }, 2000);
  }

  return (
    <main
      className={`flex h-screen w-screen items-center justify-center font-openSans sm:px-10`}
    >
      <div
        className={`fixed -z-50 h-full w-full bg-gradient-to-b from-grad1 to-grad2`}
      />
      {spinner ? (
        <div className={`container flex flex-col justify-between h-full w-full`}>
          <Nav />
          <Main />
          <Footer />
        </div>
      ) : (
        <div className={`h-40 w-40 lg:h-20 lg:w-20 xl:h-40 xl:w-40`}>
          <WeatherIcons.Spinner />
        </div>
      )}
    </main>
  );
}
