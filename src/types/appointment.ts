export interface Appointment {
  id: number
  patientId: number
  scheduledAt: string
  status: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}
