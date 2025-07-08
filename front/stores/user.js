import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = ref(!!token.value)
  const loading = ref(false)

  // Configurar token para Axios si ya lo tenemos
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const login = async (email, password) => {
    try {
      loading.value = true
      const res = await axios.post('/api/auth/login', { email, password })
      token.value = res.data.token
      localStorage.setItem('token', token.value)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      await fetchUser()
      isAuthenticated.value = true
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/profile')
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