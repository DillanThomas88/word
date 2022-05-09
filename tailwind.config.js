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
        appear: 'appear .5s forwards',
        slowAppear: 'appear 2s forwards',
        disapear: 'appear .25s reverse forwards',
        spin: 'spin .5s forwards',
        reversespin: 'spin .5s reverse forwards',
        slidefade: 'slidefade .5s forwards ',
        colorfade:'colorfade .25s linear forwards',
        reversecolorfade: 'colorfade .25s reverse linear forwards'
      },
      keyframes: {
        appear: {
          from: { opacity: 0, transform: 'translateX(1rem)' },
          to: { opacity: 1, transform: 'translateX(0rem)' },
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
        colorfade: {
          from: {backgroundColor: '#404040'},
          to: {backgroundColor: '#22c55e'}
        },


      },
    },
  },
  plugins: [],
}
