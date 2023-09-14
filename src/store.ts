import { create } from "zustand";

export interface City {
  counties: [
    {
      districts: [
        {
          name: string;
          neighborhoods: [{ code: string; name: string }];
        },
      ];
      name: string;
    },
  ];
  name: string;
}

interface ZipApi {
  lat: number;
  lon: number;
}

export interface WeatherData {
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_max: number;
        humidity: number;
      };
      weather: [
        { id: number; main: string; description: string; icon: string },
      ];
      wind: { speed: number };
      sys: { pod: string };
    },
  ];
}

interface WeatherData2 {
  weather: [{ description: string; icon: string }];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

interface Store {
  api: City[];
  setApi: (x: City[]) => void;
  current: string;
  setCurrent: (x: string) => void;
  sendZipCode: string | undefined;
  setSendZipCode: (x: string) => void;
  zipApi: ZipApi | undefined;
  setZipApi: (x: ZipApi) => void;
  weatherData: WeatherData | undefined;
  setWeatherData: (x: WeatherData) => void;
  weatherData2: WeatherData2 | undefined;
  setWeatherData2: (x: WeatherData2) => void;
  currentCity: undefined | string;
  setCurrentCity: (x: string | undefined) => void;
  currentCounty: undefined | string;
  setCurrentCounty: (x: string | undefined) => void;
}

interface Theme {
  theme: string;
  setTheme: (x: string) => void;
}

const myStore = create<Store>((set) => ({
  api: [],
  setApi: (x) => set(() => ({ api: x })),
  current: "10",
  setCurrent: (x) => set(() => ({ current: x })),
  sendZipCode: undefined,
  setSendZipCode: (x) => set(() => ({ sendZipCode: x })),
  zipApi: undefined,
  setZipApi: (x) => set(() => ({ zipApi: x })),
  weatherData: undefined,
  setWeatherData: (x) => set(() => ({ weatherData: x })),
  weatherData2: undefined,
  setWeatherData2: (x) => set(() => ({ weatherData2: x })),
  currentCity: "",
  setCurrentCity: (x) => set(() => ({ currentCity: x })),
  currentCounty: undefined,
  setCurrentCounty: (x) => set(() => ({ currentCounty: x })),
}));

const themeStore = create<Theme>((set) => ({
  theme: "light",
  setTheme: (x) => set(() => ({ theme: x })),
}));

export { myStore, themeStore };
