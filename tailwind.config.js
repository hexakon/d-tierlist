/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'cerise': '#e83d84',
        'cerise-strong': '#ee2a7b',
        'cerise-light': '#ec5f99',
        'off-black': '#212121',
        'off-yellow': '#fcda04',
        'off-white': '#f7f7f7',
        's': 'rgb(255, 127, 127)',
        'a': 'rgb(255, 191, 127)',
        'b': 'rgb(255, 223, 127)',
        'c': '#ffff7f',
        'd': 'rgb(191, 255, 127)',
        'e': 'rgb(127, 255, 127)',
        'f': 'rgb(127, 255, 255)'
      },
      screens: {
        'xs': '420px',
        'xs2': '540px',
        'sm2': '700px'
      }
    },
  },
  plugins: [],
}

