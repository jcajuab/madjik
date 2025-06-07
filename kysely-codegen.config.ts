import type { Config } from "kysely-codegen";

export default {
  camelCase: true,
  dialect: "sqlite",
  excludePattern: "_sqlx_migrations",
  outFile: "./src/types/db.d.ts",
} satisfies Config;
