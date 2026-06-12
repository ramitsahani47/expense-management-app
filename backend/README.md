# Expense Tracker Backend API

A scalable REST API for the Expense Tracker application built using Node.js, Express.js, TypeScript, and PostgreSQL.

## Features

* Layered Architecture
* RESTful APIs
* PostgreSQL Integration
* Authentication Module
* Validation Middleware
* Global Error Handling
* Async Error Handling
* CRUD Operations

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Zod
* dotenv

## Architecture

```text
Route
 ↓
Validation Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

## Project Structure

```text
src/
├── config/
│   └── db.ts
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── routes/
│
├── validations/
│
├── middlewares/
│   ├── validate.middleware.ts
│   └── error.middleware.ts
│
├── utils/
│   ├── asyncHandler.ts
│   ├── ApiResponse.ts
│   └── ApiError.ts
│
├── types/
│
├── app.ts
└── server.ts
```

## API Endpoints

### Expense APIs

```http
GET    /api/expenses

GET    /api/expenses/:id

POST   /api/expenses

PUT    /api/expenses/:id

DELETE /api/expenses/:id
```

### Auth APIs

```http
POST /api/auth/register

POST /api/auth/login
```

## Installation

```bash
git clone <repository-url>

cd backend

npm install

npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
DB_USER=postgres
DB_PASSWORD=your_password
```

## Database

PostgreSQL

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Expenses Table

```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Author

Ramit Sahani

Backend Stack:
Node.js • Express.js • PostgreSQL • TypeScript
