/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "book-image": "url('/src/assets/book5.png')",
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
