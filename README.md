# Tasks API - Documentation

## Base URL
http://localhost:3000

## Authentication
All task endpoints require a Bearer token in the Authorization header:
Authorization: Bearer <token>

---

## Auth Endpoints

### Register
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{ "message": "Usuario creado" }
```

### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{ "token": "eyJhbGci..." }
```

---

## Task Endpoints

### Create Task
- **POST** `/api/tasks`
- **Auth required:** Yes
- **Body:**
```json
{
  "title": "My task",
  "description": "Task description",
  "status": "pending",
  "due_date": "2026-06-01"
}
```
- **Response:**
```json
{ "message": "Task created" }
```

### Get All Tasks
- **GET** `/api/tasks`
- **Auth required:** Yes
- **Optional filters:**
  - `/api/tasks?status=pending`
  - `/api/tasks?due_date=2026-06-01`
- **Response:** Array of tasks

### Get One Task
- **GET** `/api/tasks/:id`
- **Auth required:** Yes
- **Response:** Single task object

### Update Task
- **PUT** `/api/tasks/:id`
- **Auth required:** Yes
- **Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in_progress",
  "due_date": "2026-06-15"
}
```
- **Response:**
```json
{ "message": "Task updated" }
```

### Delete Task
- **DELETE** `/api/tasks/:id`
- **Auth required:** Yes
- **Response:**
```json
{ "message": "Task deleted" }
```

---

## Error Responses
All errors follow this format:
```json
{
  "error": true,
  "message": "Description of the error"
}
```

## Status Values
Tasks can have one of these status values:
- `pending`
- `in_progress`
- `done`

---

## Project Structure
```
src/
  app.js
  config/
    db.js
  controllers/
    authController.js
    taskController.js
  routes/
    authRoutes.js
    taskRoutes.js
  middlewares/
    authMiddleware.js
```
