import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#eef5ff",
          100: "#d9e9ff",
          500: "#1769ff",
          600: "#0757e6",
          700: "#0849ba",
          900: "#071d45"
        },
        navy: {
          950: "#020817",
          900: "#061326",
          800: "#0a1e3d"
        },
        saffron: {
          400: "#ffb238",
          500: "#ff8a00",
          600: "#f26a00"
        }
      },
      boxShadow: {
        glow: "0 0 48px rgba(23, 105, 255, 0.38)",
        orangeGlow: "0 0 42px rgba(255, 138, 0, 0.36)",
        premium: "0 24px 80px rgba(2, 8, 23, 0.18)"
      },
      backgroundImage: {
        "royal-radial": "radial-gradient(circle at top left, rgba(23, 105, 255, 0.36), transparent 32%), radial-gradient(circle at 80% 10%, rgba(255, 138, 0, 0.24), transparent 24%)",
        "premium-dark": "linear-gradient(135deg, #020817 0%, #061326 46%, #111827 100%)"
      }
    }
  },
  plugins: []
};

export default config;
