# Agadir Task Manager 2025 - Backend API

##  Project Overview
A task management API for Agadir citizens to manage daily tasks (appointments, studies, administrative procedures, etc.).

##  Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT + Bcrypt
- **Language:** JavaScript

##  Installation

### Prerequisites
- Node.js v14+
- PostgreSQL
- npm

### Steps
```bash
# Clone repository
git clone https://github.com/wiissal/agadir-task-manager.git
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure database in .env
DB_USER=postgres
DB_PASS=your_password
DB_NAME=agadir_task_manager
DB_HOST=127.0.0.1
JWT_SECRET=your_secret_key

# Start server
npm start
```

Server runs on: `http://localhost:5000`

##  API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
Response: { user, token }
```

#### Login User
```
POST /api/auth/login
Body: { email, password }
Response: {
  "user": { "id": 1, "name": "Wissal", "email": "wissal@gmail.com" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Tasks (Requires JWT Token)

#### Get All Tasks
```
GET /api/tasks
Headers: Authorization: Bearer <token>
Response: { tasks }
```

#### Create Task
```
POST /api/tasks
Headers: Authorization: Bearer <token>
Body: { title, description, due_date }
Response: { task }
```

#### Update Task
```
PUT /api/tasks/:id
Headers: Authorization: Bearer <token>
Body: { title, description, due_date, status }
Response: { task }
```

#### Mark Task as Done
```
PATCH /api/tasks/:id/done
Headers: Authorization: Bearer <token>
Response: { task }
```

#### Delete Task
```
DELETE /api/tasks/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

##  Database Schema

### Users Table
- `id` (INT, Primary Key)
- `name` (STRING, Required)
- `email` (STRING, Unique, Required)
- `password` (STRING, Hashed, Required)
- `created_at` (DATETIME)

### Tasks Table
- `id` (INT, Primary Key)
- `user_id` (INT, Foreign Key)
- `title` (STRING, Required)
- `description` (TEXT)
- `status` (ENUM: 'pending', 'done')
- `due_date` (DATETIME)
- `created_at` (DATETIME)

##  Security
-  Passwords hashed with Bcrypt
- JWT token authentication
-  Protected routes with middleware
-  CORS enabled

##  Project Structure
```
backend/
├── config/
│   └── config.json
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── index.js
│   ├── user.js
│   └── task.js
├── routes/
│   ├── auth.js
│   └── tasks.js
├── .env
├── package.json
└── server.js
```

##  Testing with Postman
All endpoints have been tested and documented in Postman. View the complete API documentation here:
[Postman API Documentation](https://wissaloa1-1100130.postman.co/workspace/Wissal-Oa's-Workspace~8e0a797f-51f4-4ef2-8f75-ef6fcbda6dde/documentation/48967576-190b7227-872b-4295-ba85-84c6a7547d15)

You can test all endpoints directly from the documentation link.

## Features Completed
✅ User Registration with password hashing
✅ User Login with JWT token generation
✅ Create, Read, Update, Delete tasks
✅ Mark tasks as done
✅ User-specific task filtering
✅ Token-based authentication
✅ Error handling & validation

##  Future Improvements
- React Native mobile app
- Task filtering & sorting
- Notifications
- Task categories
- Recurring tasks
