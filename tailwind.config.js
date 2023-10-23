/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js, jsx}",
  ],
  theme: {
    extend: {
        colors: {
            'text': '#000000',
            'background': '#b8deff',
            'primary': '#a0b5ca',
            'secondary': '#1ea3be',
            'accent': '#3df5ff',
        },
    },
  },
  plugins: [],
}

