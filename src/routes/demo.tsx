import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"

import { Appointment, DoctorNote, Patient, Prescription } from "../types/barrel"

export const Demo = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)
  const [doctorNotes, setDoctorNotes] = useState<DoctorNote[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState({
    patients: false,
    appointments: false,
    notes: false,
    prescriptions: false,
  })

  // Load all patients
  const loadPatients = async () => {
    setLoading((prev) => ({ ...prev, patients: true }))
    try {
      const result = await invoke<Patient[]>("list_patients")
      setPatients(result)
    } catch (err) {
      console.error("Failed to load patients:", err)
    } finally {
      setLoading((prev) => ({ ...prev, patients: false }))
    }
  }

  // Load appointments for selected patient
  const loadAppointments = async (patientId: number) => {
    if (!patientId) return
    setLoading((prev) => ({ ...prev, appointments: true }))
    try {
      const result = await invoke<Appointment[]>("list_patient_appointments", {
        patientId,
      })
      setAppointments(result)
      setSelectedAppointment(null)
      setDoctorNotes([])
      setPrescriptions([])
    } catch (err) {
      console.error("Failed to load appointments:", err)
    } finally {
      setLoading((prev) => ({ ...prev, appointments: false }))
    }
  }

  // Load doctor notes and prescriptions for selected appointment
  const loadAppointmentDetails = async (appointmentId: number) => {
    if (!appointmentId) return

    // Load doctor notes
    setLoading((prev) => ({ ...prev, notes: true }))
    try {
      const notes = await invoke<DoctorNote[]>("get_doctor_notes", {
        appointmentId,
      })
      setDoctorNotes(notes)
    } catch (err) {
      console.error("Failed to load doctor notes:", err)
    } finally {
      setLoading((prev) => ({ ...prev, notes: false }))
    }

    // Load prescriptions
    setLoading((prev) => ({ ...prev, prescriptions: true }))
    try {
      const scripts = await invoke<Prescription[]>("get_prescriptions", {
        appointmentId,
      })
      setPrescriptions(scripts)
    } catch (err) {
      console.error("Failed to load prescriptions:", err)
    } finally {
      setLoading((prev) => ({ ...prev, prescriptions: false }))
    }
  }

  // Handle patient selection
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    loadAppointments(patient.id)
  }

  // Handle appointment selection
  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    loadAppointmentDetails(appointment.id)
  }

  // Load patients on component mount
  useEffect(() => {
    loadPatients()
  }, [])

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">EHR Demo</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Patients List */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Patients</h2>
          {loading.patients ? (
            <div>Loading patients...</div>
          ) : (
            <div className="space-y-2">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`cursor-pointer rounded p-3 ${
                    selectedPatient?.id === patient.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectPatient(patient)}
                >
                  {patient.firstName} {patient.lastName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Appointments List */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Appointments</h2>
          {!selectedPatient ? (
            <div>Select a patient to view appointments</div>
          ) : loading.appointments ? (
            <div>Loading appointments...</div>
          ) : (
            <div className="space-y-2">
              {appointments.length === 0 ? (
                <div>No appointments found</div>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`cursor-pointer rounded p-3 ${
                      selectedAppointment?.id === appointment.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    {new Date(appointment.scheduledAt).toLocaleString()}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Appointment Details */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">Appointment Details</h2>
          {!selectedAppointment ? (
            <div>Select an appointment to view details</div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Doctor&apos;s Notes</h3>
                {loading.notes ? (
                  <div>Loading notes...</div>
                ) : doctorNotes.length > 0 ? (
                  <div className="mt-2 rounded bg-gray-50 p-3">
                    {doctorNotes.map((note) => (
                      <p key={note.id}>{note.content}</p>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 text-gray-500">No notes available</div>
                )}
              </div>

              <div>
                <h3 className="font-semibold">Prescriptions</h3>
                {loading.prescriptions ? (
                  <div>Loading prescriptions...</div>
                ) : prescriptions.length > 0 ? (
                  <div className="mt-2 space-y-2">
                    {prescriptions.map((script) => (
                      <div key={script.id} className="rounded bg-gray-50 p-3">
                        <div className="font-medium">
                          {script.medicationName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {script.dosage} - {script.frequency} for{" "}
                          {script.duration}
                        </div>
                        {script.instructions && (
                          <div className="mt-1 text-sm text-gray-500">
                            Instructions: {script.instructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 text-gray-500">No prescriptions</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Demo
