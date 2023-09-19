import { themeStore } from "../../store";

export default function Footer() {
  const { theme } = themeStore();

  const localTheme =
    theme === "light" ? "text-dark" : "text-light";
  return (
    <>
      <div
        className={`${localTheme} container m-auto flex basis-1/12 flex-row-reverse items-center justify-between`}
      >
        <p>
          Copyright &copy; 2023 Buğra Işık Hava Durumu. Tüm hakları saklıdır.
        </p>
        <div className={`flex gap-2`}>
          <p
            className={
              theme === "light"
                ? "select-none text-dark/25"
                : "select-none text-light/25"
            }
          >
            Powered by
          </p>
          <a
            className={`${localTheme} hover:text-[#eb6e4b]`}
            target="_blank"
            href="https://openweathermap.org/"
          >
            OpenWeather
          </a>
          <a
            className={`${localTheme} hover:text-[#149eca]`}
            target="_blank"
            href="https://react.dev/"
          >
            React
          </a>
          <a
            className={`${localTheme} hover:text-[#a94cfe]`}
            target="_blank"
            href="https://vitejs.dev/"
          >
            Vite
          </a>
          <a
            className={`${localTheme} hover:text-[#38bdf8]`}
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
