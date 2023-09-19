import { useEffect, useRef, useState } from "react";
import { City, myStore } from "../../../store";
import { useClickAway } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import Weather from "./weather";
import { inputClass, inputTexts } from "./constants";

interface Districts {
  districts: [
    {
      name: string;
      neighborhoods: [{ code: string; name: string }];
    },
  ];
  name: string;
}

const inputTW =
  "px-2 bg-theme3 placeholder:text-light text-light placeholder:font-openSans";
const inputListTW = "cursor-pointer select-none border-b border-black py-3 hover:bg-theme3 transition duration-300";

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
      className={inputListTW}
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

  const counties = filteredCounties_2?.map((item) => (
    <li
      key={item.name}
      className={inputListTW}
      onClick={() => {
        if (item.name) {
          setCurrentCounty(item.name);
          countyRef.current && (countyRef.current.value = item.name);
        }
        setCountyOpen(false);
        item.districts[0].neighborhoods[0].code !== undefined &&
          setSendZipCode(item.districts[0].neighborhoods[0].code);
      }}
    >
      {item.name}
    </li>
  ));

  //////////////////////////////////////////////////////////////////////////////*

  return (
    <nav
      className={`relative my-5 flex basis-1/4 items-center justify-center gap-10 rounded bg-theme1 p-5`}
    >
      <div
        className={`flex h-full basis-1/3 justify-center gap-5 rounded-2xl   px-5 `}
      >
        <div className={`relative flex h-fit flex-col gap-y-10 `}>
          <input
            className={`${inputTW} h-10 w-60`}
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
              className={`absolute top-14 z-10 flex h-36 w-60 flex-col overflow-scroll overflow-x-hidden bg-dark text-white`}
            >
              {cities}
            </motion.ul>
          )}
        </div>
        <div
          className={`${
            countyRef.current?.value == "" ? "cursor-no-drop" : ""
          } relative flex h-fit flex-col  gap-y-10`}
        >
          <input
            className={`${inputTW} ${cityValue ? "" : inputClass} h-10 w-60`}
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
                  (filteredCounties_2 &&
                    filteredCounties_2[0].districts[0].neighborhoods[0].code) ??
                    "",
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
              className={`absolute top-14 z-10 flex h-36 w-60 flex-col overflow-scroll overflow-x-hidden bg-dark text-white`}
            >
              {counties}
            </motion.ul>
          )}
        </div>
      </div>
      <Weather />
    </nav>
  );
}
