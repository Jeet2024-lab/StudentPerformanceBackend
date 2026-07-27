import mongoose from "mongoose";

const attendanceSchema=new mongoose.Schema({

    subjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    },

    facultyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    semester:Number,

    section:String,

    date:Date,

    students:[{

        studentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },

        status:{
            type:String,
            enum:["Present","Absent"]
        }

    }]

},
{
    timestamps:true
});

export default mongoose.model("Attendance",attendanceSchema);