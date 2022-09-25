/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      Josefin: ["'Josefin Sans'", "sans-serif"],
      madi: ["'Ms Madi'", "cursive"],
    },
    extend: {
      colors: {
        paletteD: {
          // one: "#1F1D36",
          // two: "#3F3351",
          // three: "#864879",
          // four: "#E9A6A6",
          //-----------------
          // one: "#E7E0C9",
          // two: "#C1CFC0",
          // three: "#6B7AA1",
          // four: "#11324D",
          one: "#1B0032",
          two: "#3D0072",
          three: "#DBFF3D",
          four: "#FAFAFA",
        },
      },
    },
  },
  plugins: [],
};
