import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullname?: string;
  telegramId: number;
  score: number;
  referredBy: string;
  referralCode: string;
}

const UserSchema: Schema = new Schema(
  {
    fullname: { type: String, require: false },
    telegramId: { type: Number, require: true },
    score: { type: Number, require: false, default: 0 },
    referredBy: { type: String, default: "admin" },
    referralCode: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
