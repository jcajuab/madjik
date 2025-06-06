import Database from "@tauri-apps/plugin-sql"
import { CamelCasePlugin, Kysely } from "kysely"
import { TauriSqliteDialect } from "kysely-dialect-tauri"

import type { CamelCasedDatabase } from "@/lib/db/types"

export const db = new Kysely<CamelCasedDatabase>({
  dialect: new TauriSqliteDialect({
    database: (prefix) => Database.load(`${prefix}madjik.db`),
  }),
  plugins: [new CamelCasePlugin()],
})
