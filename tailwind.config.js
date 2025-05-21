/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all relevant files
  ],
  safelist: [
    // bg 색깔 (이미 기본 포함되지만 예시)
    'bg-green-300',
    'bg-purple-300',
    'bg-red-300',
    'bg-yellow-300',
    
    // border 색깔 (필수 - 동적 클래스)
    'border-green-500',
    'border-purple-500',
    'border-red-500',
    'border-yellow-500',
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
    require('@tailwindcss/line-clamp')
  ],
}

