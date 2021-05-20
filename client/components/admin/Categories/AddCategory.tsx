import React, { useState } from 'react';
import { Input, Button } from 'components/ui';
import { AddCategory as AddCategoryType } from 'types';
import styles from './Categories.module.css';

interface Props {
  onSubmit(product: AddCategoryType): void;
}

const AddProduct: React.FC<Props> = ({ onSubmit }) => {
  const initState = {
    name: '',
  };

  const [product, setProduct] = useState(initState);
  const [submit, setSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    const newProduct = {
      ...product,
    };
    await onSubmit(newProduct);
    setSubmit(false);
    reset();
  };

  const reset = () => {
    setProduct(initState);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          required={true}
          value={product.name}
        />

        <div>
          <Button
            type="submit"
            className={styles.btnSubmit}
            disabled={submit}
            title="Submit"
            loading={submit}
          />
        </div>
      </form>
    </>
  );
};

export default AddProduct;
