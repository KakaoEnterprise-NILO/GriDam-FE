/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
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
        primary: '#1d4ed8',
        secondary: '#9333ea',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
}
