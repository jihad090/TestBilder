



import mongoose from "mongoose";

const subMCQSchema = new mongoose.Schema({
  childIdx: { type: Number, required: true },
  questionText: { type: String, default: "" },
  image: { type: String, default: "" },
  options: { type: [String], required: true, default: ["", "", "", ""] },
  correctAnswer: { type: String, default: "" },
  marks: { type: Number, default: 1 },
  complexity: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
});

const mcqSchema = new mongoose.Schema({
  mcqType: {
    type: String,
    enum: ["mcq-1", "mcq-2", "mcq-3", "mcq-4"],
    required: true,
  },
  parentIdx: { type: Number, required: true },
  questionText: { type: String, default: "" },
  image: { type: String, default: "" },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, default: "" },
  marks: { type: Number, default: 1 },
  infoItems: { type: [String], default: [] },
  passage: { type: String, default: "" },
  passageImage: { type: String, default: "" },
  subQuestions: { type: [subMCQSchema], default: [] },
  complexity: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
});

const templateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  primaryInfo: { type: mongoose.Schema.Types.ObjectId, ref: "PrimaryQuestionInfo", required: true },
  mcqs: { type: mongoose.Schema.Types.Mixed, default: [] },
  isComplete: { type: Boolean, default: false },
}, { timestamps: true });


const MCQTemplate = mongoose.models.MCQTemplate || mongoose.model("MCQTemplate", templateSchema);

export default MCQTemplate;
