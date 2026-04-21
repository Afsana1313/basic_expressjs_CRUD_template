// ============================================
//   controllers/studentController.js
// ============================================
//
//   Controllers handle the LOGIC of each route.
//   Each function here does ONE specific job:
//     - Get all students
//     - Get one student by ID
//     - Create a new student
//     - Update an existing student
//     - Delete a student
//
//   We separate this from routes to keep code
//   clean and easy to maintain.
// ============================================

const db = require("../config/db");

// ─────────────────────────────────────────
//   GET ALL STUDENTS
//   GET /api/students
// ─────────────────────────────────────────
const getAllStudents = async (req, res) => {
  try {
    // Run the SQL query — returns [rows, fields]
    const [rows] = await db.query("SELECT * FROM students ORDER BY id DESC");

    // Send the result as JSON
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    // If anything goes wrong, send an error response
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
//   GET ONE STUDENT BY ID
//   GET /api/students/:id
// ─────────────────────────────────────────
const getStudentById = async (req, res) => {
  try {
    // req.params.id gets the :id from the URL
    // e.g. GET /api/students/5  →  req.params.id = "5"
    const { id } = req.params;

    // Use a parameterized query (?) to prevent SQL injection
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    // If no student found with that ID
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0], // rows[0] = first (and only) result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
//   CREATE A NEW STUDENT
//   POST /api/students
// ─────────────────────────────────────────
const createStudent = async (req, res) => {
  try {
    // req.body contains the data sent in the request body (JSON)
    // e.g. { "name": "Afsana", "email": "afsana@example.com", "age": 21 }
    const { name, email, age } = req.body;

    // Basic validation — make sure required fields are provided
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Insert into database
    const [result] = await db.query(
      "INSERT INTO students (name, email, age) VALUES (?, ?, ?)",
      [name, email, age]
    );

    // result.insertId gives us the ID of the newly created row
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: {
        id: result.insertId,
        name,
        email,
        age,
      },
    });
  } catch (error) {
    // Handle duplicate email error (MySQL error code 1062)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A student with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
//   UPDATE A STUDENT
//   PUT /api/students/:id
// ─────────────────────────────────────────
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // First check if the student exists
    const [existing] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`,
      });
    }

    // Update the record
    await db.query(
      "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, id]
    );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: { id: parseInt(id), name, email, age },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────
//   DELETE A STUDENT
//   DELETE /api/students/:id
// ─────────────────────────────────────────
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // First check if the student exists
    const [existing] = await db.query("SELECT * FROM students WHERE id = ?", [id]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`,
      });
    }

    // Delete the record
    await db.query("DELETE FROM students WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: `Student with ID ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

// Export all functions so routes can use them
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
