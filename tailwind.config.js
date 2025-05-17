const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      // logo: ["Road Rage", "sans-serif"]
      logo: ["Permanent Marker", "sans-serif"],
      teachers: ["Teachers", "sans-serif"],
      sans: ["Teachers", "sans-serif"]
    },
    colors: {
      test: {
        50: "#f0f9ff",
        100: "#076A87",
        200: "#54C3B2",
        300: "#FAC215",
        400: "#F46030",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#076A87",
      },
      amber: {
        custom: '#FAC215'
      }
    }
  },
  plugins: [],
});