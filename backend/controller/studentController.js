import User from '../model/user.js';
import Marks from '../model/marks.js';
import Attendance from "../model/attendance.js"; 
import { predictStudent } from './predictionController.js';
import axios from "axios";
export const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Student Details
    const student = await User.findById(id);
console.log(student);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Marks
    const marks = await Marks.find({
      studentId: id,
    });
console.log(marks);
    let totalMarks = 0;

    marks.forEach((mark) => {
      totalMarks += mark.total || 0;
    });
// console.log(totalMarks);
    const averageMarks =
      marks.length > 0 ? totalMarks / marks.length : 0;

    // Example CGPA Calculation
    const cgpa = (averageMarks / 10).toFixed(2);
// console.log(cgpa);
    // Attendance
    const attendanceData = await Attendance.find({
      "students.studentId": id,
    });
// console.log(attendanceData);
    let totalClasses = 0;
    let presentClasses = 0;

    attendanceData.forEach((record) => {
      record.students.forEach((item) => {
        if (item.studentId.toString() === id) {
          totalClasses++;

          if (item.status === "Present") {
            presentClasses++;
          }
       }
      });
    });

    const attendance =
      totalClasses > 0
        ? ((presentClasses / totalClasses) * 100).toFixed(2)
        : 0;
let response;

        try{
response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
            attendance,
            assignment: marks[0].assignment,
            midterm: marks[0].midterm,
            endterm: marks[0].endterm,
            internal: marks[0].internal,
            cgpa
        }
    );
}
catch(err){
  console.log("Errror:",err);
}
 const prediction=response.data.prediction;

    res.json({
      ...student.toObject(),

     
      cgpa,
      totalMarks,
      marks,
      attendance,
      prediction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
