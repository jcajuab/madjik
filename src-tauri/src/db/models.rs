use chrono::{DateTime, NaiveDate, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Patient {
    pub id: Option<i64>,
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String,
    pub date_of_birth: NaiveDate,
    pub sex: String,
    pub address: String,
    pub phone: String,
    pub email: String,
    pub emergency_contact_name: Option<String>,
    pub emergency_contact_relationship: Option<String>,
    pub emergency_contact_phone: Option<String>,
    pub medical_history: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Appointment {
    pub id: Option<i64>,
    pub patient_id: i64,
    pub scheduled_at: DateTime<Utc>,
    pub status: String,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DoctorNote {
    pub id: Option<i64>,
    pub appointment_id: i64,
    pub content: String,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Prescription {
    pub id: Option<i64>,
    pub appointment_id: i64,
    pub medication_name: String,
    pub dosage: String,
    pub frequency: String,
    pub duration: String,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub instructions: Option<String>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatePatient {
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String,
    pub date_of_birth: NaiveDate,
    pub sex: String,
    pub address: String,
    pub phone: String,
    pub email: String,
    pub emergency_contact_name: Option<String>,
    pub emergency_contact_relationship: Option<String>,
    pub emergency_contact_phone: Option<String>,
    pub medical_history: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdatePatient {
    pub id: i64,
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String,
    pub date_of_birth: NaiveDate,
    pub sex: String,
    pub address: String,
    pub phone: String,
    pub email: String,
    pub emergency_contact_name: Option<String>,
    pub emergency_contact_relationship: Option<String>,
    pub emergency_contact_phone: Option<String>,
    pub medical_history: Option<String>,
}

impl From<CreatePatient> for Patient {
    fn from(create: CreatePatient) -> Self {
        Self {
            id: None,
            first_name: create.first_name,
            middle_name: create.middle_name,
            last_name: create.last_name,
            date_of_birth: create.date_of_birth,
            sex: create.sex,
            address: create.address,
            phone: create.phone,
            email: create.email,
            emergency_contact_name: create.emergency_contact_name,
            emergency_contact_relationship: create.emergency_contact_relationship,
            emergency_contact_phone: create.emergency_contact_phone,
            medical_history: create.medical_history,
            created_at: None,
        }
    }
}

impl From<UpdatePatient> for Patient {
    fn from(update: UpdatePatient) -> Self {
        Self {
            id: Some(update.id),
            first_name: update.first_name,
            middle_name: update.middle_name,
            last_name: update.last_name,
            date_of_birth: update.date_of_birth,
            sex: update.sex,
            address: update.address,
            phone: update.phone,
            email: update.email,
            emergency_contact_name: update.emergency_contact_name,
            emergency_contact_relationship: update.emergency_contact_relationship,
            emergency_contact_phone: update.emergency_contact_phone,
            medical_history: update.medical_history,
            created_at: None,
        }
    }
}
