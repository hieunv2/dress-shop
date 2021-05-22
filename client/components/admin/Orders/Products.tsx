import React, { useState, useEffect } from 'react';
import { Product, AddProduct as AddProductType } from 'types';
import { CartService, ProductService } from 'services';
import { ErrorMessage, Pagination, Spinner, Button, Modal } from 'components/ui';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from 'utils/helpers';
import { useToast } from 'contexts';
import styles from './Products.module.css';
import AddProduct from '../AddProduct';

const LIMIT = 10;

const Products: React.FC = () => {
  const { setToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOpenAddProductModal, setIsOpenAddProductModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const results = await CartService.fetchCarts();
        setProducts(results.carts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const onChangePaginate = (val: number) => {
    setPage(val);
  };

  const closeAddProductModal = () => {
    setIsOpenAddProductModal(false);
  };

  const openAddProductModal = () => {
    setIsOpenAddProductModal(true);
  };

  const handleAddProduct = async (newProduct: AddProductType) => {
    try {
      const { product } = await ProductService.addProduct(newProduct);
      setProducts([product, ...products]);
      setIsOpenAddProductModal(false);
      setToast('success', 'Successfully added');
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const isConfirm = window.confirm('Are you sure you want to delete this product?');
      if (!isConfirm) return;
      await ProductService.deleteProduct(id);
      const filterProducts = products.filter((product) => product._id !== id);
      setProducts(filterProducts);
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
      {products?.length === 0 ? (
        <div className={styles.msg}> No products created yet. </div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '30rem' }}> Product Name </th>
                <th> Quantity </th>
                <th> Price </th>
                <th style={{ width: '20rem' }}> Customer </th>
                <th style={{ width: '20rem' }}> Status </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>
                    <a target="_blank" rel="noreferrer">
                      <div className={styles.productInfo}>
                        <div className={styles.name}> {product.product.name} </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <div className={styles.price}>{product.quantity}</div>
                  </td>
                  <td>
                    <div className={styles.price}>{product.product.price}</div>
                  </td>
                  <td>
                    <div className={styles.price}>{product.user.name}</div>
                  </td>
                  <td>
                    <div className={styles.desc}>Success</div>
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

export default Products;
