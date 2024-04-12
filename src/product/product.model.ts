import { Schema, model, Document } from "mongoose";

export interface IProductModel extends Document {
    productName: string;
    productPrice: number;
}

const productSchema = new Schema<IProductModel>({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
});

const Product = model<IProductModel>("Product", productSchema);

export default Product;
