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
        appear: 'appear 1s forwards',
        slowAppear: 'appear 2s forwards',
        disapear: 'appear .25s reverse forwards',
        spin: 'spin .5s forwards',
        reversespin: 'spin .5s reverse forwards',
        slidefade: 'slidefade .5s forwards '
      },
      keyframes: {
        appear: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        spin: {
          from: {transform: 'scaleX(0)'},
          to: {transform: 'scaleX(1)'}
        },
        slidefade: {
          '0%': {transform: 'translateX(1rem)', opacity: 0},
          '50%': {transform: 'translateX(1rem)', opacity: 0},
          '100%': {transform: 'translateX(0rem)', opacity: 1}
        },


      },
    },
  },
  plugins: [],
}
