/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#eeece4",
        "paper-2": "#e4e1d7",
        ink: "#191a17",
        muted: "#6d6c63",
        orange: "#ff4c25",
        lime: "#d8f36a",
        blue: "#b8c9fc",
        line: "rgba(25,26,23,.19)",
      },
      fontFamily: {
        sans: ["DM Sans", "Arial", "sans-serif"],
        mono: ["DM Mono", "monospace"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
