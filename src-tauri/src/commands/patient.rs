use crate::db::models::{CreatePatient, Patient, UpdatePatient};
use crate::db::Repository;
use tauri::State;
use std::sync::Arc;

#[tauri::command]
pub async fn create_patient(
    patient: CreatePatient,
    repo: State<'_, Arc<Repository>>,
) -> Result<i64, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.create_patient(patient.into())
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn get_patient(
    id: i64, 
    repo: State<'_, Arc<Repository>>
) -> Result<Option<Patient>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.get_patient(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn update_patient(
    patient: UpdatePatient,
    repo: State<'_, Arc<Repository>>,
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.update_patient(patient.into())
            .await
            .map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn delete_patient(
    id: i64, 
    repo: State<'_, Arc<Repository>>
) -> Result<bool, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.delete_patient(id).await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}

#[tauri::command]
pub async fn list_patients(
    repo: State<'_, Arc<Repository>>
) -> Result<Vec<Patient>, String> {
    let repo = repo.inner().clone();
    tokio::spawn(async move {
        repo.list_patients().await.map_err(|e| e.to_string())
    })
    .await
    .unwrap_or_else(|e| Err(e.to_string()))
}
