// ============================================
//   routes/studentRoutes.js
// ============================================
//
//   Routes define the URL endpoints and which
//   HTTP method (GET, POST, PUT, DELETE) they
//   respond to.
//
//   This file just maps URLs → controller functions.
//   The actual logic lives in the controller.
//
//   CRUD → HTTP Method mapping:
//     C = Create  →  POST
//     R = Read    →  GET
//     U = Update  →  PUT
//     D = Delete  →  DELETE
// ============================================

const express = require("express");
const router = express.Router();

// Import all controller functions
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// ─────────────────────────────────────────
//   Define Routes
// ─────────────────────────────────────────

// GET    /api/students        → get all students
router.get("/", getAllStudents);

// GET    /api/students/:id    → get one student by ID
router.get("/:id", getStudentById);

// POST   /api/students        → create a new student
router.post("/", createStudent);

// PUT    /api/students/:id    → update a student by ID
router.put("/:id", updateStudent);

// DELETE /api/students/:id    → delete a student by ID
router.delete("/:id", deleteStudent);

module.exports = router;
