import { defineStore, createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
import { useAxios } from "~/composables/useAxios";

//creo una instancia de Pinia aca porque por alguna razón no lo hace automáticamente ¯\_(ツ)_/¯
const pinia = createPinia();
export default { store: setActivePinia(pinia) };

export const useUserStore = defineStore('user', () => {
  const api = useAxios();
  const user = ref(null)
  const token = useCookie('token')
  const loading = ref(false)
  const error = ref(null)

  const login = async (email, password) => {
    try {
      loading.value = true
      error.value = null
      const res = await api.post('/auth/login', { userName: email, password })
      console.log(res)
      console.log(res.data)
      token.value = res.data.token
      user.value = res.data
    } catch (err) {
      console.log(err)
      error.value = err.response?.data.error || 'LOGIN_ERROR'
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
    token.value = null
    user.value = null
  }

  const hasRole = (rol) => {
    return user.value?.rol === rol
  }

  return {
    user,
    token,
    loading,
    error,
    login,
    fetchUser,
    logout,
    hasRole,
  }
})