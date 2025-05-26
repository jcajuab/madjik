mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::patient::create_patient,
            commands::patient::read_patient,
            commands::patient::update_patient,
            commands::patient::delete_patient,
            commands::patient::list_patients,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
