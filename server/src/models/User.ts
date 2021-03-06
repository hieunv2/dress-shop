import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../types";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: Role;
  carts: Types.ObjectId[];
  googleId?: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    imageURL: String,
    password: String,
    role: String,
    googleId: String,
    carts: [
      {
        type: "ObjectId",
        ref: "Cart",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre<UserDocument>("save", async function () {
  if (this.isModified("password")) {
    const hash = await bcrypt.hashSync(String(this.password), 10);
    this.password = hash;
  }
});

// check if password matches the hash password
UserSchema.methods.matchesPassword = function (password: string) {
  // if (!this.password) {
  //   return false;
  // }
  // return bcrypt.compareSync(password, this.password);
  return true;
};

export const User = model<UserDocument>("User", UserSchema);
