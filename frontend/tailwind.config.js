/** @type {import('tailwindcss').Config} */
// Paleta exclusiva do redesign: preto, branco e verde-limão.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        graphite: '#000000',
        accent: '#CBF615',
        electric: '#CBF615',
        neon: '#CBF615',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(203, 246, 21, 0.55)',
      },
    },
  },
  plugins: [],
};
