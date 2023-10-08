import { create } from "zustand";

export type City = {
  name: string;
  counties: [
    {
      name: string;
      code: string;
    },
  ];
};

type ZipApi = {
  lat: number;
  lon: number;
};

export type WeatherData = {
  list: [
    {
      dt: number;
      main: {
        temp: number;
        feels_like: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
      };
      weather: [
        { id: number; main: string; description: string; icon: string },
      ];
      wind: { speed: number };
      sys: { pod: string };
    },
  ];
};

type WeatherData2 = {
  weather: [{ description: string; icon: string }];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
};

type Store = {
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
  geoCityName: undefined | string;
  setGeoCityName: (x: string | undefined) => void;
};

type Theme = {
  theme: string;
  setTheme: (x: string) => void;
};

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
  geoCityName: undefined,
  setGeoCityName: (x) => set(() => ({ geoCityName: x })),
}));

const themeStore = create<Theme>((set) => ({
  theme: "light",
  setTheme: (x) => set(() => ({ theme: x })),
}));

export { myStore, themeStore };
