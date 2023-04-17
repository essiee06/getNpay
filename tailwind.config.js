/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/src/assets/bg.jpg')",
      },
      fontFamily: {
        bodyFont: "Basic",
        titleFont: "Basic",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1440px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
