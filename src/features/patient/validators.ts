import { z } from "zod/v4";

export const patientFormSchema = z.object({
  firstName: z
    .string("Must be a string")
    .trim()
    .nonempty("Should not be empty")
    .max(100),
  lastName: z.string().trim().nonempty().nonempty().max(100),
  dob: z.iso.date("Should not be empty").transform((val, ctx) => {
    try {
      return new Date(val).toISOString();
    } catch {
      ctx.issues.push({
        code: "custom",
        message: "Must be a date",
        input: val,
      });

      return z.NEVER;
    }
  }),
  sex: z.enum(["Male", "Female", "Intersex", "Unknown"]),
  bloodType: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  civilStatus: z.enum(["Single", "Married", "Widowed", "Divorced"]).optional(),
  email: z.email().optional(),
});

export type PatientFormValue = z.infer<typeof patientFormSchema>;
export type PatientFormField = keyof PatientFormValue;
