# 📚 Express.js CRUD Template
### A beginner-friendly REST API with Node.js, Express, and MySQL

---

## 📁 Project Structure

```
crud-template/
│
├── config/
│   └── db.js                 ← Database connection
│
├── controllers/
│   └── studentController.js  ← Business logic (CRUD functions)
│
├── routes/
│   └── studentRoutes.js      ← URL endpoint definitions
│
├── .env.example              ← Sample environment variables
├── database.sql              ← SQL to set up the database
├── package.json              ← Project dependencies
└── server.js                 ← Main entry point (start here)
```

---

## 🚀 Getting Started

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Set up the database
1. Open **phpMyAdmin** → `http://localhost/phpmyadmin`
2. Click the **SQL** tab
3. Paste the contents of `database.sql` and click **Go**

### Step 3 — Configure environment variables
```bash
# Copy the example file
copy .env.example .env       # Windows
cp .env.example .env         # Mac/Linux

# Then open .env and fill in your MySQL password
```

### Step 4 — Start the server
```bash
# Normal start
npm start

# Development mode (auto-restarts on file change)
npm run dev
```

### Step 5 — Test it
Open your browser and visit: `http://localhost:3000`

---

## 🔗 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student by ID |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

---

## 📬 Testing with Postman

### GET all students
```
GET http://localhost:3000/api/students
```

### GET one student
```
GET http://localhost:3000/api/students/1
```

### POST — create student
```
POST http://localhost:3000/api/students
Content-Type: application/json

{
  "name": "Afsana Islam",
  "email": "afsana@example.com",
  "age": 21
}
```

### PUT — update student
```
PUT http://localhost:3000/api/students/1
Content-Type: application/json

{
  "name": "Afsana Islam Updated",
  "email": "afsana@example.com",
  "age": 22
}
```

### DELETE — delete student
```
DELETE http://localhost:3000/api/students/1
```

---

## 💡 Key Concepts for Students

| Concept | Where to see it |
|---------|----------------|
| Express Router | `routes/studentRoutes.js` |
| Controller pattern | `controllers/studentController.js` |
| MySQL connection pool | `config/db.js` |
| async/await | Every function in the controller |
| Environment variables | `.env` + `dotenv` in `server.js` |
| HTTP status codes | All controller responses |
| SQL parameterized queries | `WHERE id = ?` in controller |
# basic_expressjs_CRUD_template
