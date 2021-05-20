import mongoose from "mongoose";
import { DATABASE_URI } from "../config";

export const connectDb = async () => {
  const conn = await mongoose.connect(`mongodb://localhost:27017/db_dress`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
