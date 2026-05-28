# 💼 Salary Management Tool

A full-stack HR dashboard to manage employees and analyze salary data.

This application enables HR teams to:

- Manage employee records efficiently
- Search, filter, and paginate large datasets
- View salary insights through a simple dashboard

---

## 🚀 Features

### 👥 Employee Management

- Create, edit, and delete employees (soft delete)
- Search employees by name
- Filter by:
  - Country
  - Department

- Server-side pagination
- Adjustable page size (10 / 20 / 50 / 100)

---

### 📊 Dashboard

- View salary insights:
  - Average salary
  - Minimum salary
  - Maximum salary

- Filter insights by:
  - Country
  - Department

- Real-time updates based on selection

---

## 🛠 Tech Stack

### Backend

- Node.js + Express
- SQLite (`better-sqlite3`)
- Joi (validation)
- Raw SQL (no ORM)

### Frontend

- React + Vite
- Mantine UI
- Axios
- React Router

---

## 📂 Project Structure

```text
backend/   → Express API + database + seed script
frontend/  → React application (UI)
```

---

## ⚙️ Setup Instructions

### 1. Install root dependencies

```bash
npm install
```

Installs shared dev dependencies (e.g., `concurrently`)

---

### 2. Install frontend + backend dependencies

```bash
npm run install:all
```

---

### 3. Run the application

```bash
npm run dev
```

This starts both services concurrently:

- Frontend → http://localhost:5173
- Backend → http://localhost:3000

---

## 🌱 Seed Data

Populate the database with 10,000 employees:

```bash
cd backend
npm run seed
```

---

## 🔌 API Overview

### Employees

```http
GET    /employees
POST   /employees
PUT    /employees/:id
DELETE /employees/:id
```

Supports:

- `limit`, `offset` → pagination
- `search` → name search
- `country`, `department` → filtering

---

### Analytics

```http
GET /analytics/salary
```

Returns:

- average salary
- minimum salary
- maximum salary

Supports optional filters:

- `country`
- `department`

---

## 📌 Notes

- Designed to handle large datasets efficiently (10k+ employees)
- All filtering, search, and pagination are handled server-side
- Uses soft delete (`is_active`) for safer data operations
- Clean separation between frontend and backend

---

## 📄 Architecture

See `architecture.md` for detailed design decisions and trade-offs.

---
