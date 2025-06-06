import { sql } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const patients = sqliteTable(
  "patients",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    mrn: integer("mrn").notNull().unique("uniq_patients_mrn"),
    firstName: text("first_name").notNull(),
    middleName: text("middle_name"),
    lastName: text("last_name"),
    sex: text("sex", { enum: ["Male", "Female", "Intersex", "Unknown"] }).notNull(),
    bloodType: text("blood_type", { enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] }),
    civilStatus: text("civil_status", { enum: ["Single", "Married", "Widowed", "Divorced"] }),
    email: text("email"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => [
    index("idx_patients_sex").on(table.sex),
    index("idx_patients_blood_type").on(table.bloodType),
    index("idx_patients_deleted_at").on(table.deletedAt),
  ],
)
