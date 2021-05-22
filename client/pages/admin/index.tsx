import React from 'react';
import { useRouter } from 'next/router';
import { Dashboard, Products, Categories, Orders } from 'components/admin';
import { useAuth } from 'contexts';
import { Alert } from 'components/ui';

const Admin: React.FC = () => {
  const { currentUser } = useAuth();
  const { query } = useRouter();
  const selectedPage = query.selected_page || 'dashboard';

  const renderSection = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'orders':
        return <Orders />;
      default:
        return null;
    }
  };

  if (currentUser?.role !== 'admin') {
    return <Alert message="You are not allowed to visit this page" type="error" />;
  }

  return (
    <>
      <div>{renderSection()}</div>
    </>
  );
};

export default Admin;
