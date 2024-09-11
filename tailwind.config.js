/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6de768",
        secondary: "#e9cf9f",
        backgroundLight: "#F9FAFB",
        btnprimary: "#3bb77e",
        btnsecondary: "#d89000",
        backgroundDark: "#f4f6fa",
        newColor: "#3BB77E",
        sliderBackground: "#A6A6A6",
        altText1: "#6DE768",
        altBackground: "#DEF9EC",

      }
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),


  ],
}

