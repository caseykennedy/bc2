import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
