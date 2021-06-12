import { Request, Response } from "express";
import { User } from "../models";
import { Cloudinary } from "../lib/cloudinary";
import APIFeatures from "../utils/ApiFeatures";
import { Role } from "../types";
import bcrypt from "bcryptjs";

export const index = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(
      User.find().populate("category"),
      User,
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await features.query;

    const total = await features.count().total;

    res.status(200).json({ data: { total, count: users.length, users } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting users" });
  }
};


export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ data: { user } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting user" });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password } = req.body;

    const hash = await bcrypt.hashSync(String(password), 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hash
    });

    res.status(200).json({ data: { user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating user" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, image } = req.body;

    let user = await User.findById(id);

    if (!user)
      return res.status(404).json({ error: { message: "User not found" } });

    if (user.id !== id) {
      return res
        .status(402)
        .json({ error: { message: "Ops user id mismatch" } });
    }

    if (image) {
      // upload base64 image to cloudinary
      const imageURL = await Cloudinary.upload(image, "avatar", {
        height: 160,
        width: 160,
      });
      user = await User.findOneAndUpdate(
        { _id: id },
        { name, email, imageURL },
        { new: true, runValidators: true }
      );
    } else {
      user = await User.findOneAndUpdate(
        { _id: id },
        { name, email },
        { new: true, runValidators: true }
      );
    }

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    res
      .status(500)
      .json({ error: { message: "Error in updating user details" } });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  let product = await User.findOne({ _id: id });

  if (!product) return res.status(404).json({ message: "User not found" });

  product.remove();

  res.status(204).json({ data: null });
};
