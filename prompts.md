### Prompt to scaffold

You are a senior software engineer helping me scaffold a clean monorepo for a production-quality full-stack application.

Project: "Salary Management Tool"

### Tech Stack:

- Backend: Node.js (Express will be added later)
- Frontend: React with Vite (will be added later)

### Goal:

Set up a clean monorepo structure WITHOUT implementing business logic yet.

---

### Monorepo Requirements:

Create the following structure:

salary-tool/
backend/
frontend/

---

### Root Setup:

Create a root-level package.json using npm workspaces:

Requirements:

- Use "workspaces": ["backend", "frontend"]
- Add scripts:
  - "dev": run both backend and frontend concurrently
  - "backend": run backend dev script
  - "frontend": run frontend dev script

- Use "concurrently" as a dev dependency

---

### Backend (only structure, no implementation yet):

backend/
src/
routes/
controllers/
services/
repositories/
db/
middleware/
config/
tests/
seed/
migrations/
package.json (basic placeholder)
.env.example

---

### Frontend (only structure, no full app yet):

frontend/
src/
pages/
components/
services/
hooks/
utils/
package.json (basic placeholder)
.env.example

---

### Root-level files:

- README.md
  Include:
  - Project overview
  - Tech stack
  - Setup instructions
  - How to run frontend & backend

- .gitignore (Node + Vite standard)

- prompts.md
  (empty file to document AI prompts used later)

- architecture.md
  (empty placeholder for design decisions)

---

### Important Constraints:

- Do NOT implement Express app yet
- Do NOT initialize full React app yet
- Focus only on structure and setup
- Keep things minimal, clean, and extensible
- Avoid overengineering

---

### Output Required:

1. Folder structure (tree format)
2. Root package.json
3. Sample backend/package.json
4. Sample frontend/package.json
5. README.md content
6. .gitignore content

#### Prompt for backend setup

You are a senior backend engineer helping me set up a minimal Node.js backend.

Project: Salary Management Tool

### Goal:

Set up ONLY the basic backend with Express and Jest.
Do NOT include database, business logic, or complex structure yet.

---

### Requirements:

#### 1. Express Setup:

- Initialize a Node.js project inside the backend folder
- Install Express
- Create a minimal Express server:
  - app.js (or index.js)
  - Basic middleware (JSON parser)
  - A simple health check route: GET /health → returns { status: "ok" }

- Start server on a configurable PORT (use environment variable with fallback)

---

#### 2. Project Structure (keep it minimal for now):

backend/
src/
app.js (Express app)
server.js (starts the server)
tests/
package.json
.env.example

---

#### 3. Jest Setup:

- Install and configure Jest
- Add test script in package.json
- Create one sample test:
  - Test the /health endpoint

- Use a simple testing approach (supertest is allowed)

---

#### 4. Scripts:

Add scripts in package.json:

- "dev": start server with nodemon
- "start": start server normally
- "test": run jest

---

### Important Constraints:

- Keep everything minimal and clean
- Do NOT add database yet
- Do NOT add layered architecture yet
- Focus only on setup and testability
- Code should be easy to extend later

---

### Output Required:

1. Folder structure
2. package.json
3. app.js
4. server.js
5. sample test file
6. instructions to run backend
