/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#24252D',
        secondaryColor: '#2D2E36',
        tertiaryColor: '#FD6C6F'
      },
      fontFamily: {
        'main':['Raleway', 'sans-serif']
      }
    },
  },
  plugins: [],
}
