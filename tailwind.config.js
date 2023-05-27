/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            "accent": "#2AE8BA",
            "success": "#2F79E8",
            "danger": "#DC6B6B",
            "itemSelected": "#404040",
            "primary": "#404040",
            "secondary": "#6C6969",
            "slider": "#D9D9D9",
            "round": "#2AE8BA",
            "roundBorder": "#1ce0af",
            "background": "#FFFFFF",
            "logoName": "#555555",
            "nav": "#EEEEEE",
            "inputBorder": "#D9D9D9",
            "dark-primary": "#FFFFFF",
            "dark-secondary": "#D9D9D9",
            "dark-slider": "#2AE8BA",
            "dark-round": "#FFFFFF",
            "dark-roundBorder": "#D9D9D9",
            "dark-background": "#404040",
            "dark-logoName": "#FFFFFF",
            "dark-nav": "#464646",
            "dark-inputBorder": "#D9D9D9"
        },
        extend: {
        },
    },
    plugins: [],
};
