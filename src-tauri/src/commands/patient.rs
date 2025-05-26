use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::command;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Patient {
    pub id: i64,
    pub first_name: String,
    pub middle_initial: Option<char>,
    pub last_name: String,
    pub date_of_birth: String,
    pub sex: Sex,
    pub phone_number: String,
    pub email_address: String,
    pub address: String,
    pub emergency_contact_first_name: Option<String>,
    pub emergency_contact_middle_initial: Option<char>,
    pub emergency_contact_last_name: Option<String>,
    pub emergency_contact_relationship: Option<String>,
    pub emergency_contact_phone_number: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Sex {
    Male,
    Female,
}

lazy_static! {
    static ref PATIENTS: Mutex<Vec<Patient>> = Mutex::new(Vec::new());
    static ref NEXT_ID: Mutex<i64> = Mutex::new(1);
}

#[command]
pub fn create_patient(mut patient: Patient) -> Patient {
    let mut patients = PATIENTS.lock().unwrap();
    let mut next_id = NEXT_ID.lock().unwrap();
    patient.id = *next_id;
    *next_id += 1;
    patients.push(patient.clone());
    patient
}

#[command]
pub fn read_patient(id: i64) -> Option<Patient> {
    let patients = PATIENTS.lock().unwrap();
    patients.iter().find(|p| p.id == id).cloned()
}

#[command]
pub fn update_patient(updated: Patient) -> Option<Patient> {
    let mut patients = PATIENTS.lock().unwrap();
    if let Some(patient) = patients.iter_mut().find(|p| p.id == updated.id) {
        *patient = updated.clone();
        Some(updated)
    } else {
        None
    }
}

#[command]
pub fn delete_patient(id: i64) -> bool {
    let mut patients = PATIENTS.lock().unwrap();
    let initial_len = patients.len();
    patients.retain(|p| p.id != id);
    patients.len() != initial_len
}

#[command]
pub fn list_patients() -> Vec<Patient> {
    let patients = PATIENTS.lock().unwrap();
    patients.clone()
}
