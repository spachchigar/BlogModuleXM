/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /^m[trblxy]?-([0-9]|1[0-2])$/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus'],
    },

    {
      pattern: /^p[trblxy]?-([0-9]|1[0-2])$/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus'],
    },
    'list-disc',
    'list-inside',
    'mt-6',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        sm: '640px',
        md: '780px',
        lg: '1024px',
        xl: '1288px',
        '2xl': '1536px',
      },
      colors: {
        'br-color': '#001623',
        'btn-text-color': '#001623',
        primary: '#F6F7F7',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
