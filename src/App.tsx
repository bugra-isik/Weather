import Nav from "./components/header/nav/nav";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { myStore } from "../src/store";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import "dayjs/locale/tr";
import { useGeolocation } from "@uidotdev/usehooks";
import Spinner from "./components/ui/spinner";

export default function App() {
  const {
    setApi,
    sendZipCode,
    zipApi,
    setZipApi,
    setWeatherData,
    setWeatherData2,
    setGeoCityName,
  } = myStore();

  const [spinner, setSpinner] = useState<boolean>(false);

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

  const [lat, setLat] = useState<number | null>();
  const [lon, setLon] = useState<number | null>();
  const [url, setUrl] = useState<string>();
  const [url2, setUrl2] = useState<string>();
  let zipURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${sendZipCode},TR&appid=${apiKey}`;

  /* -------------------------------------------------------------------------- */
  /*                                 Geolocation                                */
  /* -------------------------------------------------------------------------- */

  const reverseURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`;
  const { latitude, longitude, loading, error } = useGeolocation();

  if (error?.code === 1) {
    zipURL = `https://api.openweathermap.org/geo/1.0/zip?zip=${initialZipCode},TR&appid=${apiKey}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loading) {
          setLat(latitude);
          setLon(longitude);

          const response = await axios.get(reverseURL);

          console.log("There is no problem");
          setGeoCityName(response.data[0].name);
        }
      } catch (error) {
        console.log("GeoLocation request error");
      } finally {
        !loading &&
          setTimeout(() => {
            setSpinner(true);
          }, 2000);
      }
    };

    fetchData();
  }, [loading, latitude, longitude, reverseURL, setGeoCityName]);

  /* -------------------------------------------------------------------------- */
  /*                            WeatherAPI URL Setter                           */
  /* -------------------------------------------------------------------------- */
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

  return (
    <main
      className={`flex h-[100dvh] w-screen items-center justify-center font-openSans sm:px-10`}
    >
      <div
        className={`fixed -z-50 h-full w-full bg-gradient-to-b from-grad1 to-grad2`}
      />
      {spinner ? (
        <div
          className={`container flex h-full w-full flex-col justify-between`}
        >
          <Nav />
          <Main />
          <Footer />
        </div>
      ) : (
        <Spinner setSpinner={setSpinner} spinner={spinner} />
      )}
    </main>
  );
}
