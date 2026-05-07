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
                brand: {
                    // ArtisanCookware premium palette: Bold red & black with gold accents
                    primary: "#B71C1C", // Signature red from logo
                    red: "#B71C1C",
                    dark: "#111111", // Deep black from logo
                    black: "#111111",
                    gold: "#D4AF37", // Premium gold accent
                    accent: "#D4AF37",
                    // Extended palette
                    "red-hover": "#8B1414", // Darker red for hover states
                    "red-light": "#E53935", // Lighter red for backgrounds
                    "gold-hover": "#C5A028", // Darker gold for hover
                    // Neutral backgrounds
                    bg: "#F9F9F9",
                    surface: "#FFFFFF",
                    muted: "#F5F5F5"
                },
                text: {
                    heading: "#000000",
                    body: "#333333",
                    muted: "#666666",
                    light: "#999999"
                },
                background: {
                    soft: "#F9F9F9",
                    white: "#FFFFFF",
                    dark: "#111111"
                }
            },
            boxShadow: {
                // Premium shadows using brand red and black tones
                glow: "0 25px 45px -20px rgba(183, 28, 28, 0.3)", // Red glow
                "glow-gold": "0 20px 40px -15px rgba(212, 175, 55, 0.25)", // Gold glow
                premium: "0 20px 60px -15px rgba(17, 17, 17, 0.12), 0 10px 20px -10px rgba(183, 28, 28, 0.08)",
                card: "0 4px 20px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
                "card-hover": "0 12px 40px -8px rgba(183, 28, 28, 0.15), 0 6px 16px -4px rgba(0, 0, 0, 0.1)",
                elegant: "0 8px 32px -4px rgba(17, 17, 17, 0.1)",
                "inner-soft": "inset 0 2px 8px rgba(0, 0, 0, 0.06)"
            },
            fontFamily: {
                heading: ["'Inter'", "'Poppins'", "'Source Sans Pro'", "sans-serif"],
                body: ["'Inter'", "'Source Sans Pro'", "sans-serif"],
                display: ["'Poppins'", "'Inter'", "sans-serif"],
                mono: ["'JetBrains Mono'", "monospace"]
            },
            fontSize: {
                "display": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "hero": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
            },
            spacing: {
                "18": "4.5rem",
                "88": "22rem",
                "112": "28rem",
                "128": "32rem"
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem"
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.7s ease-out",
                "scale-in": "scaleIn 0.5s ease-out"
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" }
                },
                slideUp: {
                    "0%": { transform: "translateY(30px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" }
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" }
                }
            }
        }
    },
    plugins: []
};

export default config;
