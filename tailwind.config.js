// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--color-main)",
        alt: "var(--color-alt)",
        "pinky-violet": "var(--color-pinky-violet)",
        "main-txt": "var(--color-main-txt)",
        "alt-txt": "var(--color-alt-txt)",
        
        L1: "var(--color-L1)",
        L2: "var(--color-L2)",
        L3: "var(--color-L3)",
        L4: "var(--color-L4)",
        L5: "var(--color-L5)",
        L6: "var(--color-L6)",
      },
    },
  },
  plugins: [],
}
