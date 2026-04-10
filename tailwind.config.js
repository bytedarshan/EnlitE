/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // IF THIS IS MISSING, TAILWIND WILL NOT WORK
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}