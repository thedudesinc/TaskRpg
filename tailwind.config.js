/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    // colors: {
    //   'cerulean': '#0e7490',
    //   'dark-cerulean': '#095266',
    //   'night': '#1b2021',
    //   'gunmetal': '#2E3638',
    //   'pantone': '#291000',
    //   'violet': '#502b3e',
    // },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

