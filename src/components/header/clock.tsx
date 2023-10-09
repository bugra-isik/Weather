import dayjs from "dayjs";
import { useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("**:**:**");

  setInterval(() => setTime(dayjs().format("hh:mm:ss")), 1000);

  return (
    <div className={`hidden lg:block col-span-2 text-center lg:text-5xl xl:text-6xl  2xl:text-8xl font-bold text-light transition`}>
      {`${time}`}
    </div>
  );
}
