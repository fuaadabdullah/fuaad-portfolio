import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F13",
        coal: "#0f172a",
        accent: "#16a34a"
      }
    }
  },
  plugins: []
};
export default config;
