module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          navy: '#0C2D6B',
          blue: '#1565C0',
          gold: '#C8960C',
          'gold-light': '#E8B420',
        }
      }
    }
  },
  plugins: [],
}