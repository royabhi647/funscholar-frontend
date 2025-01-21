/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #F15A29 -64%, #FC7C52 140%)',
      },
      colors: {
        'custom-border': '#B0928B33',
        'custom-white': 'rgba(255, 255, 255, 0.61)',
        'light-blue': '#DBEBFF',
      },
    },
  },
  plugins: [],
}