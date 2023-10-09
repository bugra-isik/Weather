import { useEffect, useRef, useState } from "react";
import { City, myStore } from "../../store";
import { useClickAway, useWindowSize } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import Weather from "./weather";
import { inputClass, inputTexts } from "../ui/constants";
import Clock from "./clock";

interface Districts {
  name: string;
  code: string;
}

export default function Nav() {
  const { api, setSendZipCode, setCurrentCounty, currentCity, setCurrentCity } =
    myStore();
  const [cityOpen, setCityOpen] = useState(false);
  const [countyOpen, setCountyOpen] = useState(false);
  const [cityInputValue, setCityInputValue] = useState<string | undefined>();
  const [countyInputValue, setCountyInputValue] = useState<
    string | undefined
  >();
  const [filteredCities, setFilteredCities] = useState<City[]>();
  const [filteredCounties, setFilteredCounties] = useState<City[]>();
  const [filteredCounties_2, setFilteredCounties_2] = useState<Districts[]>();
  const [cityValue, setCityValue] = useState<string | undefined>();

  //////////////////////////////////////////////////////////////////////////////!
  const cityRef = useRef<HTMLInputElement | null>(null);
  const countyRef = useRef<HTMLInputElement | null>(null);

  const ref = useClickAway<HTMLUListElement>(() => {
    setCityOpen(false);
    setCountyOpen(false);
    setCityInputValue(undefined);
    setCountyInputValue(undefined);
  });

  const handleOpenCity = () => setCityOpen(true);
  const handleOpenCounty = () => setCountyOpen(true);

  //!-///////////////////////--TAILWIND--//////////////////////////////////////////////////

  const inputTW =
    "h-10 w-36 sm:w-60 lg:w-40 xl:w-48 2xl:w-60  px-2 bg-theme3 placeholder:text-sm sm:placeholder:text-base rounded placeholder:text-light/50 placeholder:font-light text-light";
  const inputListTW =
    "cursor-pointer select-none pl-2 border-b border-black py-3 hover:bg-theme3 ";

  const ulTW =
    "absolute top-14 z-10 flex h-fit max-h-36 w-36 sm:w-60 lg:w-40 xl:w-48 2xl:w-60 flex-col overflow-scroll overflow-x-hidden bg-dark text-white drop-shadow-2xl";

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

  const [cityTriger, setCityTriger] = useState<boolean>(true);
  const cities = filteredCities?.map((item: { name: string }, index) => (
    <motion.li
      key={item.name}
      className={`${inputListTW} ${index == 0 && cityTriger && "bg-theme3"}`}
      onMouseEnter={() => setCityTriger(false)}
      onMouseLeave={() => setCityTriger(true)}
      onClick={() => {
        setCurrentCity(item.name);
        setCurrentCounty("");
        setCityOpen(false);
        setCityValue(item.name);
        setCountyOpen(true);
        cityRef.current && (cityRef.current.value = item.name);
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

  const [countyTriger, setCountyTriger] = useState<boolean>(true);
  const counties = filteredCounties_2?.map((item, index) => (
    <li
      key={item.name}
      className={`${inputListTW} ${index == 0 && countyTriger && "bg-theme3"}`}
      onMouseEnter={() => setCountyTriger(false)}
      onMouseLeave={() => setCountyTriger(true)}
      onClick={() => {
        if (item.name) {
          setCurrentCounty(item.name);
          countyRef.current && (countyRef.current.value = item.name);
        }
        setCountyOpen(false);
        setSendZipCode(item.code);
      }}
    >
      {item.name}
    </li>
  ));

  //////////////////////////////////////////////////////////////////////////////*

  let navSmTW;
  const windowSize = useWindowSize();
  const sm = 650;

  if ((windowSize.width ?? sm + 1) < sm) {
    navSmTW = "bg-gradient-to-b from-grad1 to-grad2";
  } else {
    navSmTW = "";
  }

  return (
    <nav
      className={`${navSmTW} relative flex basis-1/4 flex-col justify-start gap-10 bg-theme1 p-5 sm:my-5 sm:rounded lg:flex-row lg:items-center lg:justify-center xl:p-5`}
    >
      <div
        className={`grid h-full grid-cols-2 grid-rows-2 gap-x-5 rounded-2xl sm:basis-2/5`}
      >
        <div
          className={`relative flex h-fit flex-col gap-y-10 justify-self-end`}
        >
          <input
            className={inputTW}
            ref={cityRef}
            type="text"
            placeholder={inputTexts[0]}
            onChange={(e) => {
              setCityInputValue(e.currentTarget.value.toLocaleUpperCase());
            }}
            onClick={(e) => {
              handleOpenCity();
              e.currentTarget.value = "";
              countyRef.current && (countyRef.current.value = "");
              setCityInputValue("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCurrentCity(filteredCities && filteredCities[0].name);
                if (cityRef.current) {
                  cityRef.current.value =
                    (filteredCities && filteredCities[0].name) ?? "";
                }
                setCityOpen(false);
                countyRef.current?.focus();
              } else if (e.key === "Tab") {
                setCurrentCity(filteredCities && filteredCities[0].name);

                if (cityRef.current) {
                  cityRef.current.value =
                    (filteredCities && filteredCities[0].name) ?? "";
                }
                setCityOpen(false);
                countyRef.current?.click();
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
              className={ulTW}
            >
              {cities}
            </motion.ul>
          )}
        </div>
        <div
          className={`${
            countyRef.current?.value == "" ? "cursor-no-drop" : ""
          } relative flex h-fit flex-col gap-y-10`}
        >
          <input
            className={`${inputTW} ${cityValue ? "" : inputClass}`}
            ref={countyRef}
            type="text"
            placeholder={currentCity ? inputTexts[1] : inputTexts[0]}
            onChange={(e) => {
              setCountyInputValue(e.currentTarget.value.toLocaleUpperCase());
            }}
            onClick={(e) => {
              currentCity && handleOpenCounty();
              e.currentTarget.value = "";
            }}
            onFocus={() => {
              setCityOpen(false);
              setCountyOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                setCurrentCounty(
                  filteredCounties_2 && filteredCounties_2[0].name,
                );
                if (countyRef.current) {
                  countyRef.current.value =
                    (filteredCounties_2 && filteredCounties_2[0].name) ?? "";
                }
                setCountyOpen(false);
                setSendZipCode(
                  (filteredCounties_2 && filteredCounties_2[0].code) ?? "",
                );
              } else if (e.key === "Backspace") {
                setCountyOpen(true);
              }
            }}
          />
          {countyOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={ref}
              className={ulTW}
            >
              {counties}
            </motion.ul>
          )}
        </div>
        <Clock/>
      </div>
      <Weather />
    </nav>
  );
}

