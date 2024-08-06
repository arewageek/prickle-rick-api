import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    fullname: { type: String, require: false },
    telegramId: { type: Number, require: true },
    score: { type: Number, require: false, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
