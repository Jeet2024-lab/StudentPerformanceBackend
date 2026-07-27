import Attendance from "../model/attendance.js";

export const saveAttendance = async (req, res) => {
    try {

        const attendance = new Attendance({
            subject: req.body.subject,
            facultyId: req.body.facultyId,
            date: req.body.date,
            students: req.body.attendance   // <-- rename here
        });

        await attendance.save();

        res.json({
            success: true,
            message: "Attendance Saved Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};