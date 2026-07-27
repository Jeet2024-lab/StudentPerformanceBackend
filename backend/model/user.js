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

    branch:{
        
  type: String,
  enum: ["CSE", "IT", "AIML", "DS"],

  },

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

    designation:{
        
  type: String,
  enum: ["Professor", "Associate Professor", "Assistant Professor", "Lecturer","Teaching Assistant"],
  
  },

   

    department: {
  type: String,
  enum: ["CSE", "IT", "AIML", "DS"],
  
  
},

    // Admin
    adminId:String

},
{
    timestamps:true
});

export default mongoose.model("User",userSchema);