/** @type {import('tailwindcss').Config} */
const withAnimations = require("animated-tailwindcss");

module.exports = withAnimations({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: { extend: {} },
  plugins: [],
});
