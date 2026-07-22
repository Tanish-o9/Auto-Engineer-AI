/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        foreground: '#f1f5f9',
        panel: '#0f172a',
        accent: '#06b6d4',
        accentHover: '#0891b2',
        border: '#1e293b',
        muted: '#64748b'
      }
    },
  },
  plugins: [],
}
