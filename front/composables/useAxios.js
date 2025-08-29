import axios from 'axios'
import { useRuntimeConfig } from '#app';
import { useUserStore } from '~/stores/userStore';

const createAxiosInstance = () => {
  const config = useRuntimeConfig();
  
  // Aquí obtienes la URL de la API
  const apiURL = config.public.apiURL;

  const instance = axios.create({
    baseURL: apiURL,
    headers: {
      'Content-Type': 'application/json',
      // Otros headers que necesites
    },
  });

  // Interceptor para agregar token
  instance.interceptors.request.use(
    (req) => {
      const userStore = useUserStore(); // traigo el store
      if (userStore.token) {
        req.headers.Authorization = `Bearer ${userStore.token}`;
      }
      return req;
    },
    (error) => Promise.reject(error)
  );

  return instance
};

export const useAxios = () => {
  return createAxiosInstance();
};

