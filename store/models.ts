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
    Ciudad_Base: '',
    Estado_de_Disponibilidad: 'todas',
    sortBy: 'recientes',
  })

  const disponibles = computed(() =>
    models.value.filter(m => m.Estado_de_Disponibilidad === 'Disponible Ahora'),
  )

  async function fetchModels() {
    loading.value = true
    error.value = null
    try {
      // TODO: const data = await $fetch<Model[]>('/api/modelos')
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
      Ciudad_Base: '',
      Estado_de_Disponibilidad: 'todas',
      sortBy: 'recientes',
    }
  }

  return { models, loading, error, filters, disponibles, fetchModels, resetFilters }
})
