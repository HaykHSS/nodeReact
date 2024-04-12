import { Schema, Document } from "mongoose";

export default interface IUserModel extends Document {
  username: string;
  password: string;
  userRole: 'admin' | 'employee'
}
