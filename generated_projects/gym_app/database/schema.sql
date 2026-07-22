-- Production SQL DDL for Gym & Fitness Management System --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE gym_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_code VARCHAR(50) DEFAULT UNIQUE,
    full_name VARCHAR(255) DEFAULT NOT NULL,
    email VARCHAR(255) DEFAULT UNIQUE,
    phone VARCHAR(20) DEFAULT NOT NULL,
    membership_type VARCHAR(50) DEFAULT 'PREMIUM',
    qr_pass_hash VARCHAR(255) DEFAULT NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE gym_trainers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trainer_name VARCHAR(255) DEFAULT NOT NULL,
    specialty VARCHAR(100) DEFAULT 'CROSSFIT',
    experience_years INTEGER DEFAULT 5,
    hourly_rate DECIMAL(10,2) DEFAULT 40.00,
    availability_status VARCHAR(30) DEFAULT 'AVAILABLE'
);

CREATE TABLE gym_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classe_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gym_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference VARCHAR(100) DEFAULT UNIQUE,
    scheduled_time TIMESTAMPTZ DEFAULT NOT NULL,
    slot_number INTEGER DEFAULT 1,
    booking_status VARCHAR(30) DEFAULT 'CONFIRMED',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gym_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gym_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_code VARCHAR(100) DEFAULT UNIQUE,
    amount DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status VARCHAR(30) DEFAULT 'COMPLETED',
    processed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
