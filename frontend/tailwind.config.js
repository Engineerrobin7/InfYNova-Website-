/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nova-black': '#0a0a0a',
        'nova-midnight': '#1a1a2e',
        'nova-blue': '#00d4ff',
        'nova-purple': '#8b5cf6',
        'nova-silver': '#e5e7eb',
        'nova-glow': '#00ffff',
      },
      fontFamily: {
        'nova': ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 20s linear infinite',
        'morph': 'morph 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        particle: {
          '0%': { transform: 'translateX(-100vw) translateY(0px)' },
          '100%': { transform: 'translateX(100vw) translateY(-100px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '20px' },
          '50%': { borderRadius: '50px' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      backgroundImage: {
        'nova-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}