-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    sex TEXT NOT NULL CHECK (sex IN ('male', 'female')),
    address TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    emergency_contact_name TEXT,
    emergency_contact_relationship TEXT,
    emergency_contact_phone TEXT,
    medical_history TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT name_search_idx UNIQUE (last_name, first_name, date_of_birth)
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    scheduled_at DATETIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'canceled', 'no_show')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create indexes for appointments
CREATE INDEX IF NOT EXISTS patient_appointments_idx ON appointments (patient_id);
CREATE INDEX IF NOT EXISTS appointment_date_idx ON appointments (scheduled_at);

-- Create doctor_notes table
CREATE TABLE IF NOT EXISTS doctor_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

-- Create index for doctor_notes
CREATE INDEX IF NOT EXISTS appointment_notes_idx ON doctor_notes (appointment_id);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_id INTEGER NOT NULL,
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    duration TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    instructions TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

-- Create indexes for prescriptions
CREATE INDEX IF NOT EXISTS prescription_appointment_idx ON prescriptions (appointment_id);
CREATE INDEX IF NOT EXISTS medication_search_idx ON prescriptions (medication_name);
