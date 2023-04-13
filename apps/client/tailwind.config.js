/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "#060a30",
      primary: "#7830b1",
      secondary: "#ba5ccf",
      white: "#fff",
      "white-opacity": "rgba(255, 255, 255, 0.9)",
    },
  },
  plugins: [],
};
