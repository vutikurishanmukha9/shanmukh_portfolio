import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        head: ['"Cabinet Grotesk"', '"Outfit"', '"Geist"', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Outfit"', '"Geist"', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        sans: ['"Satoshi"', '"Plus Jakarta Sans"', '"Geist"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        grotesk: ['"Cabinet Grotesk"', '"Outfit"', '"Geist"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        none: "none",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          hover: "var(--secondary-hover)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius, 0.75rem)",
        none: "0px",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        lg: "var(--radius, 0.75rem)",
        xl: "calc(var(--radius, 0.75rem) + 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      keyframes: {
        highlight: {
          "0%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "var(--highlight)" },
        },
        flash: {
          "0%": { backgroundColor: "hsl(var(--card))" },
          "50%": { backgroundColor: "var(--highlight)" },
          "100%": { backgroundColor: "hsl(var(--card))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap, 1rem)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap, 1rem)))" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100% - 1rem), 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
      },
      animation: {
        highlight: "highlight 0.6s ease forwards",
        flash: "flash 0.6s ease forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration, 30s) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration, 30s) linear infinite",
        "border-beam": "border-beam calc(var(--duration, 15) * 1s) infinite linear",
        "shimmer-slide": "shimmer-slide var(--speed, 3s) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed, 3s) * 2) infinite linear",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
