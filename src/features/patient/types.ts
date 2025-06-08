import type { Insertable, Selectable, Updateable } from "kysely";

import type { Patients } from "@/types/db";

export type Patient = Selectable<Patients>;
export type NewPatient = Insertable<Patients>;
export type PatientUpdate = Updateable<Patients>;
