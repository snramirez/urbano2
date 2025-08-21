import { defineStore, createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
import { useAxios } from "~/composables/useAxios";

//creo una instancia de Pinia aca porque por alguna razón no lo hace automáticamente ¯\_(ツ)_/¯
const pinia = createPinia();
export default { store: setActivePinia(pinia) };

export const useUserStore = defineStore('user', () => {
  const api = useAxios();
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = ref(!!token.value)
  const loading = ref(false)
  const error = ref(null)

  // Configurar token para Axios si ya lo tenemos
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const login = async (email, password) => {
    try {
      loading.value = true
      const res = await api.post('/auth/login', { userName: email, password })
      token.value = res.data.token
      localStorage.setItem('token', token.value)
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      // await fetchUser()
      isAuthenticated.value = true
    } catch (err) {
      console.log(err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/profile')
      user.value = res.data
    } catch (err) {
      logout()
    }
  }

  const logout = () => {
    token.value = ''
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  const hasRole = (rol) => {
    return user.value?.rol === rol
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    fetchUser,
    logout,
    hasRole,
  }
})