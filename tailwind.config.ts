import type { Config } from "tailwindcss";
import defaultColors from "tailwindcss/colors";

const config: Config = {
  darkMode: false,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // اینجا فقط نام رنگ‌ها را تعریف می‌کنیم
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        border: "var(--color-border)",
        shadow: "var(--color-shadow)",
        text: "var(--color-text)",
        background: "var(--color-background)",

        // تمام رنگ‌های پیشفرض Tailwind
        ...defaultColors,
      },
      fontFamily: {
        sans: ["Vazirmatn", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
