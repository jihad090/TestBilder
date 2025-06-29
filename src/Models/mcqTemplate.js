import mongoose from "mongoose";

// Sub-MCQs (only for mcq-4)
const subMCQSchema = new mongoose.Schema({
  childIdx: { type: Number, required: true },
  id: { type: String, required: true },
  questionText: { type: String, required: false },
  image: { type: String, default: "" },
  options: { type: [String], required: false },
  correctAnswer: { type: String, required: false },
  marks: { type: Number, default: 1 },
  
});

// Main MCQ Schema (for mcq-1,2,3,4)
const mcqSchema = new mongoose.Schema({
  mcqType: {
    type: String,
    enum: ["mcq-1", "mcq-2", "mcq-3", "mcq-4"],
    required: true,
  },
  parentIdx: { type: Number, required: true },
  id: { type: String, required: true },

  // For mcq-1,2,3
  questionText: { type: String },
  image: { type: String},
  options: { type: [String],default: undefined },
  correctAnswer: { type: String },
  marks: { type: Number },

  // Only for mcq-4
  passage: { type: String,default: undefined },
  passageImage: {type: String,default: undefined},
 subQuestions: { type: [subMCQSchema],default: undefined},
});

const templateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    primaryInfo: { type: mongoose.Schema.Types.ObjectId, ref: "PrimaryInfo", required: true },
    mcqs: [[mcqSchema]], 
    isComplete: { type: Boolean, default: false }, 

  },
  { timestamps: true }
);
templateSchema.index({ user: 1, createdAt: -1 })
templateSchema.index({ user: 1, primaryInfo: 1 })
templateSchema.index({ user: 1, isComplete: 1 })

const MCQTemplate = mongoose.models.MCQTemplate || mongoose.model("MCQTemplate", templateSchema);
export default MCQTemplate;
