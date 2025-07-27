# Inno Task Tracker (NestJS + MongoDB)

A tiny 5-endpoint assignment to evaluate your NestJS basics. You have **5 days** to submit a PR.

## Goal

Implement 3 task-related APIs so that **all existing tests pass**.

## Tech Stack

- NestJS (TypeScript)
- MongoDB (via Mongoose)
- Jest + Supertest
- Swagger (`/docs`)
- Docker & docker-compose for a consistent environment

## Endpoints

### Implemented for you
- **GET /health** → `{ "status": "ok" }`
- **POST /auth/signup** → create a user (email/password)

### You must implement
1. **POST /tasks** – create a task
    - Body: `{ title: string, description?: string, dueDate?: ISODateString, status?: "OPEN"|"IN_PROGRESS"|"DONE" }`
    - Default `status` = `OPEN`
2. **GET /tasks** – list tasks with filters & pagination
    - Query params:
        - `status?` (enum)
        - `dueFrom?`, `dueTo?` (ISO date strings)
        - `search?` (case-insensitive partial match on title)
        - `page?` (default 1), `limit?` (default 10)
    - Return shape:
      ```json
      {
        "data": [],
        "meta": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 }
      }
      ```
3. **PATCH /tasks/:id/status** – update only status

> All tests for these endpoints are already written. Do **not** change tests.

## How to Run (Docker)

1. Copy `.env.example` → `.env` (edit if needed)
2. Start app:
   ```bash
   docker compose up --build

3. Visit:
   ```bash
   - API: http://localhost:3000/health
   - Swagger: http://localhost:3000/docs

4. Run Tests in Docker

   Option 1: use dedicated compose file
    ```bash
    docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
    docker compose -f docker-compose.test.yml down
   ```

   Option 2: reuse running dev container
   ```bash
   docker compose exec api npm test
   ```

All tests must pass ✅

## Acceptance Criteria

- All provided Jest tests pass (no need to add new tests).

- Do not break existing endpoints.

- Submit as a GitHub Pull Request to the provided repository URL.

- Keep changes scoped to tasks module unless necessary.

- Keep code clean & idiomatic.


## Advanced Management Techniques

To ensure a robust, production-ready API, you may choose to implement:

- Authorization (e.g., JWT, role‑based access control)

- Rate limiting

- Caching

- Logging & monitoring


Good luck!
