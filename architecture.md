## Overview

Built a full-stack salary management system designed for HR managers to manage employees and derive salary insights at scale (~10,000 employees).

The system focuses on:

- Clean and extensible backend architecture
- Efficient querying and data handling
- Responsive and intuitive frontend UX
- Realistic data generation and scalability considerations

---

## High-Level Architecture

```text
Frontend (React + Mantine)
        ↓
Backend (Express + Node.js)
        ↓
Database (SQLite)
```

---

## Tech Choices

### Backend

- Node.js + Express → lightweight, flexible, and fast to iterate
- SQLite (better-sqlite3) → synchronous, simple, and sufficient for 10k records
- Raw SQL → full control over queries and performance

### Frontend

- React + Vite → fast development and build performance
- Mantine → lightweight UI library with strong DX for dashboards
- Axios → simple HTTP client
- React Router → client-side routing

---

## Backend Design

### 1. Layered Architecture

Followed a clean separation of concerns:

```text
Controller → Service → Repository → Database
```

- **Controller** → request validation (Joi) + HTTP handling
- **Service** → business logic and orchestration
- **Repository** → raw SQL queries and data access

This improves:

- testability
- maintainability
- scalability

---

### 2. Raw SQL over ORM

Chose raw SQL instead of ORM (e.g., Prisma) to:

- avoid runtime overhead
- maintain full control over queries
- optimize filtering, pagination, and analytics

---

### 3. Custom Migration System

Implemented a lightweight migration system with:

- migration files
- migrations tracking table
- sequential execution

Ensures:

- idempotent schema changes
- reproducible environments

---

### 4. Data Modeling

**Employees Table**

- id
- first_name
- last_name
- email
- job_title
- department
- country
- salary
- is_active (soft delete)
- created_at

Key decisions:

- Added `department` → enables meaningful insights
- Added `email` → realistic employee identity
- Used `is_active` → soft delete for data safety

---

### 5. Query Design

#### Pagination + Filtering + Search

All handled server-side:

```text
search + filters + pagination → single query
```

- search on first_name + last_name (LIKE)
- filters: country, department
- pagination: limit + offset
- total count returned for UI pagination

---

### 6. Indexing

Added indexes on:

- country
- job_title
- partial index on active employees (`is_active = 1`)

Improves:

- filtering performance
- analytics queries

---

### 7. Validation Strategy

Used Joi at controller level for:

- query params (pagination, filters, search)
- request bodies

Service layer remains clean and focused on business logic.

---

### 8. Testing Strategy

- Unit tests → service layer (mocked repository)
- Integration tests → API + DB behavior

Ensures:

- correctness
- deterministic behavior
- fast execution

---

### 9. Analytics Module

Implemented a dedicated analytics module:

```text
GET /analytics/salary
```

Supports:

- avg salary
- min salary
- max salary
- optional filters (country, department)

Designed for future extensibility (grouped analytics, charts).

---

## Frontend Design

### 1. Architecture

Structured for clarity and scalability:

```text
pages/
components/
services/
constants/
utils/
layout/
```

---

### 2. Layout

Used Mantine `AppShell`:

- Sidebar navigation (Dashboard, Employees)
- Header for branding

Chosen because:

- scalable for dashboards
- consistent with real-world SaaS UI

---

### 3. API Layer Separation

```text
api.js → axios client
employee.api.js → employee APIs
analytics.api.js → analytics APIs
```

Benefits:

- avoids duplication
- clean abstraction
- easier refactoring

---

### 4. Employees Page

Features:

- Table view with structured columns
- Create, Edit, Delete (modal-based UX)
- Search (debounced)
- Filters (country, department)
- Pagination (server-side)
- Page size control (10, 20, 50, 100)

All data operations are:

```text
server-driven (no client-side filtering)
```

---

### 5. Form Design

Used a reusable modal:

```text
EmployeeFormModal → handles create + edit
```

Benefits:

- no duplication
- consistent validation
- easier maintenance

---

### 6. UX Improvements

- Loading states (loader / overlay)
- Error banners (Alert component)
- Debounced search (prevents API spam)
- Pagination reset on filter/search change

---

### 7. Dashboard

Implemented salary insights UI:

- summary cards (avg, min, max salary)
- filters (country, department)
- dynamic API-driven updates

Focus:

- simplicity
- clarity
- responsiveness

---

## Data Seeding

Implemented a performant seed script:

- Generates 10,000 employees
- Uses faker for realistic data
- Controlled domain values (department, country)
- Batch inserts using transactions
- Progress logging

Ensures:

- fast execution
- reproducibility
- realistic dataset for testing UI/analytics

---

## Trade-offs

- No authentication (out of scope)
- SQLite instead of Postgres (simplicity over scalability)
- Analytics kept minimal (avg/min/max only)
- No caching layer (acceptable for dataset size)
- Frontend state managed locally (no global state library)

---

## Future Improvements

- Add grouped analytics (country/department charts)
- Introduce caching for analytics queries
- Add sorting support in table
- Add authentication and role-based access
- Move to Postgres for production-scale datasets

---
