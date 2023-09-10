import Nav from "./components/header/nav/nav";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { myStore } from "../src/store";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";

export default function App() {
  const { setApi, sendZipCode, zipApi, setZipApi, setWeatherData } = myStore();

  const fetchDB = useCallback(async () => {
    const response = await axios.get("/data.json");
    try {
      setApi(response.data);
    } catch (error) {
      console.log(`fetchDB----->error`);
    }
  }, [setApi]);

  const apiKey = "38688aebf7e994592fd083f105e84d5f//";

  const [lat, setLat] = useState<number>();
  const [lon, setLon] = useState<number>();
  const [url, setUrl] = useState<string>();
  //`https://api.openweathermap.org/data/2.5/weather?lat=41.0812&lon=29.0177&units=metric&appid=${apiKey}`

  const zipURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${sendZipCode},TR&appid=${apiKey}`;

  useEffect(() => {
    if (zipApi) {
      const { lat, lon } = zipApi;
      setLat(lat);
      setLon(lon);
    }
    setUrl(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    );
  }, [zipApi, lat, lon]);

  const fetchGeo = useCallback(async () => {
    if (sendZipCode) {
      await axios
        .get(zipURL)
        .then((e) => setZipApi(e.data))
        .catch(() => console.log(zipURL));
    }
  }, [setZipApi, zipURL, sendZipCode]);

  const fetchURL = useCallback(async () => {
    url &&
      lat &&
      (await axios
        .get(url)
        .then((e) => setWeatherData(e.data))
        .catch(() => console.log(url)));
  }, [setWeatherData, url, lat]);

  useEffect(() => {
    fetchDB();
  }, [fetchDB]);

  useEffect(() => {
    fetchGeo();
  }, [fetchGeo]);

  useEffect(() => {
    fetchURL();
  }, [fetchURL]);

  return (
    <main className={`container m-auto flex h-full w-full flex-col`}>
      <Nav />
      <Main />
      <Footer />
    </main>
  );
}
