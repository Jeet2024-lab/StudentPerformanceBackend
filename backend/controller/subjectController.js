import Subject from '../model/subject.js'


// Get Subjects
export const getSubjects = async (req,res)=>{

    const subjects = await Subject.find();

    res.json(subjects);

};

// Add Subject
export const addSubject = async(req,res)=>{

    const subject = new Subject(req.body);

    await subject.save();

    res.json({
        message:"Subject Added Successfully"
    });

};

// Delete Subject
export const deleteSubject = async(req,res)=>{

    await Subject.findByIdAndDelete(req.params.id);

    res.json({
        message:"Subject Deleted Successfully"
    });

};
