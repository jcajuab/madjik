import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { patients } from "./patients";
import { phoneNumbers } from "./phoneNumbers";

export const patientPhoneNumbers = sqliteTable(
  "patient_phone_numbers",
  {
    patientId: integer("patient_id").references(() => patients.id, {
      onDelete: "cascade",
    }),
    phoneNumberId: integer("phone_number_id").references(
      () => phoneNumbers.id,
      { onDelete: "cascade" },
    ),
    isPrimary: integer("is_primary", { mode: "boolean" }).notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
  },
  (table) => [
    primaryKey({ columns: [table.patientId, table.phoneNumberId] }),
    index("idx_patient_phone_numbers_primary").on(
      table.patientId,
      table.isPrimary,
    ),
  ],
);
