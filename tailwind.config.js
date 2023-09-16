/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: "'DM Sans', sans-serif",
      },
      colors: {
        mainThemeDark: "#101010",
        mainThemeLight: "#f7fafc",
      },
    },
  },
  plugins: [],
};
