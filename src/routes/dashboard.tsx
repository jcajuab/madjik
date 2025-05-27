import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AddPatientModal } from "../components/AddPatientModal"
import { PatientTable } from "../components/PatientTable"
import { Patient } from "../types"

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
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Patient Management
            </h1>
            <p className="text-gray-600">
              Manage patient records and appointments
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/demo"
              className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              View Demo
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Add Patient
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search patients by name..."
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                {searchName
                  ? "No matching patients found"
                  : "No patients found"}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Add Your First Patient
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <PatientTable patients={filteredPatients} />
            </div>
          )}
        </div>
      </div>

      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
      />
    </main>
  )
}
