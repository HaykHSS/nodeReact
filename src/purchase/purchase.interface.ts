import { Schema, Document } from "mongoose";

export default interface IPurchaseModel extends Document {
  userId: Number;
  username: string;
  iat: Date;
  totalPrice: number;
  products: Schema.Types.ObjectId[];
}
