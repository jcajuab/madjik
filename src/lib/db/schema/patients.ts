import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const patients = sqliteTable(
  "patients",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    mrn: text("mrn").notNull().unique("uniq_patients_mrn"),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    dob: text("dob"),
    sex: text("sex", {
      enum: ["Male", "Female", "Intersex", "Unknown"],
    }).notNull(),
    bloodType: text("blood_type", {
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    }),
    civilStatus: text("civil_status", {
      enum: ["Single", "Married", "Widowed", "Divorced"],
    }),
    email: text("email"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => [
    index("idx_patients_last_name").on(table.lastName),
    index("idx_patients_deleted_at").on(table.deletedAt),
    index("idx_patients_name").on(table.lastName, table.firstName),
  ],
);
