import { Schema, model, Document, Types } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  imageURL: string;
  category: Types.ObjectId;
  description: string;
}

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    imageURL: String,
    category: {
      type: "ObjectId",
      ref: "Category",
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

productSchema.index(
  {
    name: "text",
  },
  {
    weights: {
      name: 3,
    },
  }
);

export const Product = model<ProductDocument>("Product", productSchema);
