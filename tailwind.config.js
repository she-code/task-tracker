/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#edf1f5",
        todoBackground: "#f1f2f4",
        glass: "rgba(255,255,255,0.25)",
        brown: "rgb(30,30,17)",
      },
      boxShadow: {
        custom: "0px 0px 5px #fff",
        white: "rgb(255, 255, 255) 6px 6px 15px",
      },
    },

    backgroundImage: {
      back: `url(./src/background.jpg)`,
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
