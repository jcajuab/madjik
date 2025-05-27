use crate::db::{models::Appointment, Repository};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateAppointment {
    pub patient_id: i64,
    pub scheduled_at: DateTime<Utc>,
    pub status: String,
}

#[tauri::command]
pub async fn create_appointment(
    appointment: CreateAppointment,
    repo: State<'_, Arc<Repository>>,
) -> Result<i64, String> {
    let repo = repo.inner().clone();
    let appointment = Appointment {
        id: None,
        patient_id: appointment.patient_id,
        scheduled_at: appointment.scheduled_at,
        status: appointment.status,
        created_at: None,
        updated_at: None,
    };

    tokio::spawn(async move {
        repo.create_appointment(appointment)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn get_appointment(
    id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<Option<Appointment>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.get_appointment(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn update_appointment(
    appointment: Appointment,
    repo: State<'_, Arc<Repository>>,
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.update_appointment(appointment)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn delete_appointment(
    id: i64, 
    repo: State<'_, Arc<Repository>>
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.delete_appointment(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn list_patient_appointments(
    patient_id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<Vec<Appointment>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.list_patient_appointments(patient_id)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}
