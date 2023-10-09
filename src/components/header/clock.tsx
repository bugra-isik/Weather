import dayjs from "dayjs";
import { useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("**:**:**");

  setInterval(() => setTime(dayjs().format("HH:mm:ss")), 1000);

  return (
    <div
      className={`col-span-2 hidden items-center justify-center text-center font-bold text-light transition lg:flex lg:text-4xl xl:text-5xl 2xl:text-7xl`}
    >
      <div className={`lg:w-14 xl:w-20 2xl:w-24`}>{`${time.slice(0, 2)}`}</div>
      <div className={``}>:</div>
      <div className={`lg:w-14 xl:w-20 2xl:w-24`}>{`${time.slice(3, 5)}`}</div>
      <div className={``}>:</div>
      <div className={`lg:w-14 xl:w-20 2xl:w-24`}>{`${time.slice(6, 8)}`}</div>
    </div>
  );
}
