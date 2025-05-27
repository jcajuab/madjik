export type Sex = "male" | "female"

export interface Patient {
  id: number
  firstName: string
  middleInitial?: string
  lastName: string
  dateOfBirth: string
  sex: Sex
  physicalAddress: string
  phoneNumber: string
  emailAddress: string
  emergencyContactFirstName?: string
  emergencyContactMiddleInitial?: string
  emergencyContactLastName?: string
  emergencyContactRelationship?: string
  emergencyContactPhoneNumber?: string
  medicalHistory?: string
  createdAt?: string
  updatedAt?: string
}

export interface Appointment {
  id: number
  patientId: number
  scheduledAt: string
  status: string
  createdAt?: string
  updatedAt?: string
}

export interface DoctorNote {
  id: number
  appointmentId: number
  content: string
  createdAt?: string
  updatedAt?: string
}

export interface Prescription {
  id: number
  appointmentId: number
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  startDate: string
  endDate: string
  instructions?: string
  createdAt?: string
  updatedAt?: string
}
