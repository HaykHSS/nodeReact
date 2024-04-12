import { Schema, Document } from "mongoose";

export default interface IProductModel extends Document {
  productName: string;
  productPrice: number;
}
