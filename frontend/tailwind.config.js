module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyberPink: '#ff00ff',
        cyberBlue: '#00ffff',
        cyberPurple: '#9900ff'
      },
      animation: {
        glitch: 'glitch 1s infinite'
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-3px)' }
        }
      }
    }
  },
  plugins: []
}