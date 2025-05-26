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
}
