const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
      },
    },
  },
  plugins: [],
};
