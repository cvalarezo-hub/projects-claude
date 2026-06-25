import { defineStore } from 'pinia'
import type { Model, FilterState } from '~/types'

export const useModelsStore = defineStore('models', () => {
  const models = ref<Model[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const filters = ref<FilterState>({
    search: '',
    ageMin: null,
    ageMax: null,
    city: '',
    category: '',
    status: 'all',
    sortBy: 'popular',
  })

  const liveModels = computed(() => models.value.filter(m => m.isLive))
  const onlineModels = computed(() => models.value.filter(m => m.isOnline))

  async function fetchModels() {
    loading.value = true
    error.value = null
    try {
      // TODO: replace with real API call
      // const data = await $fetch<Model[]>('/api/models')
      // models.value = data
    }
    catch (e) {
      error.value = 'Error al cargar modelos'
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  function resetFilters() {
    filters.value = {
      search: '',
      ageMin: null,
      ageMax: null,
      city: '',
      category: '',
      status: 'all',
      sortBy: 'popular',
    }
  }

  return {
    models,
    loading,
    error,
    filters,
    liveModels,
    onlineModels,
    fetchModels,
    resetFilters,
  }
})
