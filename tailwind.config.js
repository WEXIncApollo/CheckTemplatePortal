/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        check: {
          background: '#f8fafc',
          border: '#e2e8f0',
          text: '#1e293b',
          accent: '#0f172a'
        }
      },
      fontFamily: {
        'check': ['Courier New', 'monospace'],
        'signature': ['Dancing Script', 'cursive']
      },
      spacing: {
        'check': '8.5in',
        'check-height': '3.5in',
        'check-full': '11in'
      }
    },
  },
  plugins: [],
}
