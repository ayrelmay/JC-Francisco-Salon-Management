/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      FontPrimary: "#071013",
      BtnHover: "#3D5A80",
      BtnPrimary: "#1B263B",
      Disable: "#A0A9B8",
      bgcSec: "#F8F8F8",
      green: "#027B48",
      red: "#F5595B",
      yellow: "#F4B35B",
      nails: "#1F5E89",
      beauty: "#143E57",
      hair: "#71BFF0",
      spa: "#B0DFFD",
      BtnFocus: "#B1BCD2",
      Tableline: "#667085",
      Blue: "#667085",
    },
    fontFamily: {
      sans: ["Poppins", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
