import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const { query } = useRouter();
  const selectedPage = query.selected_page || 'dashboard';

  const isActive = (page: string): boolean => {
    return selectedPage === page;
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          <li className={`${isActive('dashboard') ? styles.active : ''}`}>
            <Link href="/admin?selected_page=dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li className={`${isActive('users') ? styles.active : ''}`}>
            <Link href="/admin?selected_page=users">
              <a>Users</a>
            </Link>
          </li>
          <li className={`${isActive('categories') ? styles.active : ''}`}>
            <Link href="/admin?selected_page=categories">
              <a>Category</a>
            </Link>
          </li>
          <li className={`${isActive('products') ? styles.active : ''}`}>
            <Link href="/admin?selected_page=products">
              <a>Products</a>
            </Link>
          </li>
          <li className={`${isActive('products') ? styles.active : ''}`}>
            <Link href="/admin?selected_page=orders">
              <a>Orders</a>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
