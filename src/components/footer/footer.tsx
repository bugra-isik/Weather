export default function Footer() {
  const localThemeTW =
    "text-light transition select-none text-xs sm:text-base lg:text-sm 2xl:text-base";

  return (
    <footer
      className={`${localThemeTW} container m-auto flex flex-col-reverse items-center justify-between lg:flex-row-reverse lg:py-2 xl:py-3 2xl:py-4`}
    >
      <p
        className={`w-full bg-theme4 py-3 text-center sm:w-auto sm:bg-transparent sm:p-0`}
      >
        Copyright &copy; 2023 Buğra Işık Hava Durumu. Tüm hakları saklıdır.
      </p>
      <div
        className={`hidden items-center gap-4 whitespace-nowrap sm:gap-6 md:gap-4 lg:flex lg:gap-2 lg:text-xs`}
      >
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
    </footer>
  );
}
