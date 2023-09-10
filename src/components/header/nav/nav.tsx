import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { City, myStore } from "../../../store";
import { useClickAway } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import WeatherIcons from "./svg/import";

interface Districts {
  districts: [
    {
      name: string;
      neighborhoods: [{ code: string; name: string }];
    },
  ];
  name: string;
}

export default function Nav() {
  const { api, setSendZipCode, currentCounty, setCurrentCounty } = myStore();
  const [cityOpen, setCityOpen] = useState(false);
  const [countyOpen, setCountyOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<string | undefined>("");
  const [cityInputValue, setCityInputValue] = useState<string | undefined>();
  const [countyInputValue, setCountyInputValue] = useState<
    string | undefined
  >();
  const [filteredCities, setFilteredCities] = useState<City[]>();
  const [filteredCounties, setFilteredCounties] = useState<City[]>();
  const [filteredCounties_2, setFilteredCounties_2] = useState<Districts[]>();

  //////////////////////////////////////////////////////////////////////////////!
  const inputRef = useRef<HTMLInputElement | null>();

  const ref = useClickAway<HTMLUListElement>(() => {
    setCityOpen(false);
    setCountyOpen(false);
    setCityInputValue(undefined);
    setCountyInputValue(undefined);
  });

  const handleOpenCity = () => setCityOpen(true);
  const handleOpenCounty = () => setCountyOpen(true);

  //!-///////////////////////--CITY--/////////////////////////////////////////////////////

  useEffect(() => {
    const data = api?.filter((item) => {
      if (cityInputValue == undefined) {
        return true;
      } else {
        return item.name.includes(cityInputValue);
      }
    });
    setFilteredCities(data);
  }, [api, cityInputValue]);

  const cities = filteredCities?.map((item: { name: string }) => (
    <motion.li
      key={item.name}
      className={`cursor-pointer select-none border-b py-3 hover:bg-blue-500`}
      onClick={() => {
        setCurrentCity(item.name);
        setCityOpen(false);
      }}
    >
      {item.name}
    </motion.li>
  ));

  //!-///////////////////////--COUNTY--/////////////////////////////////////////////////////

  useEffect(() => {
    const data = api?.filter((item) => item.name === currentCity);

    setFilteredCounties(data);
  }, [api, currentCity]);

  useEffect(() => {
    const data =
      filteredCounties &&
      filteredCounties[0]?.counties?.filter((item: { name: string }) => {
        return countyInputValue == undefined
          ? true
          : item.name.includes(countyInputValue);
      });
    setFilteredCounties_2(data);
  }, [countyInputValue, filteredCounties]);

  const counties = filteredCounties_2?.map((item) => (
    <li
      key={item.name}
      className={`cursor-pointer select-none border-b py-3 hover:bg-blue-500`}
      onClick={() => {
        item.name && setCurrentCounty(item.name);
        setCountyOpen(false);
        item.districts[0].neighborhoods[0].code !== undefined &&
          setSendZipCode(item.districts[0].neighborhoods[0].code);
      }}
    >
      {item.name}
    </li>
  ));

  //////////////////////////////////////////////////////////////////////////////!

  const inputClass = "pointer-events-none";

  return (
    <nav
      className={`relative mb-5 flex basis-1/4 items-center justify-center gap-10 bg-red-500 p-5`}
    >
      <div
        className={`flex h-full basis-1/3 items-center justify-center gap-5 rounded-2xl bg-black px-5 `}
      >
        <div className={`relative flex flex-col gap-y-10 `}>
          <input
            className={`h-10 w-60`}
            type="text"
            placeholder="LÜDVEN ŞEHİR SEÇİNİZ"
            value={currentCity || undefined}
            onChange={(e) => {
              setCityInputValue(e.currentTarget.value.toLocaleUpperCase());
            }}
            onClick={(e) => {
              handleOpenCity();
              e.currentTarget.value = "";
              setCurrentCity("");
              setCurrentCounty("");
              setCityInputValue("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                setCurrentCity(filteredCities && filteredCities[0].name);
                setCityOpen(false);
                inputRef.current?.focus();
              } else if (e.key === "Backspace") {
                setCurrentCity("");
              }
            }}
          />

          {cityOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={ref}
              className={`absolute top-14 z-10 flex h-40 w-60 flex-col overflow-scroll overflow-x-hidden bg-black text-white`}
            >
              {cities}
            </motion.ul>
          )}
        </div>
        <div
          className={`${
            currentCity ? "" : "cursor-no-drop"
          } relative flex flex-col  gap-y-10`}
        >
          <input
            className={`h-10 w-60 ${currentCity ? "" : inputClass}`}
            ref={inputRef}
            type="text"
            placeholder="LÜDVEN İLÇE SEÇİNİZ"
            value={undefined || currentCounty}
            onChange={(e) => {
              setCountyInputValue(e.currentTarget.value.toLocaleUpperCase());
            }}
            onClick={(e) => {
              currentCity && handleOpenCounty();
              e.currentTarget.value = "";
              setCurrentCounty(undefined);
              setCityInputValue(" ");
            }}
            onFocus={() => {
              setCityOpen(false);
              setCountyOpen(true);
              setCurrentCounty(undefined);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                setCurrentCounty(
                  filteredCounties_2 && filteredCounties_2[0].name,
                );
                setCountyOpen(false);
                setSendZipCode(
                  (filteredCounties_2 &&
                    filteredCounties_2[0].districts[0].neighborhoods[0].code) ??
                    "",
                );
              } else if (e.key === "Backspace") {
                setCurrentCounty(undefined);
              }
            }}
          />
          {countyOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={ref}
              className={`absolute top-14 z-10 flex h-40 w-60 flex-col overflow-scroll overflow-x-hidden bg-black text-white`}
            >
              {counties}
            </motion.ul>
          )}
        </div>
      </div>

      <div
        className={`flex h-full basis-2/3 rounded-2xl  font-openSans  font-black text-white`}
      >
        <div
          className={`grid basis-2/3 select-none grid-cols-2 items-center justify-items-center rounded-l-2xl bg-blue-500`}
        >
          <ul className={`text-5xl`}>
            <li>Başakşehir</li>
            <li>İstanbul</li>
          </ul>
          <div className={`text-8xl`}>25°</div>
        </div>
        <div
          className={`flex basis-1/3 items-center justify-center rounded-r-2xl bg-black text-xl`}
        >
          <WeatherIcons.ClearSky />
        </div>
      </div>
    </nav>
  );
}
