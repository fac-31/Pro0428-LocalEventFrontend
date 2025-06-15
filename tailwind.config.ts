export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  lightMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        text: 'var(--color-text)',
      },
    },
  },
};
