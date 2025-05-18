/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // App Router inside src
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Components inside src
 
  ],
  theme: {
    extend: {
      screens: {
        sm: "368px",
        md: "776px",
        lg: "1024px",
      },
      fontFamily: {
        barlow: ["Barlow Condensed", "sans-serif"],
        futura: ["Futura Std", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};