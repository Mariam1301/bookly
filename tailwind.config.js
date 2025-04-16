/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}", "./node_modules/primeng/**/*.js"],
  theme: {
    extend: {
      colors: {
        "button-secondary-background": "var(--p-button-secondary-background)",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
