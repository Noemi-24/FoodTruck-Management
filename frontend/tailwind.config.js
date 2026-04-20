/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
          sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Brand colors 
        primary: {
          DEFAULT: '#1d4ed8',  // blue-700
          dark: '#1e40af',     // blue-800
          light: '#3b82f6',    // blue-600
        },
      },
    },    
  },
  plugins: [],
}

