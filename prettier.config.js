/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  tabWidth: 2,
  trailingComma: "all",
  semi: false,
  plugins: ["prettier-plugin-toml", "prettier-plugin-tailwindcss"],
}

export default prettierConfig
