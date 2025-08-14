import axios from 'axios'

export default function useAxios() {
  const config = useRuntimeConfig()

  // Creamos una instancia personalizada de Axios
  const api = axios.create({
    baseURL: config.public.apiURL || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return {
    api,
  }
}

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
