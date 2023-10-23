/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js, jsx}",
    "./src/**/*.html",
    "./src/**/*.jsx",
    "*.html",
    "*.jsx",
  ],
  theme: {
    extend: {
        colors: {
            'text': '#000000',
            'background': '#34495E',
            'primary': '#a0b5ca',
            'secondary': '#1ea3be',
            'accent': '#3df5ff',
        },
        fontFamily: {
            'sans': ['Lato']
        }
    },
  },
  plugins: [],
}

