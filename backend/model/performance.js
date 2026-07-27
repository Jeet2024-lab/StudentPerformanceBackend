import mongoose from "mongoose";

const performanceSchema=new mongoose.Schema({

    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },

    semester:Number,

    attendance:Number,

    assignment:Number,

    quiz:Number,

    internal:Number,

    external:Number,

    total:Number,

    cgpa:Number,

    prediction:String,

    confidence:Number,

    recommendation:String

},
{
    timestamps:true
});

export default mongoose.model("Performance",performanceSchema);