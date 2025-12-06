// extend: {
//   keyframes: {
//     borderSnake: {
//       "0%": { "border-image": "linear-gradient(to right, #ec4899, #8b5cf6) 1" },
//       "25%": { "border-image": "linear-gradient(to bottom, #ec4899, #8b5cf6) 1" },
//       "50%": { "border-image": "linear-gradient(to left, #ec4899, #8b5cf6) 1" },
//       "75%": { "border-image": "linear-gradient(to top, #ec4899, #8b5cf6) 1" },
//       "100%": { "border-image": "linear-gradient(to right, #ec4899, #8b5cf6) 1" },
//     },
//   },
//   animation: {
//     borderSnake: "borderSnake 6s linear infinite",
//   },
// }
module.exports = {
    theme: {
        extend: {
            theme: {
  extend: {
    mixBlendMode: {
      screen: 'screen',
      lighten: 'lighten',
            keyframes: {
                borderSnake: {
                    "0%": { "border-image": "linear-gradient(to right, #ec4899, #8b5cf6) 1" },
                    "25%": { "border-image": "linear-gradient(to bottom, #ec4899, #8b5cf6) 1" },
                    "50%": { "border-image": "linear-gradient(to left, #ec4899, #8b5cf6) 1" },
                    "75%": { "border-image": "linear-gradient(to top, #ec4899, #8b5cf6) 1" },
                    "100%": { "border-image": "linear-gradient(to right, #ec4899, #8b5cf6) 1" },
                },
            },
            fontFamily: {
        script: ['"Clicker Script"', ...defaultTheme.fontFamily.sans], //
      },
            animation: {
                borderSnake: "borderSnake 6s linear infinite",
            },
        },
    },
    plugins: [],
}
        }
    }
};
