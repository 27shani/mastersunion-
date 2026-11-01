import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        canvas: "#f4f2ee",
        neutral: {
          50: "#faf9f7", 100: "#f4f2ee", 200: "#e9e6e0", 300: "#d6d2ca", 400: "#a8a398",
          500: "#7c776c", 600: "#5f5b52", 700: "#47443d", 800: "#2b2925", 900: "#161512", 950: "#0b0a09",
        },
      },
    },
  },
  plugins: [],
};
export default config;
