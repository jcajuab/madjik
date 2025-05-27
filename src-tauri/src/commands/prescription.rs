use crate::db::{models::Prescription, Repository};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePrescription {
    pub appointment_id: i64,
    pub medication_name: String,
    pub dosage: String,
    pub frequency: String,
    pub duration: String,
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub instructions: Option<String>,
}

#[tauri::command]
pub async fn create_prescription(
    prescription: CreatePrescription,
    repo: State<'_, Arc<Repository>>,
) -> Result<i64, String> {
    let repo = repo.inner().clone();
    let prescription = Prescription {
        id: None,
        appointment_id: prescription.appointment_id,
        medication_name: prescription.medication_name,
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        duration: prescription.duration,
        start_date: prescription.start_date,
        end_date: prescription.end_date,
        instructions: prescription.instructions,
        created_at: None,
        updated_at: None,
    };

    tokio::spawn(async move {
        repo.create_prescription(prescription)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn get_prescription(
    id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<Option<Prescription>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.get_prescription(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn update_prescription(
    prescription: Prescription,
    repo: State<'_, Arc<Repository>>,
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.update_prescription(prescription)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn delete_prescription(
    id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.delete_prescription(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn list_appointment_prescriptions(
    appointment_id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<Vec<Prescription>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.list_appointment_prescriptions(appointment_id)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}
