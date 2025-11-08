/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        secondary: '#00B3B0',
        'accent-apply': '#1FAD66',
        'accent-donate': '#2D6CDF',
        warning: '#D97706',
        background: '#F7FAFC',
        'text-primary': '#0F172A',
        'text-secondary': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

