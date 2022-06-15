/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      grey: "#c3c3c3",
      "dark-grey": "#828282",
      black: "#000000",
      blue: "#000082",
      white: "#ffffff",
    },
    extend: {
      gridTemplateColumns: {
        titlebar: "repeat(2, 36px) 1fr repeat(2, 36px)",
      },
      gridTemplateRows: {
        titlebar: "36px 1fr",
      },
    },
  },
  plugins: [],
};
