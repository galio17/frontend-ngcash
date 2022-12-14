/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      dark: "url('/background.jpg')",
      light: "url('/background-light.jpg')",
    },
    colors: {
      "grey-0": "#FFFFFF",
      "grey-1": "#C2C2C2",
      "grey-2": "#000000",
      primary: "#7D2CFF",
      secondary: "#01CA30",
      alert: "#D63434",
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("state-on", "&[data-state='on']");
      addVariant("date-picker", "&::-webkit-calendar-picker-indicator");
    }),
  ],
};
