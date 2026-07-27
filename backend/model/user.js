import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    role:{
        type:String,
        enum:["student","faculty","admin"],
        required:true
    },

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    mobile:String,

    gender:String,

    dob:String,

    image:String,

    branch:String,

    // Student
    enrollment:String,

    semester:Number,

    section:String,

    facultyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    // Faculty
    employeeId:String,

    designation:String,

    designation:String,

    department:{type:String,
         enum: ["CSE", "IT", "AIML", "DS"],
    required: function () {
        return this.role === "faculty";
    },
    // Admin
    adminId:String

},
{
    timestamps:true
});

export default mongoose.model("User",userSchema);