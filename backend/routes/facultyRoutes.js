import express from "express";
import {
  facultyStudents,
  getPerformance,getFacultyById
} from "../controller/facultyController.js";
import { saveMarks, getMarks } from "../controller/marksController.js";
import { saveAttendance } from "../controller/attendanceController.js";
import {
  getSubjects,
  addSubject,
  deleteSubject,
} from "../controller/subjectController.js";

import { predictStudent } from "../controller/predictionController.js";

import { getStudentProfile } from "../controller/studentController.js";

const router = express.Router();

router.get("/students", facultyStudents);
router.post("/marks/:id", saveMarks);
router.post("/attendance", saveAttendance);
router.get("/subjects", getSubjects);

router.post("/subjects", addSubject);

router.delete("/subjects/:id", deleteSubject);
router.get("/performance", getPerformance);
router.post("/predict", predictStudent);
router.get("/:id", getFacultyById);

router.get("/student/:id", getStudentProfile);
router.get("/marks/:id", getMarks);

export default router;
