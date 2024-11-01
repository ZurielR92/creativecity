import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/input.js",
    "./node_modules/@nextui-org/theme/dist/components/progress.js",
    "./node_modules/@nextui-org/theme/dist/components/select.js",
    "./node_modules/@nextui-org/theme/dist/components/checkbox.js",
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
