export default function Footer() {
  return (
    <>
      <div
        className={`container m-auto flex basis-1/12 items-center justify-between text-slate-300 text-white`}
      >
        <p>
          Copyright &copy; 2023 Buğra Işık Hava Durumu. Tüm hakları saklıdır.
        </p>
        <div className={`flex gap-2`}>
          <a
            className={`text-slate-300 hover:text-[#eb6e4b]`}
            target="_blank"
            href="https://openweathermap.org/"
          >
            OpenWeather
          </a>
          <a
            className={`text-slate-300 hover:text-[#149eca]`}
            target="_blank"
            href="https://openweathermap.org/"
          >
            React
          </a>
          <a
            className={`text-slate-300 hover:text-[#a94cfe]`}
            target="_blank"
            href="https://openweathermap.org/"
          >
            Vite
          </a>
          <a
            className={`text-slate-300 hover:text-[#38bdf8]`}
            target="_blank"
            href="https://openweathermap.org/"
          >
            TailwindCSS
          </a>
        </div>
      </div>
    </>
  );
}
