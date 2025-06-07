import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { addresses } from "./addresses";
import { emergencyContacts } from "./emergencyContacts";

export const emergencyContactAddresses = sqliteTable(
  "emergency_contact_addresses",
  {
    emergencyContactId: integer("emergency_contact_id").references(
      () => emergencyContacts.id,
      { onDelete: "cascade" },
    ),
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
    primaryKey({ columns: [table.emergencyContactId, table.addressId] }),
    index("idx_emergency_contact_addresses_primary").on(
      table.emergencyContactId,
      table.isPrimary,
    ),
  ],
);
