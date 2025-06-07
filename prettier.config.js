/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-toml"],
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
};
