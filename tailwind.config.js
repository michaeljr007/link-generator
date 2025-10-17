/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9333EA",
        secondary: "#64748B",
        tertiary: "#64748B",
        dark: {
          DEFAULT: "#0f0f0f",
          surface: "#1a1a1a",
          elevated: "#262626",
        },
        light: {
          DEFAULT: "#f7f7f7",
          surface: "#ffffff",
          elevated: "#e0e0e0",
        },
      },
    },
  },
  plugins: [],
};
