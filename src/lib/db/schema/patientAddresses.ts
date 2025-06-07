import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { addresses } from "./addresses";
import { patients } from "./patients";

export const patientAddresses = sqliteTable(
  "patient_addresses",
  {
    patientId: integer("patient_id").references(() => patients.id, {
      onDelete: "cascade",
    }),
    addressId: integer("address_id").references(() => addresses.id, {
      onDelete: "cascade",
    }),
    isPrimary: integer("is_primary", { mode: "boolean" }).notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
  },
  (table) => [
    primaryKey({ columns: [table.patientId, table.addressId] }),
    index("idx_patient_addresses_primary").on(table.patientId, table.isPrimary),
  ],
);
