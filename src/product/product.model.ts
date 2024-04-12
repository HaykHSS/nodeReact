import { Schema, model, Document } from "mongoose";

// Define an interface for the Product document
export interface IProductModel extends Document {
    // _id: number; 
    productName: string;
    productPrice: number;
}

// Define the product schema
const productSchema = new Schema<IProductModel>({
    // _id: { type: Number, default: 1 }, // Custom ID field with default value of 1
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
});

// // Define a pre-save hook to generate the next ID
// productSchema.pre<IProductModel>('save', async function (next) {
//     const doc = this;
//     try {
//         // Find the maximum _id value in the Product collection
//         const maxIdDoc: IProductModel | null = await Product.findOne({}, {}, { sort: { '_id': -1 } });
//         const maxId = maxIdDoc ? maxIdDoc._id : 0;

//         // Set the custom ID to the maximum _id value + 1
//         doc._id = maxId + 1;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Define the Product model
const Product = model<IProductModel>("Product", productSchema);

export default Product;
