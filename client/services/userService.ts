import { User } from 'types';
import { catchError } from 'utils/catchError';
import { setAuthToken } from 'utils/auth';
import apiClient from 'utils/apiClient';

type ProductPayload = { params: unknown };

const fetchUsers = async (payload?: ProductPayload): Promise<any> => {
    try {
      const url = `/users`;
      const { data } = await apiClient.get(url, payload);
      return data.data;
    } catch (error) {
      throw new Error(catchError(error));
    }
  };
  
  export const fetchUser = async (id: string): Promise<any> => {
    try {
      const url = `/users/${id}`;
      const { data } = await apiClient.get(url);

      return data.data.user;
    } catch (error) {
      throw new Error(catchError(error));
    }
  };
  
  export const addUser = async (product): Promise<any> => {
    try {
      const url = '/users';
      const { data } = await apiClient.post(url, product);
      return {
        product: data.data.user,
      };
    } catch (error) {
      console.log('Err', error);
      throw new Error(catchError(error));
    }
  };
  
  export const deleteUser = async (id: string): Promise<void> => {
    const url = `/users/${id}`;
    try {
      return await apiClient.delete(url);
    } catch (error) {
      throw new Error(catchError(error));
    }
  };
  
  export const UserService = {
    fetchUsers,
    fetchUser,
    addUser,
    deleteUser,
  };
  