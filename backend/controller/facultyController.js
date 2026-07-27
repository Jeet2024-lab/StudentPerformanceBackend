import User from "../model/user.js";
import Marks from '../model/marks.js'
import Attendance from "../model/attendance.js";


export const facultyStudents = async (req, res) => {

    try {

        const { facultyId } = req.query;

        const students = await User.find({
            role: "student",
            facultyId
        }).select("name email enrollment semester branch");

        const result = [];

        for (const student of students) {
console.log(
    "Student:",
    student.name,
    student._id.toString()
);
            // Attendance
            const attendanceRecords = await Attendance.find({
                "students.studentId": student._id
            });
console.log(JSON.stringify(attendanceRecords));
            let totalClasses = 0;
            let presentClasses = 0;

            attendanceRecords.forEach(record => {
                const entry = record.students.find(
                    a => a.studentId.toString() === student._id.toString()
                );

                if (entry) {
                    totalClasses++;

                    if (entry.status === "Present") {
                        presentClasses++;
                    }
                }
            });

            const attendancePercentage =
                totalClasses > 0
                    ? ((presentClasses / totalClasses) * 100).toFixed(2)
                    : 0;

            // CGPA (example calculation)
            const marks = await Marks.find({
                studentId: student._id
            });

            let cgpa = 0;

            if (marks.length > 0) {

                const totalMarks = marks.reduce(
                    (sum, item) => sum + item.total,
                    0
                );

                const average = totalMarks / marks.length;

                cgpa = (average / 10).toFixed(2); // Example formula
            }

            result.push({
                ...student.toObject(),
                attendance: attendancePercentage,
                cgpa
            });

        }

        res.json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const getPerformance = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });

    const marks = await Marks.find();

    // Overall average marks
    let totalMarks = 0;

    marks.forEach((mark) => {
      totalMarks += mark.total || 0;
    });

    const averageMarks =
      marks.length > 0 ? (totalMarks / marks.length).toFixed(2) : 0;
const cgpa = (averageMarks / 10).toFixed(2);
    // Pass / Fail
    const passMarks = 40;

    const passCount = marks.filter((m) => (m.total || 0) >= passMarks).length;
    const failCount = marks.filter((m) => (m.total || 0) < passMarks).length;

    const passPercentage =
      marks.length > 0
        ? ((passCount / marks.length) * 100).toFixed(2)
        : 0;

    const failPercentage =
      marks.length > 0
        ? ((failCount / marks.length) * 100).toFixed(2)
        : 0;

    // Subject-wise averages
    const groupedSubjects = {};

    marks.forEach((m) => {
      if (!groupedSubjects[m.subject]) {
        groupedSubjects[m.subject] = {
          total: 0,
          count: 0,
        };
      }

      groupedSubjects[m.subject].total += m.total || 0;
      groupedSubjects[m.subject].count++;
    });

    const subjectAverage = Object.keys(groupedSubjects).map((subject) => ({
      subject,
      average: (
        groupedSubjects[subject].total /
        groupedSubjects[subject].count
      ).toFixed(2),
    }));

    res.json({
      students,
      subjectAverage,
      summary: {
        totalStudents: students.length,
        averageMarks,
        passPercentage,
        failPercentage,
        totalMarks,
        cgpa,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await User.findById(id);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }
console.log(faculty);
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};