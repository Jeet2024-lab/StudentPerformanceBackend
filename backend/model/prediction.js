import mongoose from "mongoose";

const predictionSchema=new mongoose.Schema({

    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    semester:Number,

    prediction:String,

    confidence:Number,

    recommendation:String

},
{
    timestamps:true
});

export default mongoose.model("Prediction",predictionSchema);