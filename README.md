# Agadir Task Manager 2025

A full-stack task management application for Agadir citizens to manage daily tasks (appointments, studies, administrative procedures, etc.).

---

## 📱 Project Overview

**Agadir Task Manager** is a mobile and web application that allows users to:
- Create an account and login securely
- Create, read, update, and delete tasks
- Track task status (pending/completed)
- View task history
- Manage daily activities efficiently

---

## 🛠️ Tech Stack

### **Backend**
- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT + Bcrypt
- **API Documentation:** Postman

### **Frontend**
- **Framework:** React Native
- **Development:** Expo
- **State Management:** React Context API
- **Navigation:** React Navigation
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **Styling:** React Native StyleSheet

### **DevOps & Version Control**
- **Version Control:** Git & GitHub
- **Methodology:** Agile (Scrum)
- **Project Management:** Jira

---

## 📁 Project Structure

```
agadir-task-management/
│
├── backend/
│   ├── config/                 # Database configuration
│   ├── controllers/            # Business logic
│   │   ├── authController.js   # User authentication
│   │   └── taskController.js   # Task operations
│   ├── middleware/             # Custom middleware
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/                 # Database models
│   │   ├── user.js            # User schema
│   │   └── task.js            # Task schema
│   ├── routes/                 # API endpoints
│   │   ├── auth.js            # Auth routes
│   │   └── tasks.js           # Task routes
│   ├── seeders/               # Database seeds
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── screens/           # All app screens
│   │   │   ├── HomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── TaskListScreen.js
│   │   │   ├── AddTaskScreen.js
│   │   │   └── TaskHistoryScreen.js
│   │   ├── navigation/        # Navigation logic
│   │   │   └── AppNavigator.js
│   │   ├── context/           # State management
│   │   │   └── AuthContext.js
│   │   ├── utils/             # Utilities
│   │   │   └── api.js         # Axios API instance
│   │   └── constants/         # App constants
│   │       └── colors.js      # Color palette
│   ├── App.js                 # Root component
│   ├── index.js               # Entry point
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js v14+
- PostgreSQL installed and running
- npm or yarn
- Git

### **Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# DB_USER=postgres
# DB_PASS=your_password
# DB_NAME=agadir_task_manager
# DB_HOST=127.0.0.1
# JWT_SECRET=your_secret_key
# PORT=5000

# Sync database
npm start
```

Backend runs on: `http://localhost:5000`

### **Frontend Setup**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Update API URL in src/utils/api.js
# Change: baseURL: 'http://192.168.0.228:5000/api'
# To your computer's IP address

# Start development server
npm start

# For Android
npm run android

# For iOS
npm run ios
```

---

## 📡 API Endpoints

### **Authentication**

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
Response: { user, token }
```

### **Tasks** (Requires JWT Token)

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

#### Delete Task
```
DELETE /api/tasks/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

---

## 🗄️ Database Schema

### **Users Table**
```sql
- id (INT, Primary Key)
- name (STRING, Required)
- email (STRING, Unique, Required)
- password (STRING, Hashed, Required)
- created_at (DATETIME)
- updated_at (DATETIME)
```

### **Tasks Table**
```sql
- id (INT, Primary Key)
- user_id (INT, Foreign Key)
- title (STRING, Required)
- description (TEXT)
- status (ENUM: 'pending', 'done')
- due_date (DATETIME)
- created_at (DATETIME)
- updated_at (DATETIME)
```

---

## 🔐 Security Features

- ✅ **Password Hashing:** bcrypt encryption
- ✅ **JWT Authentication:** Secure token-based auth
- ✅ **Protected Routes:** Middleware authentication
- ✅ **CORS Enabled:** Cross-origin requests allowed
- ✅ **Error Handling:** Comprehensive error responses

---

## 🎨 UI/UX Design

### **Color Palette**
- **Primary:** `#1B4D79` (Dark Blue)
- **Secondary:** `#467C3A` (Teal)
- **Accent:** `#7FDC88` (Green)
- **Light:** `#9FAD88` (Sage Green)
- **Lighter:** `#CBDF80` (Yellow-Green)

### **Screens**
1. **Splash Screen** - Welcome with branding
2. **Home Screen** - Login/Sign Up options
3. **Login Screen** - User authentication
4. **Register Screen** - Account creation
5. **Task List Screen** - View all tasks
6. **Add Task Screen** - Create new task
7. **Task History Screen** - Coming soon

---

## 📊 UML Diagrams

### **System Architecture Diagram**

```
┌─────────────┐
│   Client    │
│  (React     │
│  Native)    │
└──────┬──────┘
       │
       │ HTTP/REST (Axios)
       │
┌──────▼──────────────┐
│    API Gateway      │
│  (Express.js)       │
└──────┬──────────────┘
       │
       ├─────────────────────┬─────────────────────┐
       │                     │                     │
┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
│ Auth Routes │      │ Task Routes │      │  Middleware │
│             │      │             │      │  (JWT Auth) │
└──────┬──────┘      └──────┬──────┘      └─────────────┘
       │                    │
       └────────┬───────────┘
                │
        ┌───────▼────────┐
        │  Sequelize ORM │
        └───────┬────────┘
                │
        ┌───────▼────────┐
        │  PostgreSQL    │
        │  Database      │
        └────────────────┘
```

### **Data Flow Diagram**

```
User Input
    │
    ▼
┌─────────────────────────┐
│ Login/Register Screen   │
│ (Frontend)              │
└────────┬────────────────┘
         │
         │ Axios POST Request
         │ (email, password)
         ▼
┌─────────────────────────┐
│ Auth Routes             │
│ (Backend)               │
└────────┬────────────────┘
         │
         │ authController
         │
         ▼
┌─────────────────────────┐
│ User Model              │
│ - Hash password         │
│ - Generate JWT token    │
└────────┬────────────────┘
         │
         │ Save to DB
         │
         ▼
┌─────────────────────────┐
│ PostgreSQL Database     │
│ (Store user + token)    │
└────────┬────────────────┘
         │
         │ Return JWT token
         │
         ▼
┌─────────────────────────┐
│ AuthContext             │
│ (Frontend)              │
│ - Save token            │
│ - Set isLoggedIn=true   │
└────────┬────────────────┘
         │
         │ Navigation update
         │
         ▼
┌─────────────────────────┐
│ TaskListScreen          │
│ (Show protected content)│
└─────────────────────────┘
```

### **Entity Relationship Diagram (ERD)**

```
┌──────────────┐          ┌──────────────┐
│    Users     │          │    Tasks     │
├──────────────┤          ├──────────────┤
│ id (PK)      │◄────────►│ id (PK)      │
│ name         │ 1    *   │ user_id (FK) │
│ email        │          │ title        │
│ password     │          │ description  │
│ created_at   │          │ status       │
│ updated_at   │          │ due_date     │
└──────────────┘          │ created_at   │
                          │ updated_at   │
                          └──────────────┘

Relationship:
- One User can have Many Tasks
- One Task belongs to One User
```

### **Authentication Flow Diagram**

```
┌─────────────────────────────────────────────────────────┐
│                   Authentication Flow                   │
└─────────────────────────────────────────────────────────┘

1. USER REGISTRATION
   ┌──────────────────┐
   │ User fills form  │
   │ (name, email,    │
   │  password)       │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ Frontend sends   │
   │ POST /register   │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ Backend checks:  │
   │ User exists?     │
   └────────┬─────────┘
            │
            ├─→ YES → Error 400
            │
            └─→ NO
                │
                ▼
            ┌──────────────────┐
            │ Hash password    │
            │ with bcrypt      │
            └────────┬─────────┘
                     │
                     ▼
            ┌──────────────────┐
            │ Save user to DB  │
            └────────┬─────────┘
                     │
                     ▼
            ┌──────────────────┐
            │ Return success   │
            └──────────────────┘

2. USER LOGIN
   ┌──────────────────┐
   │ User fills form  │
   │ (email,          │
   │  password)       │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ Frontend sends   │
   │ POST /login      │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ Backend finds    │
   │ user by email    │
   └────────┬─────────┘
            │
            ├─→ NOT FOUND → Error 401
            │
            └─→ FOUND
                │
                ▼
            ┌──────────────────┐
            │ Compare password │
            │ with hash        │
            └────────┬─────────┘
                     │
                     ├─→ MISMATCH → Error 401
                     │
                     └─→ MATCH
                         │
                         ▼
                    ┌──────────────────┐
                    │ Generate JWT     │
                    │ token            │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Return token to  │
                    │ frontend         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Frontend saves   │
                    │ token in         │
                    │ AsyncStorage     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Update AuthCtx:  │
                    │ isLoggedIn=true  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Navigate to      │
                    │ TaskListScreen   │
                    └──────────────────┘

3. PROTECTED REQUEST (API Call)
   ┌──────────────────────┐
   │ Frontend makes       │
   │ request (GET /tasks) │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Axios adds token to  │
   │ Authorization header │
   │ "Bearer <token>"     │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ Backend receives     │
   │ request + token      │
   └──────────┬───────────┘
              │
              ▼
   ┌──────────────────────┐
   │ authMiddleware       │
   │ verifies token       │
   └──────────┬───────────┘
              │
              ├─→ INVALID → Error 401
              │
              └─→ VALID
                  │
                  ▼
            ┌──────────────────┐
            │ Extract user ID  │
            │ from token       │
            └──────────┬───────┘
                       │
                       ▼
            ┌──────────────────┐
            │ Process request  │
            │ (get user tasks) │
            └──────────┬───────┘
                       │
                       ▼
            ┌──────────────────┐
            │ Return response  │
            │ to frontend      │
            └──────────────────┘
```

---

## ✨ Features Completed

### **Backend**
- ✅ User Registration with password hashing
- ✅ User Login with JWT token generation
- ✅ Create, Read, Update, Delete tasks
- ✅ User-specific task filtering
- ✅ Token-based authentication
- ✅ Error handling & validation
- ✅ PostgreSQL database integration

### **Frontend**
- ✅ Home Screen with navigation
- ✅ Registration form with validation
- ✅ Login form with API integration
- ✅ Task list with dummy data
- ✅ Add task screen
- ✅ Bottom navigation
- ✅ AsyncStorage for token persistence
- ✅ Context API for state management
- ✅ Axios for API communication

---

## 🔄 Workflow

### **Git Workflow**
```
1. Create feature branch
   git checkout -b feature/name

2. Make changes & commit
   git add .
   git commit -m "feat: description"

3. Push to branch
   git push origin feature/name

4. Merge to main
   git checkout main
   git merge feature/name

5. Push to main
   git push origin main
```

### **Development Cycle**
- Daily standups with team
- Code reviews before merging
- Testing on Android & iOS
- Continuous deployment ready

---

## 📋 Testing with Postman

Import `Postman_Collection.json` and test all endpoints:

[View Postman Documentation](https://wissaloa1-1100130.postman.co/workspace/Wissal-Oa's-Workspace~8e0a797f-51f4-4ef2-8f75-ef6fcbda6dde/documentation/48967576-190b7227-872b-4295-ba85-84c6a7547d15)

---

## 🚀 Deployment

### **Backend Deployment**
- Deploy to Heroku, AWS, or DigitalOcean
- Use environment variables for secrets
- Enable HTTPS in production

### **Frontend Deployment**
- Build for production: `expo build`
- Deploy to Google Play Store & Apple App Store
- Use Expo Update for over-the-air updates

---

## 📞 Support & Contact

**Developed by:** Wissal Oa  
**Bootcamp:** SIMPLON Casablanca  
**Course:** Full-Stack Development (Mobile Focus)  
**Period:** December 2024 - January 2025

---

## 📄 License

This project is private and for educational purposes.

---

## 🎯 Next Steps

- [ ] Connect frontend to real backend API
- [ ] Implement task filtering & sorting
- [ ] Add task categories
- [ ] Add notifications
- [ ] Add recurring tasks
- [ ] Deploy to production
- [ ] User testing & feedback

---

**Last Updated:** December 10, 2025
