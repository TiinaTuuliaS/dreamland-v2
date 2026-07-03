/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
  background: "#FCFBFF",
  surface: "#FFFFFF",

  primary: "#1F1F23",
  secondary: "#6F7285",

  border: "#ECEAF4",

  accent: {
    DEFAULT: "#B8B3FF",
    hover: "#9E98F4",
  },

  ice: "#DFF5FF",
  lavender: "#DDD7FF",

  success: "#42B883",
  danger: "#E45A6D",
},

      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Manrope", "sans-serif"],
      },

      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.05)",
        floating: "0 20px 40px rgba(0,0,0,.08)",
        glow: "0 0 30px rgba(184,179,255,.25)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(.4,0,.2,1)",
      },

      transitionDuration: {
        250: "250ms",
      },

      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};