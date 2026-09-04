/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d4af37", // Gold
        secondary: "#143625", // Card Green
        darkbg: "#081c12", // Very Dark Green Background
        lighttext: "#fbf8f1", // Off-white/Cream Text
        dark: "#05120c" // Extra dark
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
