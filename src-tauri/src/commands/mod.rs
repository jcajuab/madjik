pub mod appointment;
pub mod doctor_note;
pub mod patient;
pub mod prescription;

pub use appointment::{
    create_appointment, delete_appointment, get_appointment, list_patient_appointments,
    update_appointment,
};
pub use doctor_note::{
    create_doctor_note, delete_doctor_note, get_doctor_note, list_appointment_notes,
    update_doctor_note,
};
pub use patient::{create_patient, delete_patient, get_patient, list_patients, update_patient};
pub use prescription::{
    create_prescription, delete_prescription, get_prescription, list_appointment_prescriptions,
    update_prescription,
};
