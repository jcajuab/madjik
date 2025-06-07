import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { emergencyContacts } from "./emergencyContacts";
import { phoneNumbers } from "./phoneNumbers";

export const emergencyContactPhoneNumbers = sqliteTable(
  "emergency_contact_phone_numbers",
  {
    emergencyContactId: integer("emergency_contact_id").references(
      () => emergencyContacts.id,
      { onDelete: "cascade" },
    ),
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
    primaryKey({ columns: [table.emergencyContactId, table.phoneNumberId] }),
    index("idx_emergency_contact_phone_numbers_primary").on(
      table.emergencyContactId,
      table.isPrimary,
    ),
  ],
);
