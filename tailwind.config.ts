import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                ink: {
                    DEFAULT: "#0D0D0D",
                    60: "rgba(13,13,13,0.6)",
                    20: "rgba(13,13,13,0.12)",
                },
                parchment: "#F7F4EF",
                gold: {
                    DEFAULT: "#B8963C",
                    light: "#D4AF60",
                    pale: "#F5EDD6",
                },
                brand: {
                    red: "#9B1C1C",
                    "red-hover": "#7B1515",
                }
            },
            fontFamily: {
                heading: ["Cormorant Garamond", "Georgia", "serif"],
                body: ["DM Sans", "sans-serif"],
                mono: ["DM Mono", "monospace"],
            },
            fontSize: {
                "display": ["clamp(48px, 5.5vw, 80px)", { lineHeight: "1.0", letterSpacing: "-0.01em", fontWeight: "300" }],
                "hero":    ["clamp(36px, 4vw, 60px)",  { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "300" }],
                "section": ["clamp(32px, 3.5vw, 52px)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "300" }],
            },
            animation: {
                "fade-up": "fadeUp 0.7s ease forwards",
                "fade-up-d1": "fadeUp 0.7s 0.1s ease both",
                "fade-up-d2": "fadeUp 0.7s 0.2s ease both",
                "fade-up-d3": "fadeUp 0.7s 0.35s ease both",
                "fade-up-d4": "fadeUp 0.7s 0.5s ease both",
            },
            keyframes: {
                fadeUp: {
                    "0%":   { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            boxShadow: {
                card: "0 2px 16px rgba(13,13,13,0.06)",
                "card-hover": "0 8px 32px rgba(13,13,13,0.12)",
            },
        }
    },
    plugins: [],
};

export default config;
