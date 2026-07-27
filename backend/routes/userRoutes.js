import express from "express"
import {createUser,loginUser,facultyStudents,saveMarks,saveAttendance,getSubjects,addSubject,deleteSubject,getPerformance,predictStudent,getStudentProfile,getMarks} from '../controller/userController.js'

const router=express.Router();

router.post("/createuser",createUser);
router.post("/loginuser",loginUser);

export default router;