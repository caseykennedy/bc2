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
      },
      colors: {
        'primary': '#00ff9b',
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
