export default function Footer() {
  const localThemeTW =
    "text-light transition select-none text-xs sm:text-base lg:text-sm 2xl:text-base";

  return (
    <>
      <div
        className={`${localThemeTW} container m-auto flex flex-col-reverse items-center justify-between gap-5 pt-5 sm:h-32 md:h-0 md:basis-1/12 lg:flex-row-reverse`}
      >
        <p className={`w-full text-center py-3 sm:p-0 bg-theme4 sm:w-auto sm:bg-transparent`}>
          Copyright &copy; 2023 Buğra Işık Hava Durumu. Tüm hakları saklıdır.
        </p>
        <div className={`flex gap-4 items-center sm:gap-6 md:gap-4 lg:gap-2 lg:text-xs whitespace-nowrap`}>
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
