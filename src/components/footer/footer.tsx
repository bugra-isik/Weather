export default function Footer() {
  const localThemeTW = "text-light transition select-none text-sm 2xl:text-base";

  return (
    <>
      <div
        className={`${localThemeTW} container m-auto flex basis-1/12 flex-row-reverse items-center justify-between`}
      >
        <p>
          Copyright &copy; 2023 Buğra Işık Hava Durumu. Tüm hakları saklıdır.
        </p>
        <div className={`flex gap-2`}>
          <p className={"select-none text-light/25"}>Powered by</p>
          <a
            className={`${localThemeTW} hover:text-[#eb6e4b]`}
            target="_blank"
            href="https://openweathermap.org/"
          >
            OpenWeather
          </a>
          <a
            className={`${localThemeTW} hover:text-[#149eca]`}
            target="_blank"
            href="https://react.dev/"
          >
            React
          </a>
          <a
            className={`${localThemeTW} hover:text-[#a94cfe]`}
            target="_blank"
            href="https://vitejs.dev/"
          >
            Vite
          </a>
          <a
            className={`${localThemeTW} hover:text-[#38bdf8]`}
            target="_blank"
            href="https://tailwindcss.com/"
          >
            TailwindCSS
          </a>
        </div>
      </div>
    </>
  );
}
