module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      // fontFamily: {
      //   default: ['Montserrat']
      // },
      gridTemplateColumns: {
        // custom grid setup
        '50': 'repeat(50, minmax(0, 1fr))',
      },
      animation: {
        appear: 'appear .5s forwards',
        slowAppear: 'appear 2s forwards',
        disapear: 'appear .25s reverse forwards',
        spin: 'spin .1s forwards',
        reversespin: 'spinfade .1s reverse forwards',
        slidefade: 'slidefade .5s forwards ',
        colorfade:'colorfade .25s linear forwards',
        reversecolorfade: 'colorfade .25s reverse linear forwards',
        throb: 'throb 1.2s linear infinite',
        pop: 'pop .1s linear forwards',
        opacityfade: 'opacityfade 3s forwards',
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
        spinfade: {
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
          to: {backgroundColor: '#0ea5e9'}
        },
        throb: {
          '0%': {transform: 'scaleX(1)'},
          '5%': {transform: 'scaleX(1.05)'},
          '10%': {transform: 'scaleX(1)'},
          '100%': {transform: 'scaleX(1)'},
        },
        pop: {
          '0%': {transform: 'scale(1.1)'},
          '100%': {transform: 'scale(1)'},
        },
        opacityfade: {
          '0%': {transform: 'translateY(1rem)', opacity: 0},
          '10%': {transform: 'translateY(0rem)', opacity: 1},
          '70%': {transform: 'translateY(0rem)', opacity: 1},
          '100%': {transform: 'translateY(-1.1rem)', opacity: 0},
        }


      },
    },
  },
  plugins: [],
}
