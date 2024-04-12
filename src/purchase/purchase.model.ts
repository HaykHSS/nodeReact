import { Schema, model, Document } from "mongoose";
import { IProductModel } from "../product/product.model";
import IPurchaseModel from "./purchase.interface";

const purchaseSchema = new Schema<IPurchaseModel>({
  userId: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  iat: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
});

const Purchase = model<IPurchaseModel>("Purchase", purchaseSchema);

export default Purchase;
