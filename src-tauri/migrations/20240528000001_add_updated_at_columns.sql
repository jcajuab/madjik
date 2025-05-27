-- Add updated_at column to patients table
ALTER TABLE patients ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Add updated_at column to appointments table
ALTER TABLE appointments ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Add updated_at column to doctor_notes table
ALTER TABLE doctor_notes ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Add updated_at column to prescriptions table
ALTER TABLE prescriptions ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Create triggers to update the updated_at timestamp on each update
-- For patients table
CREATE TRIGGER IF NOT EXISTS update_patients_timestamp
AFTER UPDATE ON patients
BEGIN
    UPDATE patients SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- For appointments table
CREATE TRIGGER IF NOT EXISTS update_appointments_timestamp
AFTER UPDATE ON appointments
BEGIN
    UPDATE appointments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- For doctor_notes table
CREATE TRIGGER IF NOT EXISTS update_doctor_notes_timestamp
AFTER UPDATE ON doctor_notes
BEGIN
    UPDATE doctor_notes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- For prescriptions table
CREATE TRIGGER IF NOT EXISTS update_prescriptions_timestamp
AFTER UPDATE ON prescriptions
BEGIN
    UPDATE prescriptions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
