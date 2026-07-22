import re
from typing import Dict, Any, List

class DomainSynthesizerEngine:
    """
    Universal Domain Synthesizer Engine
    Extracts domain topics from any prompt (school, hospital, gym, e-commerce, AI agent, CRM, taxi, food, real estate, etc.)
    and generates rich, highly specific folder trees, REST endpoints, UI component paths, tech stacks, and DB table schemas.
    """
    def synthesize(self, raw_prompt: str) -> Dict[str, Any]:
        prompt_lower = raw_prompt.lower().strip()

        # Rich Predefined Domain Architectures & Tech Stacks
        domains = {
            "school": {
                "keywords": ["school", "college", "student", "university", "education", "academy", "class", "lms", "tuition"],
                "name": "school",
                "title": "School Management ERP",
                "entities": ["students", "teachers", "courses", "attendance", "exams", "fees"],
                "fe_stack": "React 18 + Vite (School ERP Portal UI)",
                "be_stack": "Java 21 Spring Boot 3 (Enterprise ERP API)",
                "database": "PostgreSQL 16 (School Relational DB & Liquibase)",
                "cache": "Redis 7 (Session Cache & Report Store)",
                "fe_desc": ["Student Registration, Profile & Grades UI", "Teacher Dashboard & Assignment Portal", "Course Catalog & Syllabus UI", "Daily Student Attendance Tracking UI", "Exam Schedule, Marksheet & Report Cards", "Fee Structure & Online Payment Portal"],
                "be_desc": ["Student Controllers & Enrollment Services", "Staff Profiles & Subject Allocation Services", "Course & Class Scheduling Services", "Attendance Endpoints & Biometric Services", "Marksheet Generation & Grading Services", "Fee Receipts & Stripe Webhooks"],
                "tree_builder": lambda d, e, fe, be: f"""school-app/
├── school-frontend/          # {d['fe_stack']}
│   ├── src/pages/{e[0]}/     # {fe[0]}
│   ├── src/pages/{e[1]}/     # {fe[1]}
│   ├── src/pages/{e[2]}/     # {fe[2]}
│   ├── src/pages/{e[3]}/     # {fe[3]}
│   ├── src/pages/{e[4]}/     # {fe[4]}
│   ├── src/components/       # Reusable UI Widgets & Grade Cards
│   ├── package.json
│   └── vite.config.ts
├── school-backend/           # {d['be_stack']}
│   ├── src/main/java/com/school/{e[0]}/   # {be[0]}
│   ├── src/main/java/com/school/{e[1]}/   # {be[1]}
│   ├── src/main/java/com/school/{e[2]}/   # {be[2]}
│   ├── src/main/java/com/school/{e[3]}/   # {be[3]}
│   ├── src/main/java/com/school/{e[4]}/   # {be[4]}
│   ├── src/main/resources/application.yml
│   └── pom.xml
├── school-db/                # Liquibase DDL & Migration Scripts
├── docker-compose.yml
└── README.md"""
            },
            "hospital": {
                "keywords": ["hospital", "clinic", "doctor", "patient", "medical", "health", "pharma", "opd", "ipd"],
                "name": "hospital",
                "title": "Hospital & Patient Management Portal",
                "entities": ["patients", "doctors", "appointments", "prescriptions", "records", "billing"],
                "fe_stack": "Next.js 14 App Router (EHR & OPD System)",
                "be_stack": "Node.js + NestJS (Modular Healthcare Core)",
                "database": "PostgreSQL 16 (HIPAA Encrypted Vault with pgcrypto)",
                "cache": "RabbitMQ (Medical Event Dispatcher)",
                "fe_desc": ["Patient OPD/IPD Registration & History UI", "Doctor Availability & Appointment Calendar", "OPD Slot Booking & Consultation UI", "E-Prescription & Pharmacy Orders UI", "Medical EHR Record Archive UI", "Hospital Discharge & Insurance Billing"],
                "be_desc": ["Patient EHR Records & HIPAA Modules", "Doctor Roster Scheduling Modules", "OPD Appointment State Machine Modules", "Rx Generators & Medicine Inventory Modules", "Medical History Audit Log Modules", "Invoice Generation & Payment Modules"],
                "tree_builder": lambda d, e, fe, be: f"""hospital-app/
├── hospital-frontend/        # {d['fe_stack']}
│   ├── app/{e[0]}/           # {fe[0]}
│   ├── app/{e[1]}/           # {fe[1]}
│   ├── app/{e[2]}/           # {fe[2]}
│   ├── app/{e[3]}/           # {fe[3]}
│   ├── app/{e[4]}/           # {fe[4]}
│   ├── components/           # Patient Vital Cards, Appointment Slots
│   ├── package.json
│   └── Dockerfile
├── hospital-backend/         # {d['be_stack']}
│   ├── src/modules/{e[0]}/   # {be[0]}
│   ├── src/modules/{e[1]}/   # {be[1]}
│   ├── src/modules/{e[2]}/   # {be[2]}
│   ├── src/modules/{e[3]}/   # {be[3]}
│   ├── src/modules/{e[4]}/   # {be[4]}
│   ├── nest-cli.json
│   └── package.json
├── hospital-vault/           # Encrypted HIPAA Schemas & Audit Logs
├── docker-compose.yml
└── README.md"""
            },
            "gym": {
                "keywords": ["gym", "fitness", "workout", "trainer", "exercise", "crossfit"],
                "name": "gym",
                "title": "Gym & Fitness Management System",
                "entities": ["members", "trainers", "classes", "bookings", "subscriptions", "payments"],
                "fe_stack": "Vue 3 + Nuxt 3 (Member & Trainer Web App)",
                "be_stack": "Express.js + Prisma ORM (TypeScript Core API)",
                "database": "PostgreSQL 16 (Prisma Schema Relational DB)",
                "cache": "Redis 7 (Class Slot Lock Cache)",
                "fe_desc": ["Member Profiles, Subscriptions & QR Pass", "Trainer Workout Plans & Attendance UI", "Class Schedule & Slot Selection UI", "Class Slot Reservation UI", "Membership Plan Tier Selection", "Monthly Membership Dues & Receipt UI"],
                "be_desc": ["Member Profile & Subscription Controllers", "Trainer Roster & Workout Allocations", "Class Slot Scheduling Services", "Slot Reservation & Lock Engine", "Auto-debit Membership Dues Engine", "Payment Gateway Integration"],
                "tree_builder": lambda d, e, fe, be: f"""gym-app/
├── gym-frontend/             # {d['fe_stack']}
│   ├── pages/{e[0]}/         # {fe[0]}
│   ├── pages/{e[1]}/         # {fe[1]}
│   ├── pages/{e[2]}/         # {fe[2]}
│   ├── pages/{e[3]}/         # {fe[3]}
│   ├── pages/{e[4]}/         # {fe[4]}
│   ├── components/           # Workout Cards & Slot Selectors
│   ├── package.json
│   └── nuxt.config.ts
├── gym-backend/              # {d['be_stack']}
│   ├── src/controllers/      # {be[0]}
│   ├── src/services/         # {be[1]}
│   ├── src/routes/           # API Route Handlers
│   ├── prisma/schema.prisma  # Prisma Database Schema
│   └── package.json
├── gym-db/                   # Prisma Migrations & Seed Data
├── docker-compose.yml
└── README.md"""
            },
            "ecommerce": {
                "keywords": ["store", "ecommerce", "shop", "cart", "product", "checkout", "retail", "marketplace"],
                "name": "ecommerce",
                "title": "E-Commerce & Inventory Platform",
                "entities": ["products", "orders", "customers", "cart", "inventory", "payments"],
                "fe_stack": "Next.js 14 Storefront (SSR / ISR Performance)",
                "be_stack": "Go (Golang Fiber) High-Performance Microservices",
                "database": "PostgreSQL 16 + Elasticsearch (Product Search Engine)",
                "cache": "Apache Kafka (Inventory Stream) + Redis 7",
                "fe_desc": ["Product Catalog, Search & Filter UI", "Order Tracking & Shipment Status UI", "Customer Account & Address Book UI", "Cart Drawer, Discount Coupons & Checkout", "Inventory & Stock Management Portal", "Payment Gateway & Receipt UI"],
                "be_desc": ["Product SKU & Search Microservice", "Order Placement & Fulfillment Engine", "Customer Profile Service", "Cart Session Sync Handler", "Stock Count & Alert Service", "Stripe Payment Webhook Handler"],
                "tree_builder": lambda d, e, fe, be: f"""ecommerce-app/
├── storefront/               # {d['fe_stack']}
│   ├── app/{e[0]}/           # {fe[0]}
│   ├── app/{e[1]}/           # {fe[1]}
│   ├── app/{e[2]}/           # {fe[2]}
│   ├── app/{e[3]}/           # {fe[3]}
│   ├── app/{e[4]}/           # {fe[4]}
│   ├── components/           # Product Cards & Cart Drawers
│   ├── package.json
│   └── Dockerfile
├── services/                 # {d['be_stack']}
│   ├── catalog-service/      # Product SKUs & Search API (go.mod)
│   ├── order-service/        # Order Placement & Fulfillment (go.mod)
│   ├── payment-service/      # Stripe & Payment Webhook Handler (go.mod)
│   └── inventory-service/    # Real-Time Stock Count & Kafka Consumer
├── elasticsearch-config/     # Product Search Index Mappings
├── docker-compose.yml
└── README.md"""
            },
            "agent": {
                "keywords": ["agent", "ai agent", "bot", "llm", "automation", "workflow", "langgraph", "langchain"],
                "name": "agent",
                "title": "AI Agent Automation Platform",
                "entities": ["agents", "workflows", "executions", "prompts", "tools", "logs"],
                "fe_stack": "React 18 + React Flow (AI Agent Studio Canvas)",
                "be_stack": "Python FastAPI + LangGraph (Multi-Agent Engine)",
                "database": "PostgreSQL 16 + pgvector (Vector Embeddings Store)",
                "cache": "Redis 7 (LangGraph State Cache & Celery Task Queue)",
                "fe_desc": ["Agent Persona Configurator & Prompts UI", "Visual Workflow Node Graph Canvas", "Agent Execution Run Feed UI", "Prompt Template Management UI", "Agent Tool Binding Drawer", "Audit Trail & Token Usage Tracking UI"],
                "be_desc": ["Agent Registry & Persona Implementation", "LangGraph State Machine Execution Bridge", "Execution Run Tracer & State Persistence", "Prompt Versioning & Template Endpoints", "Tool Sandbox Execution Bridge", "Audit Trail & Token Usage Auditor"],
                "tree_builder": lambda d, e, fe, be: f"""agent-app/
├── agent-studio/             # {d['fe_stack']}
│   ├── src/canvas/           # {fe[1]}
│   ├── src/agents/           # {fe[0]}
│   ├── src/executions/       # {fe[2]}
│   ├── src/tools/            # {fe[4]}
│   ├── src/components/       # Workflow Node Cards & Widgets
│   ├── package.json
│   └── vite.config.ts
├── agent-core/               # {d['be_stack']}
│   ├── app/agents/           # {be[0]}
│   ├── app/workflows/        # {be[1]}
│   ├── app/tools/            # {be[4]}
│   ├── app/main.py           # FastAPI Application Entrypoint
│   └── requirements.txt
├── vector-db/                # pgvector DDL & Vector Embedding Store
├── docker-compose.yml
└── README.md"""
            },
            "taxi": {
                "keywords": ["taxi", "ride", "driver", "cab", "uber", "transport", "fleet", "trip"],
                "name": "taxi",
                "title": "Ride Sharing & Fleet Dispatch Platform",
                "entities": ["drivers", "riders", "trips", "vehicles", "fares", "ratings"],
                "fe_stack": "React 18 + Mapbox GL (Rider & Dispatch Dashboard)",
                "be_stack": "Go (Golang High-Concurrency Dispatch Engine)",
                "database": "PostgreSQL 16 + PostGIS (Spatial GPS Indexing)",
                "cache": "NATS JetStream (Real-Time Driver GPS Stream)",
                "fe_desc": ["Driver Registration & Shift UI", "Rider Profile & Ride Request UI", "Live Trip Tracking & Route Map UI", "Vehicle Fleet & Maintenance UI", "Fare Estimate & Receipt UI", "Ratings & Driver Feedback Portal"],
                "be_desc": ["Driver Shift & Geo-Location Handlers", "Rider Account & Booking Endpoints", "Geo-Spatial Driver-Rider Matching Engine", "Vehicle GPS Stream Ingestion", "Dynamic Surge Pricing Calculator", "Review & Rating Processing"],
                "tree_builder": lambda d, e, fe, be: f"""taxi-app/
├── taxi-dispatch-web/        # {d['fe_stack']}
│   ├── src/riders/           # {fe[1]}
│   ├── src/drivers/          # {fe[0]}
│   ├── src/trips/            # {fe[2]}
│   ├── src/vehicles/         # {fe[3]}
│   ├── src/components/       # Mapbox Route Cards & Fare Widgets
│   ├── package.json
│   └── vite.config.ts
├── dispatch-engine/          # {d['be_stack']}
│   ├── cmd/dispatch/main.go  # Go Application Entrypoint
│   ├── pkg/spatial/matcher.go# {be[2]}
│   ├── pkg/pricing/fare.go   # {be[4]}
│   └── go.mod
├── postgis-db/               # PostGIS Spatial Indexes & DDL Scripts
├── docker-compose.yml
└── README.md"""
            },
            "food": {
                "keywords": ["food", "restaurant", "delivery", "dish", "meal", "kitchen", "cater"],
                "name": "food",
                "title": "Food Delivery & Restaurant Platform",
                "entities": ["restaurants", "menus", "dishes", "orders", "deliveries", "couriers"],
                "fe_stack": "Next.js 14 App Router (Customer & Partner Portal)",
                "be_stack": "Node.js Fastify (Async Order Pipeline API)",
                "database": "MongoDB 7 (Document Store for Menus & Orders)",
                "cache": "Redis Pub/Sub (Order Status WebSockets)",
                "fe_desc": ["Restaurant Directory & Search UI", "Menu Categories & Addon UI", "Dish Customization Drawer", "Order Tracking & Live Status UI", "Courier Live Location Map", "Courier Partner Roster UI"],
                "be_desc": ["Restaurant Metadata Controllers", "Menu & Category CRUD Handlers", "Dish Pricing & Addon Logic", "Order Pipeline & State Machine", "Live Courier Dispatch Engine", "Courier Earnings API"],
                "tree_builder": lambda d, e, fe, be: f"""food-app/
├── food-portal/              # {d['fe_stack']}
│   ├── app/restaurants/      # {fe[0]}
│   ├── app/menus/            # {fe[1]}
│   ├── app/orders/           # {fe[3]}
│   ├── app/deliveries/       # {fe[4]}
│   ├── components/           # Menu Cards & Order Trackers
│   ├── package.json
│   └── Dockerfile
├── food-api/                 # {d['be_stack']}
│   ├── src/routes/restaurants/# {be[0]}
│   ├── src/routes/orders/    # {be[3]}
│   ├── src/services/dispatch/# {be[4]}
│   └── package.json
├── mongodb-schemas/          # Mongo Index Mappings & Schemas
├── docker-compose.yml
└── README.md"""
            },
            "crypto": {
                "keywords": ["crypto", "wallet", "coin", "blockchain", "token", "banking", "finance", "payment"],
                "name": "finance",
                "title": "Digital Wallet & Financial Platform",
                "entities": ["accounts", "wallets", "transactions", "transfers", "cards", "investments"],
                "fe_stack": "Next.js 14 (Financial Ledger & Wallet Dashboard)",
                "be_stack": "Rust (Actix-Web Immutable Ledger Engine)",
                "database": "PostgreSQL 16 (ACID Serializable Ledger Tables)",
                "cache": "Redis 7 (Session Cache & Rate Limiting)",
                "fe_desc": ["Account Summary & Balance UI", "Digital Wallet & QR Code UI", "Ledger Transaction History UI", "Fund Transfer Wizard", "Virtual Debit Card UI", "Investment Portfolio Charts"],
                "be_desc": ["Financial Account Handlers", "Wallet Key Management Module", "Immutable Ledger Engine", "Transfer Validation API", "Card Issuance Endpoints", "Portfolio Valuation Engine"],
                "tree_builder": lambda d, e, fe, be: f"""finance-app/
├── wallet-ui/                # {d['fe_stack']}
│   ├── app/accounts/         # {fe[0]}
│   ├── app/wallets/          # {fe[1]}
│   ├── app/transactions/     # {fe[2]}
│   ├── app/transfers/        # {fe[3]}
│   ├── components/           # Balance Widgets & QR Drawers
│   ├── package.json
│   └── Dockerfile
├── ledger-engine/            # {d['be_stack']}
│   ├── src/ledger/mod.rs     # {be[2]}
│   ├── src/transfers/mod.rs  # {be[3]}
│   ├── src/main.rs           # Rust Entrypoint
│   └── Cargo.toml
├── ledger-db/                # Strict ACID Migration SQL Scripts
├── docker-compose.yml
└── README.md"""
            },
            "drone": {
                "keywords": ["drone", "flight", "pilot", "uav", "telemetry", "sensor", "iot"],
                "name": "drone",
                "title": "Drone Fleet & Flight Telemetry Platform",
                "entities": ["drones", "pilots", "flights", "telemetry", "missions", "maintenance"],
                "fe_stack": "React 18 + Deck.gl 3D Map (Live Telemetry UI)",
                "be_stack": "Rust (Tokio Async Telemetry Ingestion Engine)",
                "database": "TimescaleDB (Time-Series Sensor Telemetry Store)",
                "cache": "Mosquitto MQTT Broker (IoT Sensor Feed)",
                "fe_desc": ["Drone Fleet Status UI", "Pilot Roster UI", "Flight Path 3D Map UI", "Live Telemetry Charts UI", "Mission Planner Canvas UI", "Maintenance Log UI"],
                "be_desc": ["Drone Hardware Controllers", "Pilot License Validation API", "Flight Plan Logging Endpoints", "GPS Telemetry Ingestion Stream", "Mission Route Planner Engine", "Maintenance Alert Trigger"],
                "tree_builder": lambda d, e, fe, be: f"""drone-app/
├── drone-ui/                 # {d['fe_stack']}
│   ├── src/drones/           # {fe[0]}
│   ├── src/pilots/           # {fe[1]}
│   ├── src/telemetry/        # {fe[3]}
│   ├── src/missions/         # {fe[4]}
│   ├── src/components/       # 3D Map Overlay & Gauge Widgets
│   ├── package.json
│   └── vite.config.ts
├── telemetry-engine/         # {d['be_stack']}
│   ├── src/sensors/mod.rs    # {be[3]}
│   ├── src/missions/mod.rs   # {be[4]}
│   ├── src/main.rs           # Tokio Entrypoint
│   └── Cargo.toml
├── timescaledb-scripts/      # Time-Series Hypertable Schemas
├── docker-compose.yml
└── README.md"""
            }
        }

        # 1. Match prompt against predefined domain catalog
        matched_domain = None
        for key, dom in domains.items():
            if any(w in prompt_lower for w in dom["keywords"]):
                matched_domain = dom
                break

        if matched_domain:
            domain_name = matched_domain["name"]
            title = matched_domain["title"]
            entities = matched_domain["entities"]
            fe_stack = matched_domain["fe_stack"]
            be_stack = matched_domain["be_stack"]
            database = matched_domain["database"]
            cache = matched_domain["cache"]
            fe_desc = matched_domain["fe_desc"]
            be_desc = matched_domain["be_desc"]
            project_tree = matched_domain["tree_builder"](matched_domain, entities, fe_desc, be_desc)
        else:
            # 2. Dynamic Domain & Entity Extractor for custom / unlisted prompts
            stopwords = {"build", "want", "create", "make", "with", "from", "that", "this", "application", "system", "platform", "portal", "management", "app", "service", "project", "tool", "using", "designed", "software", "need", "like", "solution", "dashboard", "developer", "engineer", "for", "and", "the", "into"}
            words = [w for w in re.findall(r'\b[a-zA-Z]{3,}\b', prompt_lower) if w not in stopwords]
            
            domain_name = words[0] if words else "custom"
            title = f"{domain_name.capitalize()} Management Platform"
            fe_stack = f"Next.js 14 ({title} UI Portal)"
            be_stack = f"Django DRF ({title} Core API)"
            database = f"PostgreSQL 16 ({domain_name.capitalize()} Relational DB)"
            cache = "Redis 7 (Session Cache & Event Bus)"

            # Dynamically extract noun candidates from remaining words
            extracted_nouns = []
            for w in words[1:]:
                clean_w = w.lower()
                if clean_w not in extracted_nouns:
                    if not clean_w.endswith("s") and len(clean_w) > 3:
                        clean_w = clean_w + "s"
                    extracted_nouns.append(clean_w)

            # Ensure we have 5 distinct, meaningful domain entities
            fallback_suffixes = ["items", "members", "requests", "records", "analytics", "settings"]
            entities = []
            for noun in extracted_nouns:
                if len(entities) < 5 and noun not in entities:
                    entities.append(noun)
            
            for suffix in fallback_suffixes:
                if len(entities) < 5:
                    candidate = f"{domain_name}_{suffix}" if suffix in ["items", "records"] else suffix
                    if candidate not in entities:
                        entities.append(candidate)

            fe_desc = [
                f"{entities[0].replace('_', ' ').capitalize()} Portal & Overview UI",
                f"{entities[1].replace('_', ' ').capitalize()} Management UI",
                f"{entities[2].replace('_', ' ').capitalize()} Operations UI",
                f"{entities[3].replace('_', ' ').capitalize()} Tracking UI",
                f"{entities[4].replace('_', ' ').capitalize()} Analytics & Reports UI",
                "UI Cards, Forms & Widget Library"
            ]

            be_desc = [
                f"{entities[0].replace('_', ' ').capitalize()} Models & REST Endpoints",
                f"{entities[1].replace('_', ' ').capitalize()} Serializers & Views",
                f"{entities[2].replace('_', ' ').capitalize()} Business Logic Service",
                f"{entities[3].replace('_', ' ').capitalize()} Transaction Processor",
                f"{entities[4].replace('_', ' ').capitalize()} Report Generation Engine",
                "Authentication & RBAC Middleware"
            ]

            project_tree = f"""{domain_name}-app/
├── {domain_name}-frontend/        # Next.js 14 {title} UI
│   ├── app/{entities[0]}/     # {fe_desc[0]}
│   ├── app/{entities[1]}/     # {fe_desc[1]}
│   ├── app/{entities[2]}/     # {fe_desc[2]}
│   ├── app/{entities[3]}/     # {fe_desc[3]}
│   ├── app/{entities[4]}/     # {fe_desc[4]}
│   ├── components/          # Reusable UI Widgets & Cards
│   ├── package.json
│   └── Dockerfile
├── {domain_name}-backend/         # Django DRF {title} Core API
│   ├── apps/{entities[0]}/    # {be_desc[0]}
│   ├── apps/{entities[1]}/    # {be_desc[1]}
│   ├── apps/{entities[2]}/    # {be_desc[2]}
│   ├── apps/{entities[3]}/    # {be_desc[3]}
│   ├── apps/{entities[4]}/    # {be_desc[4]}
│   ├── manage.py
│   └── requirements.txt
├── {domain_name}-db/              # PostgreSQL DDL & Migration Scripts
├── docker-compose.yml
└── README.md"""

        # Generate Endpoints
        endpoints = [
            {"path": "/api/v1/auth/token/", "method": "POST", "summary": f"Obtain {title} JWT authentication token", "auth": "Public"}
        ]
        for entity in entities:
            clean_ent = entity.replace('_', ' ')
            endpoints.append({
                "path": f"/api/v1/{domain_name}/{entity}/",
                "method": "GET/POST",
                "summary": f"Manage {domain_name} {clean_ent} records and operations",
                "auth": "Bearer JWT"
            })

        # Generate DB Tables with Entity-Specific Columns & FKs
        tables = []
        for entity in entities:
            tables.append({
                "name": f"{domain_name}_{entity}",
                "description": f"Registered {entity.replace('_', ' ')} records for {title}",
                "columns": self._build_entity_columns(domain_name, entity)
            })

        # Topology
        topology = {
            "architecture_pattern": f"Modular {title} Architecture",
            "frontend_stack": fe_stack,
            "backend_stack": be_stack,
            "ai_engine_stack": f"FastAPI AI ({domain_name.capitalize()} Service)",
            "database": database,
            "cache_event_bus": cache,
            "gateway_ingress": "Nginx API Gateway"
        }

        return {
            "domain_name": domain_name,
            "title": title,
            "entities": entities,
            "endpoints": endpoints,
            "tables": tables,
            "project_tree": project_tree,
            "topology": topology
        }

    def _build_entity_columns(self, domain_name: str, entity: str) -> List[Dict[str, str]]:
        schema_map = {
            # SCHOOL
            "students": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "roll_number", "type": "VARCHAR(50)", "key": "", "default": "NOT NULL"},
                {"name": "full_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "email", "type": "VARCHAR(255)", "key": "", "default": "UNIQUE"},
                {"name": "grade_level", "type": "VARCHAR(50)", "key": "", "default": "'GRADE_10'"},
                {"name": "parent_phone", "type": "VARCHAR(20)", "key": "", "default": "NOT NULL"},
                {"name": "enrollment_status", "type": "VARCHAR(30)", "key": "", "default": "'ACTIVE'"},
                {"name": "created_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ],
            "teachers": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "employee_id", "type": "VARCHAR(50)", "key": "", "default": "NOT NULL"},
                {"name": "full_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "email", "type": "VARCHAR(255)", "key": "", "default": "UNIQUE"},
                {"name": "department", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "qualification", "type": "VARCHAR(100)", "key": "", "default": "'M.Sc'"},
                {"name": "joining_date", "type": "DATE", "key": "", "default": "CURRENT_DATE"}
            ],
            "courses": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "course_code", "type": "VARCHAR(30)", "key": "", "default": "NOT NULL"},
                {"name": "course_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "credits", "type": "INTEGER", "key": "", "default": "4"},
                {"name": "department", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "syllabus_summary", "type": "TEXT", "key": "", "default": "NULL"}
            ],
            "attendance": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "student_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_students(id)"},
                {"name": "class_date", "type": "DATE", "key": "", "default": "CURRENT_DATE"},
                {"name": "is_present", "type": "BOOLEAN", "key": "", "default": "TRUE"},
                {"name": "remarks", "type": "VARCHAR(255)", "key": "", "default": "NULL"},
                {"name": "marked_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ],
            "exams": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "exam_title", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "course_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_courses(id)"},
                {"name": "max_marks", "type": "INTEGER", "key": "", "default": "100"},
                {"name": "passing_marks", "type": "INTEGER", "key": "", "default": "35"},
                {"name": "exam_date", "type": "DATE", "key": "", "default": "NOT NULL"}
            ],
            "fees": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "student_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_students(id)"},
                {"name": "invoice_number", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "amount_due", "type": "DECIMAL(10,2)", "key": "", "default": "0.00"},
                {"name": "amount_paid", "type": "DECIMAL(10,2)", "key": "", "default": "0.00"},
                {"name": "payment_status", "type": "VARCHAR(50)", "key": "", "default": "'PENDING'"},
                {"name": "due_date", "type": "DATE", "key": "", "default": "NOT NULL"}
            ],

            # HOSPITAL
            "patients": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "mrn_number", "type": "VARCHAR(50)", "key": "", "default": "UNIQUE"},
                {"name": "full_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "dob", "type": "DATE", "key": "", "default": "NOT NULL"},
                {"name": "gender", "type": "VARCHAR(20)", "key": "", "default": "NOT NULL"},
                {"name": "contact_phone", "type": "VARCHAR(20)", "key": "", "default": "NOT NULL"},
                {"name": "blood_group", "type": "VARCHAR(10)", "key": "", "default": "'O+'"},
                {"name": "emergency_contact", "type": "VARCHAR(20)", "key": "", "default": "NOT NULL"}
            ],
            "doctors": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "license_number", "type": "VARCHAR(50)", "key": "", "default": "UNIQUE"},
                {"name": "full_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "specialization", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "department", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "consultation_fee", "type": "DECIMAL(10,2)", "key": "", "default": "50.00"},
                {"name": "on_duty_status", "type": "VARCHAR(30)", "key": "", "default": "'AVAILABLE'"}
            ],
            "appointments": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "patient_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_patients(id)"},
                {"name": "doctor_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_doctors(id)"},
                {"name": "appointment_date", "type": "TIMESTAMPTZ", "key": "", "default": "NOT NULL"},
                {"name": "opd_token_number", "type": "INTEGER", "key": "", "default": "1"},
                {"name": "booking_status", "type": "VARCHAR(30)", "key": "", "default": "'CONFIRMED'"}
            ],
            "prescriptions": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "appointment_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_appointments(id)"},
                {"name": "doctor_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_doctors(id)"},
                {"name": "diagnosis_notes", "type": "TEXT", "key": "", "default": "NOT NULL"},
                {"name": "medications_json", "type": "JSONB", "key": "", "default": "'[]'"},
                {"name": "prescribed_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ],

            # GYM
            "members": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "member_code", "type": "VARCHAR(50)", "key": "", "default": "UNIQUE"},
                {"name": "full_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "email", "type": "VARCHAR(255)", "key": "", "default": "UNIQUE"},
                {"name": "phone", "type": "VARCHAR(20)", "key": "", "default": "NOT NULL"},
                {"name": "membership_type", "type": "VARCHAR(50)", "key": "", "default": "'PREMIUM'"},
                {"name": "qr_pass_hash", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "join_date", "type": "DATE", "key": "", "default": "CURRENT_DATE"}
            ],
            "trainers": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "trainer_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "specialty", "type": "VARCHAR(100)", "key": "", "default": "'CROSSFIT'"},
                {"name": "experience_years", "type": "INTEGER", "key": "", "default": "5"},
                {"name": "hourly_rate", "type": "DECIMAL(10,2)", "key": "", "default": "40.00"},
                {"name": "availability_status", "type": "VARCHAR(30)", "key": "", "default": "'AVAILABLE'"}
            ],

            # E-COMMERCE
            "products": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "sku", "type": "VARCHAR(50)", "key": "", "default": "UNIQUE"},
                {"name": "product_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "category", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "price", "type": "DECIMAL(10,2)", "key": "", "default": "0.00"},
                {"name": "stock_quantity", "type": "INTEGER", "key": "", "default": "100"},
                {"name": "image_url", "type": "VARCHAR(512)", "key": "", "default": "NULL"}
            ],
            "orders": [
                {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"},
                {"name": "order_number", "type": "VARCHAR(100)", "key": "", "default": "UNIQUE"},
                {"name": "customer_id", "type": "UUID", "key": "FK", "default": f"REFERENCES {domain_name}_customers(id)"},
                {"name": "total_amount", "type": "DECIMAL(10,2)", "key": "", "default": "0.00"},
                {"name": "order_status", "type": "VARCHAR(50)", "key": "", "default": "'PROCESSING'"},
                {"name": "shipping_address", "type": "TEXT", "key": "", "default": "NOT NULL"},
                {"name": "ordered_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ]
        }

        if entity in schema_map:
            return schema_map[entity]

        # Dynamic Schema Column Generator for Custom Entities
        singular = entity[:-1] if entity.endswith('s') else entity

        cols = [
            {"name": "id", "type": "UUID", "key": "PK", "default": "uuid_generate_v4()"}
        ]

        if any(role in singular for role in ["member", "user", "student", "teacher", "doctor", "patient", "driver", "rider", "pilot", "customer", "applicant", "author"]):
            cols.extend([
                {"name": "full_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "email", "type": "VARCHAR(255)", "key": "", "default": "UNIQUE"},
                {"name": "phone", "type": "VARCHAR(20)", "key": "", "default": "NOT NULL"},
                {"name": "account_status", "type": "VARCHAR(30)", "key": "", "default": "'ACTIVE'"},
                {"name": "created_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ])
        elif any(txn in singular for txn in ["payment", "fee", "billing", "invoice", "transaction", "fare", "transfer"]):
            cols.extend([
                {"name": "transaction_code", "type": "VARCHAR(100)", "key": "", "default": "UNIQUE"},
                {"name": "amount", "type": "DECIMAL(10,2)", "key": "", "default": "0.00"},
                {"name": "currency", "type": "VARCHAR(10)", "key": "", "default": "'USD'"},
                {"name": "payment_status", "type": "VARCHAR(30)", "key": "", "default": "'COMPLETED'"},
                {"name": "processed_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ])
        elif any(sched in singular for sched in ["booking", "appointment", "reservation", "schedule", "flight", "tour"]):
            cols.extend([
                {"name": "booking_reference", "type": "VARCHAR(100)", "key": "", "default": "UNIQUE"},
                {"name": "scheduled_time", "type": "TIMESTAMPTZ", "key": "", "default": "NOT NULL"},
                {"name": "slot_number", "type": "INTEGER", "key": "", "default": "1"},
                {"name": "booking_status", "type": "VARCHAR(30)", "key": "", "default": "'CONFIRMED'"},
                {"name": "created_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ])
        elif any(log in singular for log in ["log", "record", "telemetry", "history", "execution", "audit"]):
            cols.extend([
                {"name": "event_type", "type": "VARCHAR(100)", "key": "", "default": "NOT NULL"},
                {"name": "details_json", "type": "JSONB", "key": "", "default": "'{}'"},
                {"name": "log_level", "type": "VARCHAR(20)", "key": "", "default": "'INFO'"},
                {"name": "recorded_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ])
        else:
            cols.extend([
                {"name": f"{singular}_name", "type": "VARCHAR(255)", "key": "", "default": "NOT NULL"},
                {"name": "code_identifier", "type": "VARCHAR(100)", "key": "", "default": "UNIQUE"},
                {"name": "category", "type": "VARCHAR(100)", "key": "", "default": "'GENERAL'"},
                {"name": "status", "type": "VARCHAR(50)", "key": "", "default": "'ACTIVE'"},
                {"name": "created_at", "type": "TIMESTAMPTZ", "key": "", "default": "CURRENT_TIMESTAMP"}
            ])

        return cols


