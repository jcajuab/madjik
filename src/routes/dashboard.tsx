import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"

import { AddPatientModal } from "../components/AddPatientModal"
import { PatientTable } from "../components/PatientTable"
import { Patient } from "../types/patient"

export const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])

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

  const handleAddPatient = async (patient: Omit<Patient, "id">) => {
    try {
      await invoke<number>("create_patient", { newPatient: patient })
      await loadPatients()
    } catch (err) {
      console.error("Failed to add patient:", err)
    }
  }

  useEffect(() => {
    loadPatients()
  }, [])

  useEffect(() => {
    if (!searchName.trim()) {
      setFilteredPatients(patients)
      return
    }
    const results = patients.filter((patient) => {
      return (
        patient.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchName.toLowerCase())
      )
    })

    setFilteredPatients(results)
  }, [searchName, patients])

  return (
    <main className="bg-base-200 min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="flex h-fit flex-row items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">Patient Dashboard</h1>
              <p className="text-lg">
                View and manage patients stored locally in the Tauri backend.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Patient
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const dummy: Omit<Patient, "id"> = {
                    firstName: "John",
                    middleInitial: "D",
                    lastName: "Doe",
                    dateOfBirth: "1990-01-01",
                    sex: "male",
                    phoneNumber: "1234567890",
                    emailAddress: "john.doe@example.com",
                    physicalAddress: "123 Main St",
                    emergencyContactFirstName: "Jane",
                    emergencyContactMiddleInitial: "E",
                    emergencyContactLastName: "Doe",
                    emergencyContactRelationship: "Spouse",
                    emergencyContactPhoneNumber: "0987654321",
                  }
                  await invoke<number>("create_patient", { newPatient: dummy })
                  await loadPatients()
                }}
              >
                Add Dummy Patient
              </button>
            </div>
            <AddPatientModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddPatient}
            />
          </div>
          <div className="py-4">
            <input
              className="input input-bordered w-full"
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search patients..."
            />
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredPatients.length === 0 ? (
          <p className="text-center text-gray-500">No patients found.</p>
        ) : (
          <div className="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
            <PatientTable patients={filteredPatients} />
          </div>
        )}
      </div>
    </main>
  )
}
