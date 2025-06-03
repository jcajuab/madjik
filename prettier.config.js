/** @type {import("prettier").Config} */
const prettierConfig = {
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-toml"],
}

export default prettierConfig
