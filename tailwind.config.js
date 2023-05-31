/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#edf1f5",
        todoBackground: "#f1f2f4",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
