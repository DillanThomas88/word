module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        default: ['Montserrat']
      },
      gridTemplateColumns: {
        // custom grid setup
        '50': 'repeat(50, minmax(0, 1fr))',
      },
      animation: {
        appear: 'appear .25s forwards',
        disapear: 'appear .25s reverse forwards',
      },
      keyframes: {
        appear: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },


      },
    },
  },
  plugins: [],
}
