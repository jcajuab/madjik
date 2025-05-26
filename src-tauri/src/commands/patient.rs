use crate::utils::WithId;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::command;

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Patient {
    pub first_name: String,
    pub middle_initial: Option<char>,
    pub last_name: String,
    pub date_of_birth: String,
    pub sex: Sex,
    pub physical_address: String,
    pub phone_number: String,
    pub email_address: String,
    pub emergency_contact_first_name: Option<String>,
    pub emergency_contact_middle_initial: Option<char>,
    pub emergency_contact_last_name: Option<String>,
    pub emergency_contact_relationship: Option<String>,
    pub emergency_contact_phone_number: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "lowercase")]
pub enum Sex {
    Male,
    Female,
}

lazy_static! {
    static ref PATIENTS: Mutex<Vec<WithId<Patient>>> = Mutex::new(Vec::new());
    static ref NEXT_ID: Mutex<i64> = Mutex::new(1);
}

#[command]
pub fn create_patient(new_patient: Patient) -> Result<i64, String> {
    let mut patients = PATIENTS
        .lock()
        .map_err(|e| format!("Failed to lock patients mutex: {}", e))?;
    let mut next_id = NEXT_ID
        .lock()
        .map_err(|e| format!("Failed to lock next_id mutex: {}", e))?;

    let patient = WithId {
        id: *next_id,
        inner: new_patient,
    };

    *next_id += 1;
    patients.push(patient.clone());
    Ok(patient.id)
}

#[command]
pub fn read_patient(id: i64) -> Result<Option<WithId<Patient>>, String> {
    let patients = PATIENTS
        .lock()
        .map_err(|e| format!("Failed to lock patients mutex: {}", e))?;

    Ok(patients.iter().find(|p| p.id == id).cloned())
}

#[command]
pub fn update_patient(updated: WithId<Patient>) -> Result<i64, String> {
    let mut patients = PATIENTS
        .lock()
        .map_err(|e| format!("Failed to lock patients mutex: {}", e))?;

    if let Some(patient) = patients.iter_mut().find(|p| p.id == updated.id) {
        *patient = updated;
        Ok(patient.id)
    } else {
        Err(format!("Patient with id {} not found", updated.id))
    }
}

#[command]
pub fn delete_patient(id: i64) -> Result<i64, String> {
    let mut patients = PATIENTS
        .lock()
        .map_err(|e| format!("Failed to lock patients mutex: {}", e))?;

    if let Some(pos) = patients.iter().position(|p| p.id == id) {
        patients.remove(pos);
        Ok(id)
    } else {
        Err(format!("Patient with id {} not found", id))
    }
}

#[command]
pub fn list_patients() -> Result<Vec<WithId<Patient>>, String> {
    let patients = PATIENTS
        .lock()
        .map_err(|e| format!("Failed to lock patients mutex: {}", e))?;

    Ok(patients.clone())
}
