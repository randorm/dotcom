/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "110": "26rem",
      },
      fontFamily: {
        "sans": ["Quicksand", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: "0.6rem",
      },
      gap: {
        "110": "34rem",
        "150": "48rem",
      },
    },
  },
  plugins: [],
};
