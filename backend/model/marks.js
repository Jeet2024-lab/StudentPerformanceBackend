import mongoose from "mongoose"

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  subject: String,

  assignment: Number,

  midterm: Number,

  endterm: Number,

  internal: Number,

  total: Number,
});

export default mongoose.model("Marks", marksSchema);