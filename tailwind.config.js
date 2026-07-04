/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "midnight-navy": "#0A0F1E",
        "deep-slate": "#111827",
        emerald: {
          400: "#34D399",
          500: "#10B981",
        },
        teal: {
          400: "#2DD4BF",
          500: "#0D9488",
        },
        cyan: {
          400: "#22D3EE",
        },
        gold: {
          400: "#FCD34D",
          500: "#F59E0B",
        },
      },
      perspective: {
        1000: "1000px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(16,185,129,0.07) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
