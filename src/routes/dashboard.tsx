import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"

import { Patient } from "../types/patient"

export const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)

  const loadPatients = async () => {
    setLoading(true)
    try {
      const result = await invoke<Patient[]>("list_patients")
      setPatients(result)
    } catch (err) {
      console.error("Failed to load patients:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPatients()
  }, [])

  const handleAddPatient = async () => {
    const newPatient: Omit<Patient, "id"> = {
      firstName: "Alice",
      middleInitial: "J",
      lastName: "Smith",
      dateOfBirth: "1992-03-15",
      sex: "male",
      phoneNumber: "123-456-7890",
      emailAddress: "alice.smith@example.com",
      physicalAddress: "456 Elm Street",
      emergencyContactFirstName: "Bob",
      emergencyContactMiddleInitial: "T",
      emergencyContactLastName: "Smith",
      emergencyContactRelationship: "Brother",
      emergencyContactPhoneNumber: "321-654-0987",
    }

    try {
      await invoke<number>("create_patient", { newPatient })
      await loadPatients()
    } catch (err) {
      console.error("Failed to add patient:", err)
    }
  }

  return (
    <main className="bg-base-200 min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-5xl font-bold">Patient Dashboard</h1>
          <p className="py-4">
            View and manage patients stored locally in the Tauri backend.
          </p>
          <button className="btn btn-primary" onClick={handleAddPatient}>
            Add Dummy Patient
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : patients.length === 0 ? (
          <p className="text-center text-gray-500">No patients found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {patients.map((p) => (
              <div key={p.id} className="card bg-base-100 p-4 shadow-md">
                <div className="card-body">
                  <h2 className="card-title">
                    {p.firstName} {p.middleInitial ?? ""} {p.lastName}
                  </h2>
                  <p>DOB: {p.dateOfBirth}</p>
                  <p>Sex: {p.sex}</p>
                  <p>Address: {p.physicalAddress}</p>
                  <p>Phone: {p.phoneNumber}</p>
                  <p>Email: {p.emailAddress}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
