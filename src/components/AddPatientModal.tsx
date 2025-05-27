import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Patient } from "../types/patient"

const patientFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleInitial: z.string().max(1).optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  sex: z.enum(["male", "female"]),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  physicalAddress: z
    .string()
    .min(1, { message: "Physical address is required" }),
  emergencyContactFirstName: z.string().optional(),
  emergencyContactMiddleInitial: z.string().max(1).optional(),
  emergencyContactLastName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhoneNumber: z.string().optional(),
})

type PatientFormData = z.infer<typeof patientFormSchema>

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (patient: Omit<Patient, "id">) => void
}

export const AddPatientModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddPatientModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: "",
      middleInitial: "",
      lastName: "",
      dateOfBirth: "",
      sex: "male",
      phoneNumber: "",
      emailAddress: "",
      physicalAddress: "",
      emergencyContactFirstName: "",
      emergencyContactMiddleInitial: "",
      emergencyContactLastName: "",
      emergencyContactRelationship: "",
      emergencyContactPhoneNumber: "",
    },
  })

  const onFormSubmit = async (data: PatientFormData) => {
    try {
      setIsSubmitting(true)
      const validatedData = patientFormSchema.parse(data)
      await onSubmit(validatedData as Omit<Patient, "id">)
      onClose()
      reset()
    } catch (error) {
      console.error("Form submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold">Add New Patient</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                {...register("firstName")}
                className={`input input-bordered w-full ${errors.firstName ? "input-error" : ""}`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Middle Initial</span>
              </label>
              <input
                type="text"
                {...register("middleInitial")}
                className="input input-bordered w-full"
                maxLength={1}
                placeholder="Middle initial"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                {...register("lastName")}
                className={`input input-bordered w-full ${errors?.lastName ? "input-error" : ""}`}
                placeholder="Enter last name"
              />
              {errors?.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.lastName.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className={`input input-bordered w-full pl-10 ${errors.dateOfBirth ? "input-error" : ""}`}
                />
                {errors.dateOfBirth && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.dateOfBirth.message}
                    </span>
                  </label>
                )}
                <span className="absolute top-1/2 left-3 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Sex</span>
              </label>
              <select
                {...register("sex")}
                className={`select select-bordered w-full ${errors.sex ? "select-error" : ""}`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="divider">Contact Information</div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                {...register("phoneNumber")}
                className={`input input-bordered w-full ${errors.phoneNumber ? "input-error" : ""}`}
                required
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.phoneNumber.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                {...register("emailAddress")}
                className={`input input-bordered w-full ${errors.emailAddress ? "input-error" : ""}`}
                placeholder="Enter email address"
              />
              {errors.emailAddress && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.emailAddress.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control col-span-full w-full">
              <label className="label">
                <span className="label-text">Physical Address</span>
              </label>
              <input
                type="text"
                {...register("physicalAddress")}
                className={`input input-bordered w-full ${errors.physicalAddress ? "input-error" : ""}`}
                placeholder="Enter physical address"
              />
              {errors.physicalAddress && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.physicalAddress.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="divider">Emergency Contact</div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                {...register("emergencyContactFirstName")}
                className="input input-bordered w-full"
                placeholder="Enter first name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Middle Initial</span>
              </label>
              <input
                type="text"
                {...register("emergencyContactMiddleInitial")}
                className="input input-bordered w-full"
                maxLength={1}
                placeholder="Middle initial"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                {...register("emergencyContactLastName")}
                className="input input-bordered w-full"
                placeholder="Enter last name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Relationship</span>
              </label>
              <input
                type="text"
                {...register("emergencyContactRelationship")}
                className="input input-bordered w-full"
                placeholder="Enter relationship"
              />
            </div>
            <div className="form-control col-span-full w-full">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                {...register("emergencyContactPhoneNumber")}
                className="input input-bordered w-full"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Patient"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  )
}
