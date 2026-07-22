-- Production SQL DDL for E-Commerce & Inventory Platform --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE ecommerce_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(50) DEFAULT UNIQUE,
    product_name VARCHAR(255) DEFAULT NOT NULL,
    category VARCHAR(100) DEFAULT NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    stock_quantity INTEGER DEFAULT 100,
    image_url VARCHAR(512) DEFAULT NULL
);

CREATE TABLE ecommerce_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(100) DEFAULT UNIQUE,
    customer_id UUID DEFAULT REFERENCES ecommerce_customers(id),
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    order_status VARCHAR(50) DEFAULT 'PROCESSING',
    shipping_address TEXT DEFAULT NOT NULL,
    ordered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) DEFAULT NOT NULL,
    email VARCHAR(255) DEFAULT UNIQUE,
    phone VARCHAR(20) DEFAULT NOT NULL,
    account_status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce_cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_name VARCHAR(255) DEFAULT NOT NULL,
    code_identifier VARCHAR(100) DEFAULT UNIQUE,
    category VARCHAR(100) DEFAULT 'GENERAL',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecommerce_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_code VARCHAR(100) DEFAULT UNIQUE,
    amount DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status VARCHAR(30) DEFAULT 'COMPLETED',
    processed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
