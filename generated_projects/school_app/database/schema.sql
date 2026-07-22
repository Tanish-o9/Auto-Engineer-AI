-- Production SQL DDL for School Management ERP --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE school_students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    roll_number VARCHAR(50) DEFAULT NOT NULL,
    full_name VARCHAR(255) DEFAULT NOT NULL,
    email VARCHAR(255) DEFAULT UNIQUE,
    grade_level VARCHAR(50) DEFAULT 'GRADE_10',
    parent_phone VARCHAR(20) DEFAULT NOT NULL,
    enrollment_status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE school_teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(50) DEFAULT NOT NULL,
    full_name VARCHAR(255) DEFAULT NOT NULL,
    email VARCHAR(255) DEFAULT UNIQUE,
    department VARCHAR(100) DEFAULT NOT NULL,
    qualification VARCHAR(100) DEFAULT 'M.Sc',
    joining_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE school_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_code VARCHAR(30) DEFAULT NOT NULL,
    course_name VARCHAR(255) DEFAULT NOT NULL,
    credits INTEGER DEFAULT 4,
    department VARCHAR(100) DEFAULT NOT NULL,
    syllabus_summary TEXT DEFAULT NULL
);

CREATE TABLE school_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID DEFAULT REFERENCES school_students(id),
    class_date DATE DEFAULT CURRENT_DATE,
    is_present BOOLEAN DEFAULT TRUE,
    remarks VARCHAR(255) DEFAULT NULL,
    marked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE school_exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_title VARCHAR(255) DEFAULT NOT NULL,
    course_id UUID DEFAULT REFERENCES school_courses(id),
    max_marks INTEGER DEFAULT 100,
    passing_marks INTEGER DEFAULT 35,
    exam_date DATE DEFAULT NOT NULL
);

CREATE TABLE school_fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID DEFAULT REFERENCES school_students(id),
    invoice_number VARCHAR(100) DEFAULT NOT NULL,
    amount_due DECIMAL(10,2) DEFAULT 0.00,
    amount_paid DECIMAL(10,2) DEFAULT 0.00,
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    due_date DATE DEFAULT NOT NULL
);
