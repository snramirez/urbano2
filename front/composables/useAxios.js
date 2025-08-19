import axios from 'axios'
import { useRuntimeConfig } from '#app';

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

  return instance
};

export const useAxios = () => {
  return createAxiosInstance();
};

  // Interceptor: Agrega el token si está presente
  // api.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       config.headers.Authorization = `Bearer ${token}`
  //     }
  //     return config
  //   },
  //   (error) => Promise.reject(error)
  // )
