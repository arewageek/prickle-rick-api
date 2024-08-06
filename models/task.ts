import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    sponsor: { type: String, require: false },
    reward: { type: Number, default: 0 },
    url: { type: String, default: "#" },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export default Task;
