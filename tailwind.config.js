module.exports = {
  content: [
    './public/index.html',
    './src/**/*.js'],
  theme: {
    extend: {},
  },
  mode: 'jit',
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
