use crate::db::models::*;
use crate::db::{DbError, DbResult};
use anyhow::anyhow;
use sqlx::SqlitePool;

#[derive(Clone)]
pub struct Repository {
    pool: SqlitePool,
}

impl Repository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }

    pub async fn create_patient(&self, patient: Patient) -> DbResult<i64> {
        let result = sqlx::query(
            r#"
            INSERT INTO patients (
                first_name, middle_name, last_name, date_of_birth, sex, 
                address, phone, email, emergency_contact_name, 
                emergency_contact_relationship, emergency_contact_phone, medical_history,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"#,
        )
        .bind(patient.first_name)
        .bind(patient.middle_name)
        .bind(patient.last_name)
        .bind(patient.date_of_birth)
        .bind(patient.sex)
        .bind(patient.address)
        .bind(patient.phone)
        .bind(patient.email)
        .bind(patient.emergency_contact_name)
        .bind(patient.emergency_contact_relationship)
        .bind(patient.emergency_contact_phone)
        .bind(patient.medical_history)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_patient(&self, id: i64) -> DbResult<Option<Patient>> {
        let result = sqlx::query_as::<_, Patient>("SELECT * FROM patients WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(result)
    }

    pub async fn update_patient(&self, patient: Patient) -> DbResult<bool> {
        let id = patient.id.ok_or_else(|| anyhow!("Patient ID is required for update"))?;
        let result = sqlx::query(
            r#"
            UPDATE patients SET
                first_name = ?,
                middle_name = ?,
                last_name = ?,
                date_of_birth = ?,
                sex = ?,
                address = ?,
                phone = ?,
                email = ?,
                emergency_contact_name = ?,
                emergency_contact_relationship = ?,
                emergency_contact_phone = ?,
                medical_history = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?"#,
        )
        .bind(patient.first_name)
        .bind(patient.middle_name)
        .bind(patient.last_name)
        .bind(patient.date_of_birth)
        .bind(patient.sex)
        .bind(patient.address)
        .bind(patient.phone)
        .bind(patient.email)
        .bind(patient.emergency_contact_name)
        .bind(patient.emergency_contact_relationship)
        .bind(patient.emergency_contact_phone)
        .bind(patient.medical_history)
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn delete_patient(&self, id: i64) -> DbResult<bool> {
        let result = sqlx::query("DELETE FROM patients WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn list_patients(&self) -> DbResult<Vec<Patient>> {
        let patients =
            sqlx::query_as::<_, Patient>("SELECT * FROM patients ORDER BY last_name, first_name")
                .fetch_all(&self.pool)
                .await?;

        Ok(patients)
    }

    pub async fn create_appointment(&self, appointment: Appointment) -> DbResult<i64> {
        let result = sqlx::query(
            r#"
            INSERT INTO appointments (patient_id, scheduled_at, status, created_at, updated_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"#,
        )
        .bind(appointment.patient_id)
        .bind(appointment.scheduled_at)
        .bind(appointment.status)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_appointment(&self, id: i64) -> DbResult<Option<Appointment>> {
        let result = sqlx::query_as::<_, Appointment>("SELECT * FROM appointments WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(result)
    }

    pub async fn update_appointment(&self, appointment: Appointment) -> DbResult<bool> {
        let id = appointment.id.ok_or_else(|| anyhow!("Appointment ID is required for update"))?;
        let result = sqlx::query(
            r#"
            UPDATE appointments SET
                patient_id = ?,
                scheduled_at = ?,
                status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?"#,
        )
        .bind(appointment.patient_id)
        .bind(appointment.scheduled_at)
        .bind(appointment.status)
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn delete_appointment(&self, id: i64) -> DbResult<bool> {
        let result = sqlx::query("DELETE FROM appointments WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn list_patient_appointments(&self, patient_id: i64) -> DbResult<Vec<Appointment>> {
        let appointments = sqlx::query_as::<_, Appointment>(
            "SELECT * FROM appointments WHERE patient_id = ? ORDER BY scheduled_at",
        )
        .bind(patient_id)
        .fetch_all(&self.pool)
        .await?;

        Ok(appointments)
    }

    pub async fn create_doctor_note(&self, note: DoctorNote) -> DbResult<i64> {
        let result = sqlx::query(
            r#"
            INSERT INTO doctor_notes (appointment_id, content, created_at, updated_at)
            VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"#,
        )
        .bind(note.appointment_id)
        .bind(note.content)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_doctor_note(&self, id: i64) -> DbResult<Option<DoctorNote>> {
        let result = sqlx::query_as::<_, DoctorNote>("SELECT * FROM doctor_notes WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(result)
    }

    pub async fn update_doctor_note(&self, note: DoctorNote) -> DbResult<bool> {
        let id = note.id.ok_or_else(|| anyhow!("Doctor note ID is required for update"))?;
        let result = sqlx::query(
            r#"
            UPDATE doctor_notes SET
                appointment_id = ?,
                content = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?"#,
        )
        .bind(note.appointment_id)
        .bind(note.content)
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn delete_doctor_note(&self, id: i64) -> DbResult<bool> {
        let result = sqlx::query("DELETE FROM doctor_notes WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn list_appointment_notes(&self, appointment_id: i64) -> DbResult<Vec<DoctorNote>> {
        let notes = sqlx::query_as::<_, DoctorNote>(
            "SELECT * FROM doctor_notes WHERE appointment_id = ? ORDER BY created_at",
        )
        .bind(appointment_id)
        .fetch_all(&self.pool)
        .await?;

        Ok(notes)
    }

    pub async fn create_prescription(&self, prescription: Prescription) -> DbResult<i64> {
        let result = sqlx::query(
            r#"
            INSERT INTO prescriptions (
                appointment_id, medication_name, dosage, frequency, duration,
                start_date, end_date, instructions, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"#,
        )
        .bind(prescription.appointment_id)
        .bind(prescription.medication_name)
        .bind(prescription.dosage)
        .bind(prescription.frequency)
        .bind(prescription.duration)
        .bind(prescription.start_date)
        .bind(prescription.end_date)
        .bind(prescription.instructions)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_prescription(&self, id: i64) -> DbResult<Option<Prescription>> {
        let result = sqlx::query_as::<_, Prescription>("SELECT * FROM prescriptions WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(result)
    }

    pub async fn update_prescription(&self, prescription: Prescription) -> DbResult<bool> {
        let id = prescription.id.ok_or_else(|| anyhow!("Prescription ID is required for update"))?;
        let result = sqlx::query(
            r#"
            UPDATE prescriptions SET
                appointment_id = ?,
                medication_name = ?,
                dosage = ?,
                frequency = ?,
                duration = ?,
                start_date = ?,
                end_date = ?,
                instructions = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?"#,
        )
        .bind(prescription.appointment_id)
        .bind(prescription.medication_name)
        .bind(prescription.dosage)
        .bind(prescription.frequency)
        .bind(prescription.duration)
        .bind(prescription.start_date)
        .bind(prescription.end_date)
        .bind(prescription.instructions)
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn delete_prescription(&self, id: i64) -> DbResult<bool> {
        let result = sqlx::query("DELETE FROM prescriptions WHERE id = ?")
            .bind(id)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected() > 0)
    }

    pub async fn list_appointment_prescriptions(
        &self,
        appointment_id: i64,
    ) -> DbResult<Vec<Prescription>> {
        let prescriptions = sqlx::query_as::<_, Prescription>(
            "SELECT * FROM prescriptions WHERE appointment_id = ? ORDER BY created_at",
        )
        .bind(appointment_id)
        .fetch_all(&self.pool)
        .await?;

        Ok(prescriptions)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{NaiveDate, Utc};
    use sqlx::SqlitePool;

    async fn create_test_repo() -> Repository {
        let pool = SqlitePool::connect("sqlite::memory:")
            .await
            .expect("Failed to create test database");

        sqlx::migrate!("./migrations")
            .run(&pool)
            .await
            .expect("Failed to run migrations");

        Repository::new(pool)
    }

    #[tokio::test]
    async fn test_patient_crud() {
        let repo = create_test_repo().await;

        let patient = Patient {
            id: None,
            first_name: "John".to_string(),
            middle_name: Some("Doe".to_string()),
            last_name: "Smith".to_string(),
            date_of_birth: NaiveDate::from_ymd_opt(1990, 1, 1).unwrap(),
            sex: "male".to_string(),
            address: "123 Main St".to_string(),
            phone: "555-1234".to_string(),
            email: "john.smith@example.com".to_string(),
            emergency_contact_name: Some("Jane Smith".to_string()),
            emergency_contact_relationship: Some("Spouse".to_string()),
            emergency_contact_phone: Some("555-5678".to_string()),
            medical_history: Some("No known allergies".to_string()),
            created_at: None,
        };

        let id = repo.create_patient(patient).await.unwrap();
        assert!(id > 0);

        let patient = repo.get_patient(id).await.unwrap().unwrap();
        assert_eq!(patient.first_name, "John");
        assert_eq!(patient.last_name, "Smith");

        let mut updated = patient.clone();
        updated.phone = "555-4321".to_string();
        let success = repo.update_patient(updated).await.unwrap();
        assert!(success);

        let updated_patient = repo.get_patient(id).await.unwrap().unwrap();
        assert_eq!(updated_patient.phone, "555-4321");

        let patients = repo.list_patients().await.unwrap();
        assert_eq!(patients.len(), 1);

        let deleted = repo.delete_patient(id).await.unwrap();
        assert!(deleted);

        let patient = repo.get_patient(id).await.unwrap();
        assert!(patient.is_none());
    }
}
