import type { GeneratedAlways, Insertable, Selectable, Updateable } from "kysely"

/**
 * Represents the database schema with camelCased table names, as transformed by Kysely's CamelCasePlugin.
 */
export interface CamelCasedDatabase {
  patients: PatientTable
}

interface PatientTable {
  id: GeneratedAlways<number>
  mrn: number
  firstName: string
  middleName: string | null
  lastName: string | null
  sex: "Male" | "Female" | "Intersex" | "Unknown"
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | null
  civilStatus: "Single" | "Married" | "Widowed" | "Divorced" | null
  email: string | null
  createdAt: GeneratedAlways<string>
  updatedAt: string | null
  deletedAt: string | null
}

export type Patient = Selectable<PatientTable>
export type NewPatient = Insertable<PatientTable>
export type PatientUpdate = Updateable<PatientTable>
