# Expense Tracker App

A full-stack Expense Tracker application built using React Native, TypeScript, Node.js, Express.js, and PostgreSQL.

This project helps users manage their daily expenses by providing features such as expense creation, updating, deletion, and tracking through a mobile application backed by a scalable REST API.

---

## Features

### Mobile Application

* Add Expenses
* View Expense List
* Update Expenses
* Delete Expenses
* Form Validation
* REST API Integration
* TypeScript Support

### Backend API

* RESTful API Architecture
* Layered Architecture
* PostgreSQL Database
* Validation Middleware
* Global Error Handling
* Async Error Handling
* CRUD Operations
* Authentication Module (In Progress)

---

## Tech Stack

### Frontend

* React Native
* Expo
* TypeScript
* React Navigation
* Axios

### Backend

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Zod
* dotenv

### Database

* PostgreSQL

---

## Architecture

```text
Client (React Native)
        ↓
Routes
        ↓
Validation Middleware
        ↓
Controllers
        ↓
Services
        ↓
Repositories
        ↓
PostgreSQL Database
```

---

## Backend Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │
│   ├── services/
│   │
│   ├── repositories/
│   │
│   ├── routes/
│   │
│   ├── validations/
│   │
│   ├── middlewares/
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   ├── ApiResponse.ts
│   │   └── ApiError.ts
│   │
│   ├── types/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## Frontend Project Structure

```text
frontend/
│
├── src/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   └── utils/
│
├── App.tsx
├── package.json
└── tsconfig.json
```

---

## API Endpoints

### Expenses

```http
GET    /api/expenses

GET    /api/expenses/:id

POST   /api/expenses

PUT    /api/expenses/:id

DELETE /api/expenses/:id
```

### Authentication

```http
POST /api/auth/register

POST /api/auth/login
```

---

## Database Schema

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

---

## Environment Variables

Create a `.env` file inside the backend project.

```env
PORT=5000

DB_HOST=localhost

DB_PORT=5432

DB_NAME=expense_tracker

DB_USER=postgres

DB_PASSWORD=your_password
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npx expo start
```

---

## Current Implementations

* PostgreSQL Integration
* Express REST APIs
* CRUD Operations
* Layered Architecture
* Validation Middleware
* Error Middleware
* Async Handler
* ApiResponse Utility
* ApiError Utility
* Authentication Module (In Progress)

---

## Future Improvements

* JWT Authentication
* Protected Routes
* Password Hashing (bcrypt)
* User-Specific Expenses
* Expense Categories
* Charts & Analytics
* Pagination
* Search & Filtering
* Dark Mode

---

## Author

Ramit Sahani

### Skills Used

React Native • Expo • TypeScript • Node.js • Express.js • PostgreSQL • REST APIs
