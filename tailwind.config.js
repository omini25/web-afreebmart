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
        secondary: "#d89000",
        backgroundLight: "#F9FAFB",

      }
    },
  },
  // variants: {
  //   extend: {
  //     opacity: ['group-hover'],
  //   },
  // },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),


  ],
}

