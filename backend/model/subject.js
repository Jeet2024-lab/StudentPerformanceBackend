import mongoose from "mongoose";

const subjectSchema=new mongoose.Schema({

    subjectCode:String,

    subjectName:String,

    semester:Number,

    credits:Number,

    facultyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});

export default mongoose.model("Subject",subjectSchema);