import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const addresses = sqliteTable(
  "addresses",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    street: text("street"),
    barangay: text("barangay"),
    cityMunicipality: text("city_municipality").notNull(),
    province: text("province").notNull(),
    region: text("region").notNull(),
    zipCode: text("zip_code").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => [
    index("idx_addresses_city_municipality").on(table.cityMunicipality),
    index("idx_addresses_province").on(table.province),
    index("idx_addresses_deleted_at").on(table.deletedAt),
  ],
);
