export interface Prescription {
  id: number
  appointmentId: number
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  startDate: string
  endDate: string
  createdAt?: string
  updatedAt?: string
}
