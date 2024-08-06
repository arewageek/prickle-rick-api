import mongoose, { Schema } from "mongoose";

export interface TaskCompletionInterface {
  taskId: string;
  teelgramId: string;
}

const CompletionSchema = new Schema(
  {
    taskId: { type: String, required: true },
    telegramId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const TaskCompletion =
  mongoose.models.TaskCompletion ||
  mongoose.model("TaskCompletion", CompletionSchema);

export default TaskCompletion;
