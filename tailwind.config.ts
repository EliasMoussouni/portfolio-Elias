import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f7fa",
          100: "#e9eef5",
          500: "#3b82f6",
          700: "#1d4ed8",
          900: "#0f172a"
        }
      }
    }
  },
  plugins: []
};

export default config;
