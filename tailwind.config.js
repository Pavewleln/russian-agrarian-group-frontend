/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e0f2f1",
          100: "#b2dfdb",
          200: "#80cbc4",
          300: "#4db6ac",
          400: "#26a69a",
          500: "#2E8B57",
          600: "#228B22",
          700: "#006400",
          800: "#00695c",
          900: "#004d40",
        }
      },
      maxWidth: {
        "1/2": "50%",
        "1/4": "25%",
        "3/4": "75%",
        "2.5/4": "70%"
      }
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ]
    }
  },
  plugins: []
};
