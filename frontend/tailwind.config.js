/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        light: "var(--color-light)",
        medium: "var(--color-medium)",
        dark: "var(--color-dark)",
        gray: {
          50: "#E5F0E4",
          100: "#DBE5DA",
          200: "#C2CCC2",
          300: "#AAB2AA",
          400: "#929991",
          500: "#7A8079",
          600: "#616661",
          700: "#494D49",
          800: "#313330",
          900: "#1D1F1D",
          950: "#131413",
        },
      },
    },
  },
};
