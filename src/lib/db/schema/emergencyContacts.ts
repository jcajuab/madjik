import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { patients } from "./patients";

export const emergencyContacts = sqliteTable(
  "emergency_contacts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    patientId: integer("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    relationship: text("relationship").notNull(),
    email: text("email"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => [
    index("idx_emergency_contacts_last_name").on(table.lastName),
    index("idx_emergency_contacts_deleted_at").on(table.deletedAt),
    index("idx_emergency_contacts_name").on(table.lastName, table.firstName),
  ],
);
