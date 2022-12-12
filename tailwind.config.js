/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      moderateBlue: 'hsl(238, 40%, 52%)',
      softRed: 'hsl(358, 79%, 66%)',
      lightGrayishBlue: 'hsl(239, 57%, 85%)',
      paleRed: 'hsl(357, 100%, 86%)',
      darkBlue: 'hsl(212, 24%, 26%)',
      grayishBlue: 'hsl(211, 10%, 45%)',
      lightGray: 'hsl(223, 19%, 93%)',
      veryLightGray: 'hsl(228, 33%, 97%)'
    },
    extend: {
      dropShadow: {
        '3xl': '0px 3px 3px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}
