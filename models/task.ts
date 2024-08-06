import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  image?: string;
  sponsor?: string;
  reward: number;
  url?: string;
  valid: boolean;
}

const TaskSchema: Schema = new Schema(
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

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
export default Task;
