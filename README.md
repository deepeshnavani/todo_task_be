Todo App – Backend (Node.js + Express)
Features

- User Signup / Login (JWT Auth)
- CRUD APIs for tasks
- Middleware for protected routes
- CORS-enabled for frontend communication

Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL database)
- jsonwebtoken
- bcrypt
- dotenv

Setup Instructions
1. Clone the repo:
git clone <your-repo-url>
cd backend
2. Install dependencies:
npm install
3. Configure environment variables:

Create a .env file with:
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
JWT_SECRET=<your-secret-key>

4. Start the server:
node index.js
5. API available at:
http://localhost:5000
API Endpoints Summary

- POST /api/signup – Create user
- POST /api/login – Login user
- GET /api/todos – Get user tasks (auth required)
- POST /api/todos – Add task (auth required)
- PUT /api/todos/:id – Update task (auth required)
- DELETE /api/todos/:id – Delete task (auth required)

Database (Supabase)

- users table: stores email, name, hashed password
- todos table: stores task name, due date, user_id (foreign key)

Authentication

- JWT is issued on login and sent in headers for protected routes.
- Frontend stores JWT in localStorage.

