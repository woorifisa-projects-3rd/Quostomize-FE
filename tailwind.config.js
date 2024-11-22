/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: '#ed3ef7',
        black: '#000000',
        red: '#ff0000',
        green: '#bcdc33',
        milk: '#dbdbdb',
      },
    },
  },
  plugins: [],
};
