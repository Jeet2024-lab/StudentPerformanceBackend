import User from '../model/user.js';
import Marks from '../model/marks.js';
import Attendance from '../model/attendance.js'
import axios from "axios";


export const predictStudent = async (req, res) => {

    const { studentId } = req.body;

    const student = await User.findById(studentId);

    const marks = await Marks.find({
    studentId: student._id
});
    

const attendanceData = await Attendance.find({
    "students.studentId": studentId
});

let totalClasses = 0;
let presentClasses = 0;

attendanceData.forEach(record => {
    record.students.forEach(item => {
        if (item.studentId.toString() === studentId) {
            totalClasses++;

            if (item.status === "Present") {
                presentClasses++;
            }
        }
    });
});

const attendance =
    totalClasses > 0
        ? (presentClasses / totalClasses) * 100
        : 0;

let totalMarks = 0;

marks.forEach(mark => {
    totalMarks += mark.total || 0;
});
console.log(totalMarks);
const averageMarks =
    marks.length > 0 ? totalMarks / marks.length : 0;
console.log(marks.length);
const cgpa = averageMarks / 10;

    const response = await axios.post(
        "https://mlmodelai-1.onrender.com",
        {
            attendance,
            assignment: marks[0].assignment,
            midterm: marks[0].midterm,
            endterm: marks[0].endterm,
            internal: marks[0].internal,
            cgpa
        }
    );

    res.json(response.data);
}