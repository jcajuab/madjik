import Database from "@tauri-apps/plugin-sql";
import { CamelCasePlugin, Kysely } from "kysely";
import { TauriSqliteDialect } from "kysely-dialect-tauri";

import type { DB } from "@/types/db";

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: (prefix) => Database.load(`${prefix}madjik.db`),
  }),
  plugins: [new CamelCasePlugin()],
});
