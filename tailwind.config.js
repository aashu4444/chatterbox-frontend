module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-50': 'rgb(236, 253, 245)',
        'theme-100': 'rgb(209 250 229)',
        'theme-200': 'rgb(167 243 208)',
        'theme-300': 'rgb(110 231 183)',
        'theme-400': 'rgb(52 211 153)',
        'theme-500': 'rgb(16 185 129)',
        'theme-600': 'rgb(5 150 105)',
        'theme-700': 'rgb(4 120 87)',
        'theme-800': 'rgb(6 95 70)',
        'theme-900': 'rgb(6 78 59)',
      }
    },
  },
  plugins: [],
}
