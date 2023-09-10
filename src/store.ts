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

interface WeatherData {
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
  currentCounty: undefined,
  setCurrentCounty: (x) => set(() => ({ currentCounty: x })),
}));

const themeStore = create<Theme>((set) => ({
  theme: "light",
  setTheme: (x) => set(() => ({ theme: x })),
}));

export { myStore, themeStore };
