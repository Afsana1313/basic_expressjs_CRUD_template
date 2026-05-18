// // ============================================
// //   routes/studentRoutes.js
// // ============================================
// //
// //   Routes define the URL endpoints and which
// //   HTTP method (GET, POST, PUT, DELETE) they
// //   respond to.
// //
// //   This file just maps URLs → controller functions.
// //   The actual logic lives in the controller.
// //
// //   CRUD → HTTP Method mapping:
// //     C = Create  →  POST
// //     R = Read    →  GET
// //     U = Update  →  PUT
// //     D = Delete  →  DELETE
// // ============================================

// const express = require("express");
// const router = express.Router();

// // ============================================
// //   FAKE DATA — used while DB is not ready
// //   Once your DB is connected, move this to
// //   the controller and use db.query() instead
// // ============================================

// let students = [
//   {
//     id: 2223001,
//     name: "Alice Rahman",
//     email: "alice@example.com",
//     gpa: 3.5,
//     department: "CSE",
//     age: 21
//   },
//   {
//     id: 2223002,
//     name: "Bob Hossain",
//     email: "bob@example.com",
//     gpa: 3.3,
//     department: "CSE",
//     age: 22
//   },
//   {
//     id: 2223004,
//     name: "Sara Begum",
//     email: "sara@example.com",
//     gpa: 3.7,
//     department: "EEE",
//     age: 20
//   },
//   {
//     id: 2223005,
//     name: "Rahim Chowdury",
//     email: "rahim@example.com",
//     gpa: 3.5,
//     department: "ME",
//     age: 23
//   },
//   {
//     id: 2223007,
//     name: "Nadia Islam",
//     email: "nadia@example.com",
//     department: "CE",
//     gpa: 3.2,
//     age: 21
//   }
// ];

// // ─────────────────────────────────────────
// //   Define Routes
// // ─────────────────────────────────────────

// // GET /api/students → get all students
// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     count: students.length,
//     data: students
//   });
// });

// // GET /api/students/:id → get one student by ID
// router.get("/:id", (req, res) => {
//   const student = students.find((s) => s.id === parseInt(req.params.id));

//   if (!student) {
//     return res.status(404).json({
//       success: false,
//       message: `Student with ID ${req.params.id} not found`
//     });
//   }

//   res.status(200).json({ success: true, data: student });
// });

// // POST /api/students → create a new student
// router.post("/", (req, res) => {
//   const { name, email, age, department, gpa } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({
//       success: false,
//       message: "Name and email are required"
//     });
//   }

//   const newStudent = {
//     id: students[students.length - 1].id + 1,
//     name,
//     email,
//     department,
//     gpa,
//     age
//   };

//   students.push(newStudent);

//   res.status(201).json({
//     success: true,
//     message: "Student created successfully",
//     data: newStudent
//   });
// });

// // PUT /api/students/:id → update a student by ID
// router.put("/:id", (req, res) => {
//   const index = students.findIndex((s) => s.id === parseInt(req.params.id));

//   if (index === -1) {
//     return res.status(404).json({
//       success: false,
//       message: `Student with ID ${req.params.id} not found`
//     });
//   }

//   students[index] = { ...students[index], ...req.body };

//   res.status(200).json({
//     success: true,
//     message: "Student updated successfully",
//     data: students[index]
//   });
// });

// // DELETE /api/students/:id → delete a student by ID
// router.delete("/:id", (req, res) => {
//   const index = students.findIndex((s) => s.id === parseInt(req.params.id));

//   if (index === -1) {
//     return res.status(404).json({
//       success: false,
//       message: `Student with ID ${req.params.id} not found`
//     });
//   }

//   students.splice(index, 1);

//   res.status(200).json({
//     success: true,
//     message: `Student with ID ${req.params.id} deleted`
//   });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

// GET all students
router.get("/", getAllStudents);

// GET one student
router.get("/:id", getStudentById);

// CREATE student
router.post("/", createStudent);

// UPDATE student
router.put("/:id", updateStudent);

// DELETE student
router.delete("/:id", deleteStudent);

module.exports = router;
