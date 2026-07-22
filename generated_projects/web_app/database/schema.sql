-- Production SQL DDL for Web Management Platform --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE web_sells (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sell_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE web_clothes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clothe_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE web_web_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    web_item_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE web_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_code VARCHAR(50) DEFAULT UNIQUE,
    full_name VARCHAR(255) DEFAULT NOT NULL,
    email VARCHAR(255) DEFAULT UNIQUE,
    phone VARCHAR(20) DEFAULT NOT NULL,
    membership_type VARCHAR(50) DEFAULT 'PREMIUM',
    qr_pass_hash VARCHAR(255) DEFAULT NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE web_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
