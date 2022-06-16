/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      grey: "#c3c3c3",
      "dark-grey": "#828282",
      "darker-grey": "#848a8c",
      black: "#000000",
      blue: "#000082",
      white: "#ffffff",
    },
    fontFamily: { sans: ["MS Sans Serif"], system: ["System"] },
    extend: {
      gridTemplateColumns: {
        titlebar: "36px 1fr 36px",
      },
      gridTemplateRows: {
        titlebar: "36px 1fr",
      },
    },
  },
  plugins: [],
};
