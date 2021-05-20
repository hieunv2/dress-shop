import { Request, Response } from "express";
import { Category } from "../models";

export const index = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: { categories }, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting products", success: false });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ data: { category } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name,
    });

    res.status(200).json({ data: { category } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating category" });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  let category = await Category.findOne({ _id: id });

  if (!category) return res.status(404).json({ message: "Category not found" });

  category.remove();

  res.status(204).json({ data: null });
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let category = await Category.findOne({ _id: id });

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category = await Category.findOneAndUpdate(
      { _id: category._id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({ data: { category } });
  } catch (error) {
    res.status(500).json({ message: "Error in creating category" });
  }
};
