/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: "'DM Sans', sans-serif",
      },
      colors: {
        dark: "#3b3c40",
        light: "#f7fafc",
        theme1: "#011b30",
        theme2: "#022d50",
        theme3: "#355773",
        theme4: "#033056",
        theme5: "#13588B",
        grad1: "#033056",
        grad2: "#13588B",
      },
    },
  },
  plugins: [],
};
