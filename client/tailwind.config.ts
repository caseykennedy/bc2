import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      space: {
        'header': '88px',
        'icon': '24px',
      },
      colors: {
        'primary': {
          '50': '#00ff9b',
          '100': '#00ff9b',
          '200': '#00ff9b',
          '300': '#00ff9b',
          '400': '#00ff9b',
          '500': '#00ff9b',
          '600': '#00ff9b',
          '700': '#00ff9b',
          '800': '#00ff9b',
          '900': '#00ff9b',
        }
      },
      aspectRatio: {
        'portrait': '9 / 11',
      },
      fontFamily: {
        sans: ['NBInternationalPro', 'Arial', 'sans-serif'],
        mono: ['SuisseMono', 'JetBrains Mono', 'monospace'],
        display: ['Rubik', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
