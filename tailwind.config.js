/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all relevant files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Example custom color
        secondary: '#9333ea',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example custom font
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add TailwindCSS forms plugin
    require('@tailwindcss/typography'), // Add TailwindCSS typography plugin
  ],
}

