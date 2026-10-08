/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        woxsen: {
          blue: '#1d4ed8',
          darkBlue: '#1e3a8a',
          purple: '#7c3aed',
          indigo: '#4f46e5',
          sky: '#0284c7',
          surface: '#f8fafc'
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 12px 28px -4px rgba(37, 99, 235, 0.12)'
      }
    },
  },
  plugins: [],
}
