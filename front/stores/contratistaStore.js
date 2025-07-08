import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/axios'

export const useContratistaStore = defineStore('contratista', () => {
    const contratistas = ref([])
    const loading = ref(false)

    const fetchContratistas = async () => {
        try {
            loading.value = true
            const res = await api.get('/contractor')
            contratistas.value = res.data
        } catch (err) {
            console.error('Error fetching contratistas:', err)
        } finally {
            loading.value = false
        }
    }

    const createContratista = async (contratista) => {
        try {
            loading.value = true
            const res = await api.post('/contractor', contratista)
            contratistas.value.push(res.data)
        } catch (err) {
            console.error('Error creating contratista:', err)
        } finally {
            loading.value = false
        }
    }

    const updateContratista = async (id, contratista) => {
        try {
            loading.value = true
            const res = await api.put(`/contractor?id=${id}`, { data: contratista })
            const index = contratistas.value.findIndex(c => c._id === id)
            if (index !== -1) {
                contratistas.value[index] = res.data
            }
        } catch (err) {
            console.error('Error updating contratista:', err)
        } finally {
            loading.value = false
        }
    }

    const deleteContratista = async (id) => {
        try {
            loading.value = true
            await api.delete(`/contractor?id=${id}`)
            contratistas.value = contratistas.value.filter(c => c._id !== id)
        } catch (err) {
            console.error('Error deleting contratista:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        contratistas,
        loading,
        fetchContratistas,
        createContratista,
        updateContratista,
        deleteContratista
    }
})
// This store manages the state and actions related to contractors (contratistas).
// It includes methods to fetch, create, update, and delete contractors,
// and uses Axios for API requests. The state is reactive, allowing components
// to automatically update when the data changes.  