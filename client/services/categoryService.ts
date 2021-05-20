import { Category, AddCategory, AddCategoryData } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'utils/apiClient';

interface CategoriesData {
  categories: Category[];
}

const getCategories = async (): Promise<CategoriesData> => {
  try {
    const { data } = await apiClient.get(`/categories`);

    const categoriesData: CategoriesData = {
      categories: data.data.categories,
    };

    return categoriesData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const addCategory = async (category: AddCategory): Promise<AddCategoryData> => {
  try {
    const url = '/categories';
    const { data } = await apiClient.post(url, category);
    return {
      category: data.data.category,
    };
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  const url = `/categories/${id}`;
  try {
    return await apiClient.delete(url);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CategoryService = {
  getCategories,
  addCategory,
  deleteCategory,
};
