/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#9333EA",
        tertiary: "#64748B",
        dark: {
          DEFAULT: "#0f0f0f", // Base background
          surface: "#1a1a1a", // Main container background
          elevated: "#262626", // Cards, divs, etc.
        },
        light: {
          DEFAULT: "#f7f7f7", // Base background
          surface: "#ffffff", // Main container background
          elevated: "#e0e0e0", // Cards, divs, etc.
        },
      },
    },
  },
  plugins: [],
};
