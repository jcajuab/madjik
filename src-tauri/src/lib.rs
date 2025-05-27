mod commands;
mod db;
mod utils;

use anyhow::Result;
use std::sync::Arc;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() -> Result<(), Box<dyn std::error::Error>> {
    let db = db::DatabaseImpl::new().await?;
    let repo = Arc::new(db::Repository::new(db.get_pool().await.clone()));

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(repo)
        .invoke_handler(tauri::generate_handler![
            commands::patient::create_patient,
            commands::patient::get_patient,
            commands::patient::update_patient,
            commands::patient::delete_patient,
            commands::patient::list_patients,
            commands::appointment::create_appointment,
            commands::appointment::get_appointment,
            commands::appointment::update_appointment,
            commands::appointment::delete_appointment,
            commands::appointment::list_patient_appointments,
            commands::doctor_note::create_doctor_note,
            commands::doctor_note::get_doctor_note,
            commands::doctor_note::update_doctor_note,
            commands::doctor_note::delete_doctor_note,
            commands::doctor_note::list_appointment_notes,
            commands::prescription::create_prescription,
            commands::prescription::get_prescription,
            commands::prescription::update_prescription,
            commands::prescription::delete_prescription,
            commands::prescription::list_appointment_prescriptions,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
