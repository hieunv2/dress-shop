export type Category = {
  _id: string;
  name: string;
  createdAt: string;
};

export interface AddCategory {
  name: string;
}

export interface AddCategoryData {
  category: Category;
}
