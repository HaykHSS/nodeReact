import { Schema, model, Document } from "mongoose";
import IUserModel from "./user.interface";

const userSchema = new Schema<IUserModel>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userRole: {
    type: String,
    required: true,
    enum: ["admin", "employee"],
    default: "employee",
  },
});

const User = model<IUserModel>("User", userSchema);

export default User;
