// ============================================
//   server.js  —  Entry Point
// ============================================
//
//   This is where the Express app is created
//   and started. Think of this as the "main"
//   file of the project.
//
//   Flow:
//   1. Load environment variables from .env
//   2. Create the Express app
//   3. Add middleware (cors, json parser)
//   4. Register routes
//   5. Start listening on a port
// ============================================

// Step 1: Load .env variables (must be first!)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import our student routes
const studentRoutes = require("./routes/studentRoutes");

// Step 2: Create the Express application
const app = express();

// Step 3: Middleware
// cors()        → allows requests from other origins (e.g. a frontend app)
// express.json() → allows the app to read JSON from request body
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────
//   Step 4: Routes
// ─────────────────────────────────────────

// A simple test route — visit http://localhost:3000/
app.get("/", (req, res) => {
  res.json({
    message: "✅ Express CRUD API is running!",
    endpoints: {
      getAllStudents:    "GET    /api/students",
      getOneStudent:    "GET    /api/students/:id",
      createStudent:    "POST   /api/students",
      updateStudent:    "PUT    /api/students/:id",
      deleteStudent:    "DELETE /api/students/:id",
    },
  });
});

// All routes starting with /api/students → handled by studentRoutes
app.use("/api/students", studentRoutes);

// ─────────────────────────────────────────
//   Handle unknown routes (404)
// ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found`,
  });
});

// ─────────────────────────────────────────
//   Step 5: Start the server
// ─────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 API base URL: http://localhost:${PORT}/api/students\n`);
});
