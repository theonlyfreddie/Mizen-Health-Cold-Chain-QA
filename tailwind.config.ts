import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F4EE",
          dim: "#EFEAE0",
        },
        ink: {
          DEFAULT: "#1B1F1D",
          soft: "#4A524D",
          faint: "#8A938C",
        },
        teal: {
          50: "#EAF3F1",
          100: "#CFE3DF",
          200: "#9FC7BF",
          300: "#6FAB9F",
          400: "#3F8F7F",
          500: "#0F4C46",
          600: "#0C3F3A",
          700: "#0A332F",
          800: "#072622",
          900: "#051A17",
        },
        gold: {
          DEFAULT: "#C9A24B",
          soft: "#E4D2A0",
          deep: "#9C7A2E",
        },
        rust: {
          DEFAULT: "#B5512E",
          soft: "#E8C2AE",
        },
        night: {
          DEFAULT: "#10141A",
          card: "#161B22",
          line: "#252C35",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,31,29,0.06), 0 8px 24px -12px rgba(27,31,29,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
