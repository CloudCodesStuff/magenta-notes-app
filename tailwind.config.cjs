const custom = require('./src/lib/tailwind/plugin')

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'background': 'var(--background)',

    }
  },

  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), custom],
}
