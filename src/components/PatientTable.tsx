import { Patient } from "../types/patient"

interface PatientTableProps {
  patients: Patient[]
}

const calculateAge = (birthDate: string) => {
  const today = new Date()
  const birthDateObj = new Date(birthDate)
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const monthDiff = today.getMonth() - birthDateObj.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--
  }
  return age
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Middle Initial</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Last Visit</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p, index) => {
          return (
            <tr key={p.id} className="hover:bg-base-300">
              <th>{index + 1}</th>
              <td>
                <div className="font-medium">{p.firstName}</div>
              </td>
              <td>
                <div className="font-medium">{p.middleInitial}</div>
              </td>
              <td>
                <div className="font-medium">{p.lastName}</div>
              </td>
              <td>{p.dateOfBirth ? calculateAge(p.dateOfBirth) : "-"} years</td>
              <td>-</td> {/* Placeholder for last visit data */}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
