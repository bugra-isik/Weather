import { WeatherIcons } from "./svg/SVG";

type SpinnerProps = {
  setSpinner: (x: boolean) => void;
  spinner: boolean;
};

export default function Spinner({ setSpinner }: SpinnerProps) {
  return (
    <div className={`relative flex flex-col items-center`}>
      <span className={`h-40 w-40 lg:h-20 lg:w-20 xl:h-40 xl:w-40`}>
        <WeatherIcons.Spinner />
      </span>
      <button
        className={`absolute -bottom-20 rounded bg-theme5 px-4 py-2 font-black text-light drop-shadow transition duration-300 ease-out hover:scale-95`}
        onClick={() => setSpinner(true)}
      >
        Atla
      </button>
    </div>
  );
}
