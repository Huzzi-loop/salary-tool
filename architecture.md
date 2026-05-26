## Overview

Built a minimal salary management system focusing on clean backend architecture, efficient data handling, and meaningful insights for HR managers.

## Tech Choices

- Node.js + Express for simplicity and flexibility
- SQLite for lightweight local database

## Design Decisions

### 1. Raw SQL over ORM

Chose raw SQL to maintain control over queries and avoid ORM overhead.

### 2. Migration System

Implemented a lightweight migration system with tracking to ensure idempotent schema evolution.

### 3. Layered Architecture

Used repository → service → controller pattern for separation of concerns.

## Data Model

Added `department` field to enable more meaningful salary insights such as departmental salary distribution.
Kept schema simple to avoid overengineering.

## Trade-offs

- Did not implement authentication (not required for assignment)
- Used SQLite instead of Postgres for simplicity
- Migration system is simplified (can be extended with versioning)
