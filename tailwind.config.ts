import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FFFFFF",
          dim: "#F0F4F8",
        },
        ink: {
          DEFAULT: "#0A1628",
          soft: "#2D4263",
          faint: "#6B84A3",
        },
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#0077B6",
          600: "#005F92",
          700: "#004A75",
          800: "#003559",
          900: "#002140",
        },
        sky: {
          DEFAULT: "#48CAE4",
          soft: "#ADE8F4",
          deep: "#0096C7",
        },
        gold: {
          DEFAULT: "#F4A261",
          soft: "#FDDCBC",
          deep: "#E76F1F",
        },
        rust: {
          DEFAULT: "#E63946",
          soft: "#FBBFC3",
        },
        night: {
          DEFAULT: "#0A1628",
          card: "#112240",
          line: "#1D3461",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,119,182,0.06), 0 8px 24px -12px rgba(0,119,182,0.12)",
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