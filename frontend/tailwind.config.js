/** @type {import('tailwindcss').Config} */
// As cores vêm de src/styles/theme.css. Não edite valores aqui: edite o tema.
const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: color('bg'),
        graphite: color('bg'),
        accent: color('primary'),
        electric: color('primary'),
        neon: color('secondary'),
        muted: color('muted'),
        surface: color('surface'),
        'on-surface': color('on-surface'),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgb(var(--color-primary) / 0.5)',
        secondary: '0 0 40px -10px rgb(var(--color-secondary) / 0.7)',
      },
    },
  },
  plugins: [],
};
