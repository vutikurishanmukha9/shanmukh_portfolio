/**
 * Tailwind CSS Configuration
 * Custom theme with CSS variable-based colors for light/dark mode support
 */

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
        head: ['"Archivo Black"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Archivo Black"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        syne: ['"Syne"', 'sans-serif'],
        signature: ['var(--font-signature)', 'Caveat', 'cursive'],
      },
      boxShadow: {
        xs: "var(--shadow-xs, 1px 1px 0 0 var(--border))",
        sm: "var(--shadow-sm, 2px 2px 0 0 var(--border))",
        DEFAULT: "var(--shadow, 3px 3px 0 0 var(--border))",
        md: "var(--shadow-md, 4px 4px 0 0 var(--border))",
        lg: "var(--shadow-lg, 6px 6px 0 0 var(--border))",
        xl: "var(--shadow-xl, 10px 10px 0 1px var(--border))",
        "2xl": "var(--shadow-2xl, 16px 16px 0 1px var(--border))",
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
        teal: {
          primary: "hsl(var(--teal-primary, 174 60% 51%))",
          light: "hsl(var(--teal-light, 174 60% 80%))",
          accent: "hsl(var(--teal-accent, 174 80% 40%))",
        },
        slate: {
          primary: "hsl(var(--slate-primary, 215 16% 47%))",
          light: "hsl(var(--slate-light, 215 16% 75%))",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius, 0px)",
        none: "0px",
        lg: "var(--radius, 0px)",
        md: "calc(var(--radius, 0px) - 2px)",
        sm: "calc(var(--radius, 0px) - 4px)",
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
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        highlight: "highlight 0.6s ease forwards",
        flash: "flash 0.6s ease forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
