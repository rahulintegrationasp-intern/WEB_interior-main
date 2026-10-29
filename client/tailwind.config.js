/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#140904",
          surface: "#1D0E07",
          elevated: "#26130A",
          panel: "#2E170D",
          amber: "#C87D3B",
          copper: "#D49B6A",
          bronze: "#A66329",
          gold: "#E6C3A3",
          cream: "#F4ECE4",
          muted: "#B8A394",
          subtle: "#8A7263",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "Cambria", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        studio: "0 20px 50px rgba(0, 0, 0, 0.55)",
        "studio-sm": "0 8px 24px rgba(0, 0, 0, 0.35)",
        "amber-glow": "0 0 40px rgba(200, 125, 59, 0.15)",
      },
    },
  },
  plugins: [],
};
