module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loader: {
          '0%': { left: '-25%' },
          '20%': { left: '5%' },
          '40%': { left: '35%' },
          '60%': { left: '65%' },
          '80%': { left: '95%' },
          '100%': { left: '125%' },
        }
      },
      animation: {
        loader: 'loader 1s linear infinite',
      }
    },
  },
  plugins: [],
}
