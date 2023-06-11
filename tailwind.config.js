/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue' : '#0080FF',
        'btncolor' : '#148bfa',
      },
    },
  },
  plugins: [],
}

