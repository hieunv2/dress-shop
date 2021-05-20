import React, { useState, useEffect } from 'react';
import { Category, AddCategory as AddCategoryType } from 'types';
import { CategoryService } from 'services';
import { ErrorMessage, Spinner, Button, Modal } from 'components/ui';
import { FaTrash } from 'react-icons/fa';
import { useToast } from 'contexts';
import styles from './Categories.module.css';
import AddCategory from './AddCategory';

const Categories: React.FC = () => {
  const { setToast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const results = await CategoryService.getCategories();
        setCategories(results.categories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const closeAddCategoryModal = () => {
    setIsOpenAddCategoryModal(false);
  };

  const openAddCategoryModal = () => {
    setIsOpenAddCategoryModal(true);
  };

  const handleAddCategory = async (newProduct: AddCategoryType) => {
    try {
      const { category } = await CategoryService.addCategory(newProduct);
      setCategories([category, ...categories]);
      setIsOpenAddCategoryModal(false);
      setToast('success', 'Successfully added');
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const isConfirm = window.confirm('Are you sure you want to delete this product?');
      if (!isConfirm) return;
      await CategoryService.deleteCategory(id);
      const filterProducts = categories.filter((product) => product._id !== id);
      setCategories(filterProducts);
      setToast('success', 'Successfully deleted');
    } catch (error) {
      setToast('error', error.message);
    }
  };

  if (loading) {
    return <Spinner size={60} />;
  }

  if (error) {
    return <ErrorMessage message="Unable to get products right now please try again later." />;
  }

  return (
    <div className="table-container">
      <Modal visible={isOpenAddCategoryModal} title="Add Category" onClose={closeAddCategoryModal}>
        <AddCategory onSubmit={handleAddCategory} />
      </Modal>
      <div className={styles.addCategoryContainer}>
        <Button title="Add Category" onClick={openAddCategoryModal} />
      </div>
      {categories?.length === 0 ? (
        <div className={styles.msg}> No categories created yet. </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th> Name </th>
                <th> Date create </th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id}>
                  <td>
                    <a href={`/category?id=${category._id}`} target="_blank" rel="noreferrer">
                      <div className={styles.name}> {category.name} </div>
                    </a>
                  </td>
                  <td>
                    <div className={styles.desc}>{category.createdAt}</div>
                  </td>
                  <td>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Categories;
