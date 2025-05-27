use crate::db::{models::DoctorNote, Repository};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::State;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateDoctorNote {
    pub appointment_id: i64,
    pub content: String,
}

#[tauri::command]
pub async fn create_doctor_note(
    note: CreateDoctorNote,
    repo: State<'_, Arc<Repository>>,
) -> Result<i64, String> {
    let repo = repo.inner().clone();
    let note = DoctorNote {
        id: None,
        appointment_id: note.appointment_id,
        content: note.content,
        created_at: None,
        updated_at: None,
    };

    tokio::spawn(async move {
        repo.create_doctor_note(note)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn get_doctor_note(
    id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<Option<DoctorNote>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.get_doctor_note(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn update_doctor_note(
    note: DoctorNote,
    repo: State<'_, Arc<Repository>>,
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.update_doctor_note(note)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn delete_doctor_note(
    id: i64, 
    repo: State<'_, Arc<Repository>>
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.delete_doctor_note(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn list_appointment_notes(
    appointment_id: i64,
    repo: State<'_, Arc<Repository>>,
) -> Result<Vec<DoctorNote>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.list_appointment_notes(appointment_id)
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}
