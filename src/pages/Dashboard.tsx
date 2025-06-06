import { useCallback, useEffect, useState } from "react"

import { db } from "@/lib/db"
import type { NewPatient, Patient } from "@/lib/db/types"

const dummyPatients: NewPatient[] = [
  {
    mrn: 12345678,
    firstName: "John",
    lastName: "Doe",
    sex: "Male",
    bloodType: "O+",
    civilStatus: "Married",
    email: "john.doe@example.com",
  },
  {
    mrn: 23456789,
    firstName: "Jane",
    middleName: "Doe",
    lastName: "Doe",
    sex: "Female",
    bloodType: "O-",
    civilStatus: "Married",
    email: "jane.doe@example.com",
  },
]

export function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([])

  const loadPatients = useCallback(async () => {
    const result = await db.selectFrom("patients").selectAll().where("deletedAt", "is", null).execute()
    console.log(result)
    setPatients(result)
  }, [])

  useEffect(() => {
    loadPatients()
  }, [loadPatients])

  const handleClick = async () => {
    await db.insertInto("patients").values(dummyPatients).execute()
    loadPatients()
  }

  return (
    <main className="space-y-2 p-4">
      <div className="flex justify-end">
        <button className="btn btn-wide" onClick={handleClick}>
          Add Dummy Patients
        </button>
      </div>
      <div className="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
        <table className="table-zebra table">
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>M.I.</th>
              <th>Last Name</th>
              <th>Sex</th>
              <th>Blood Type</th>
              <th>Civil Status</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <th>{patient.mrn}</th>
                <th>{patient.firstName}</th>
                <th>{patient.middleName ? `${patient.middleName[0]}.` : "N.M.I"}</th>
                <th>{patient.lastName}</th>
                <th>{patient.sex}</th>
                <th>{patient.bloodType || "N/A"}</th>
                <th>{patient.civilStatus || "N/A"}</th>
                <th>{patient.email || "N/A"}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
