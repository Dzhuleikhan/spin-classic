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
      xs: { max: "360px" },
      "big-laptop": {
        raw: "((max-width: 1200px) and (min-height: 1250px))",
      },
      "extra-small": {
        raw: "((max-width: 400px) and (max-height: 500px))",
      },
    },
    extend: {
      fontFamily: {
        coiny: "Coiny",
        roboto: "Roboto",
        dela: "Dela Gothic One",
        podkova: "Podkova",
      },
      boxShadow: {},
      dropShadow: {
        podiumShadow: "0 14px 45px  rgba(0, 0, 0, 0.93)",
      },
    },
  },
  plugins: [],
};
