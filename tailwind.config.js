/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    screens: {
      extralg: { max: "1750px" },
      xl: { max: "1200px" },
      lg: { max: "992px" },
      tbl: { max: "767px" },
      medium: { max: "650px" },
      mobile: { max: "576px" },
      sm: { max: "480px" },
    },
    extend: {
      fontFamily: {
        coiny: "Coiny",
      },
      boxShadow: {},
      dropShadow: {
        podiumShadow: "0 14px 45px  rgba(0, 0, 0, 0.93)",
      },
    },
  },
  plugins: [],
};
