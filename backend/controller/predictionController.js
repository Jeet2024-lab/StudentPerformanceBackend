import User from "../model/user.js";
import Marks from "../model/marks.js";
import Attendance from "../model/attendance.js";
import axios from "axios";

export const predictStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Validate request
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required."
      });
    }

    // Find student
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found."
      });
    }

    // Get all marks of student
    const marks = await Marks.find({ studentId });

    if (marks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No marks found for this student."
      });
    }

    // Attendance calculation
    const attendanceRecords = await Attendance.find({
      "students.studentId": studentId,
    });

    let totalClasses = 0;
    let presentClasses = 0;

    attendanceRecords.forEach((record) => {
      record.students.forEach((studentRecord) => {
        if (studentRecord.studentId.toString() === studentId) {
          totalClasses++;

          if (studentRecord.status === "Present") {
            presentClasses++;
          }
        }
      });
    });

    const attendance =
      totalClasses > 0
        ? Number(((presentClasses / totalClasses) * 100).toFixed(2))
        : 0;

    // Marks calculation
    let totalAssignment = 0;
    let totalMidterm = 0;
    let totalEndterm = 0;
    let totalInternal = 0;
    let totalMarks = 0;

    marks.forEach((mark) => {
      totalAssignment += mark.assignment || 0;
      totalMidterm += mark.midterm || 0;
      totalEndterm += mark.endterm || 0;
      totalInternal += mark.internal || 0;
      totalMarks += mark.total || 0;
    });

    const count = marks.length;

    const assignment = Number((totalAssignment / count).toFixed(2));
    const midterm = Number((totalMidterm / count).toFixed(2));
    const endterm = Number((totalEndterm / count).toFixed(2));
    const internal = Number((totalInternal / count).toFixed(2));
    const averageMarks = Number((totalMarks / count).toFixed(2));
    const cgpa = Number((averageMarks / 10).toFixed(2));

    // Data sent to ML Model
    const payload = {
      attendance,
      assignment,
      midterm,
      endterm,
      internal,
      cgpa,
    };

    console.log("Prediction Payload:", payload);

    // Call ML Model API
    const mlResponse = await axios.post(
      "https://mlmodelai-1.onrender.com/predict",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 600000,
      }
    );

    return res.status(200).json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        enrollment: student.enrollment,
      },
      input: payload,
      prediction: mlResponse.data.prediction,
      confidence: mlResponse.data.confidence,
      recommendation: mlResponse.data.recommendation,
    });

  } catch (error) {
    console.error("Prediction Error:", error);

    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: "ML Model returned an error.",
        error: error.response.data,
      });
    }

    if (error.request) {
      return res.status(502).json({
        success: false,
        message: "Unable to connect to the ML prediction service.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};