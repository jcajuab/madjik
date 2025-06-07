import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const phoneNumbers = sqliteTable(
  "phone_numbers",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    raw: text("raw").notNull(),
    countryCode: text("country_code").notNull(),
    countryCallingCode: text("country_calling_code").notNull(),
    e164: text("e164").notNull().unique("uniq_phone_numbers_e164"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => [index("idx_phone_numbers_deleted_at").on(table.deletedAt)],
);
