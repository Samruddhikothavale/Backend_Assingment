Backend + Frontend Web App (Authentication, RBAC, CRUD)

This project is a scalable MERN-based web application featuring secure JWT authentication, role-based access control (admin/user), and CRUD functionality for a secondary entity. It also includes a simple React frontend to interact with the API.


Backend (Node.js + Express + MongoDB Atlas)

User registration and login with password hashing
JWT authentication with protected routes ,
Role-based access control (Admin/User) ,
CRUD APIs for a secondary entity (Tasks/Notes/Products) ,
API versioning ,
Request validation middleware ,
Centralized error handling ,
Modular architecture (routes, controllers, middleware, config) ,
MongoDB Atlas integration .


Frontend (React)

Register and Login UI ,
JWT stored in localStorage ,
Protected Dashboard ,
CRUD UI for tasks/notes/products ,
Error and success message handling .



⚙️ Installation and Setup
Step 1: Clone the Repository
git clone your-repo-link
cd project-folder
________________________________________
🗄 Backend Setup
cd server
npm install
Create a .env file in server folder:
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
JWT_EXPIRE=1d
Start backend:
npm start
________________________________________
🎨 Frontend Setup
cd client
npm install
npm start
________________________________________
🔌 API Overview (Base URL: http://localhost:5000/api/v1)
Authentication APIs
POST /auth/register → Create new user
POST /auth/login → Login and get JWT token
Task APIs (Protected)
POST /tasks → Create task
GET /tasks → Get all tasks
PUT /tasks/:id → Update task
DELETE /tasks/:id → Delete task
________________________________________
🔒 Security Features
•	Password hashing using bcrypt
•	JWT-based token authentication
•	Middleware-based route protection
•	Role-based route authorization
•	Sanitized & validated request body
________________________________________
🌐 Deployment Options
Backend -Render
Frontend -Render
Database -MongoDB Atlas

