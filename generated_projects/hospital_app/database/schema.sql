-- Production SQL DDL for Hospital & Patient Management Portal --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE hospital_patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mrn_number VARCHAR(50) DEFAULT UNIQUE,
    full_name VARCHAR(255) DEFAULT NOT NULL,
    dob DATE DEFAULT NOT NULL,
    gender VARCHAR(20) DEFAULT NOT NULL,
    contact_phone VARCHAR(20) DEFAULT NOT NULL,
    blood_group VARCHAR(10) DEFAULT 'O+',
    emergency_contact VARCHAR(20) DEFAULT NOT NULL
);

CREATE TABLE hospital_doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_number VARCHAR(50) DEFAULT UNIQUE,
    full_name VARCHAR(255) DEFAULT NOT NULL,
    specialization VARCHAR(100) DEFAULT NOT NULL,
    department VARCHAR(100) DEFAULT NOT NULL,
    consultation_fee DECIMAL(10,2) DEFAULT 50.00,
    on_duty_status VARCHAR(30) DEFAULT 'AVAILABLE'
);

CREATE TABLE hospital_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID DEFAULT REFERENCES hospital_patients(id),
    doctor_id UUID DEFAULT REFERENCES hospital_doctors(id),
    appointment_date TIMESTAMPTZ DEFAULT NOT NULL,
    opd_token_number INTEGER DEFAULT 1,
    booking_status VARCHAR(30) DEFAULT 'CONFIRMED'
);

CREATE TABLE hospital_prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID DEFAULT REFERENCES hospital_appointments(id),
    doctor_id UUID DEFAULT REFERENCES hospital_doctors(id),
    diagnosis_notes TEXT DEFAULT NOT NULL,
    medications_json JSONB DEFAULT '[]',
    prescribed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospital_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) DEFAULT NOT NULL,
    details_json JSONB DEFAULT '{}',
    log_level VARCHAR(20) DEFAULT 'INFO',
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospital_billing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_code VARCHAR(100) DEFAULT UNIQUE,
    amount DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status VARCHAR(30) DEFAULT 'COMPLETED',
    processed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
