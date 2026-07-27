import Marks from '../model/marks.js'

export const saveMarks = async (req, res) => {

    try {

        const { id } = req.params;

        const {
  subject,
  assignment,
  midterm,
  endterm,
  internal,

} = req.body;

        const total =
            Number(internal) +
            Number(assignment) +
            Number(midterm) +
            Number(endterm);

        const marks = new Marks({
  studentId: id,
  subject,
  assignment,
 midterm,
  endterm,
  internal,
  total,
});

        await marks.save();

        res.status(201).json({
            success: true,
            message: "Marks saved successfully",
            marks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


export const getMarks = async (req, res) => {
    try {

        const { id } = req.params;
// console.log(id);
        const marks = await Marks.find({ studentId:id });
// console.log(marks);
        if (!marks || marks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No marks found for this student"
            });
        }

        res.status(200).json({
            success: true,
            count: marks.length,
            data: marks
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};