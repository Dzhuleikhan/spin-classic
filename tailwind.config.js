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
    },
    extend: {
      fontFamily: {
        coiny: "Coiny",
        roboto: "Roboto",
        dela: "Dela Gothic One",
        podkova: "Podkova",
      },
      colors: {
        black: "#0C0C0C",
        red: "#E93224",
        green: "#75f972",
        yellow: "#F4FD2B",
        pageBg: "#0E0F20",
        background2: "#171D36",
        white: "#f0f0f0",
        black: "#0f0f0f",
        yellow: "#f4fd2b",
        window1: "#14182F",
        window2: "#1D2442",
        borderColor: "#272F50",
        darkGray: "#8A95C1",
        lightGray: "#a9aabf",
        purple: "#8726FF",
        successGreen: "#4ED937",
        stateFail: "#ff5530",
      },
      boxShadow: {},
      dropShadow: {
        podiumShadow: "0 14px 45px  rgba(0, 0, 0, 0.93)",
      },
    },
  },
  plugins: [],
};
