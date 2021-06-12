import React, { useState, useEffect } from 'react';
import { Input, Button } from 'components/ui';
import { AddProduct as AddProductType } from 'types';
import styles from './AddProduct.module.css';
import { Category } from 'types';
import { CategoryService } from 'services';

interface Props {
  onSubmit(product: AddProductType): void;
}

const AddUser: React.FC<Props> = ({user, onSubmit }) => {
  const initState = {
    name: '',
    price: '',
    description: '',
    category: 'men',
  };

  const [product, setProduct] = useState(user || initState);
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
    await onSubmit(product);
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
          placeholder="User Name"
          onChange={handleChange}
          required={true}
          value={product.name}
        />
        <Input
          id="email"
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required={true}
          value={product.email}
        />
        <Input
          id="password"
          type="text"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required={true}
          value={product.password}
        />

        <div className={styles.group}>
          <select
            name="role"
            onChange={handleChange}
            onBlur={handleChange}
            required={true}
            value={product.role}
          >
              <option key={1} value={"admin"}>
                Admin
              </option>
              <option key={2} value={"user"}>
              user
              </option>
          </select>
        </div>
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

export default AddUser;
