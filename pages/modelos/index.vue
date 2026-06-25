<script setup lang="ts">
const { filteredModels, filters, disponiblesCount, ciudades, resetFilters } = useModels()

const PAGE_SIZE = 12
const currentPage = ref(1)

const paginatedModels = computed(() =>
  filteredModels.value.slice(0, currentPage.value * PAGE_SIZE),
)

const hasMore = computed(() =>
  paginatedModels.value.length < filteredModels.value.length,
)

const loadMore = () => {
  currentPage.value++
}

watch(filters, () => {
  currentPage.value = 1
}, { deep: true })

useHead({
  title: 'Directorio de Modelos — lasrikas.com',
  meta: [
    {
      name: 'description',
      content: computed(() =>
        `Explora el directorio completo de modelos independientes verificadas. ${disponiblesCount.value} disponibles ahora mismo en toda Latinoamérica.`,
      ),
    },
    { property: 'og:title', content: 'Directorio de Modelos — lasrikas.com' },
    { property: 'og:type', content: 'website' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: 'https://lasrikas.com/modelos' }],
})
</script>

<template>
  <div class="pt-16">
    <!-- Page header -->
    <div class="relative overflow-hidden bg-dark-800/50 border-b border-white/[0.04]">
      <div class="absolute inset-0 bg-hero-glow opacity-30" />
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span class="text-emerald-400 text-sm font-medium">
                {{ disponiblesCount }} disponibles ahora
              </span>
            </div>
            <h1 class="font-display text-3xl sm:text-4xl font-bold text-white">
              Directorio de Modelos
            </h1>
            <p class="text-white/40 mt-2 text-sm max-w-lg">
              Perfiles verificados de modelos independientes. Consulta disponibilidad, horarios y tarifas directamente.
            </p>
          </div>
          <div class="flex-shrink-0 text-right">
            <p class="text-3xl font-bold text-white">{{ filteredModels.length }}</p>
            <p class="text-xs text-white/30 mt-0.5">resultado{{ filteredModels.length !== 1 ? 's' : '' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Filters -->
      <div class="mb-8">
        <SearchFilters
          v-model="filters"
          :ciudades="ciudades"
          :total-results="filteredModels.length"
          @reset="resetFilters"
        />
      </div>

      <!-- Grid -->
      <TransitionGroup
        v-if="paginatedModels.length > 0"
        name="grid"
        tag="div"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5"
      >
        <ModelCard
          v-for="model in paginatedModels"
          :key="model.ID"
          :model="model"
        />
      </TransitionGroup>

      <!-- Empty state -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-32 text-center"
      >
        <div class="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center mb-5">
          <svg class="w-9 h-9 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 class="text-white/60 font-semibold text-lg mb-2">Sin resultados</h2>
        <p class="text-white/30 text-sm mb-6 max-w-xs">
          No encontramos modelos con esos criterios. Intenta ampliar los filtros.
        </p>
        <button class="btn-secondary" @click="resetFilters">
          Limpiar todos los filtros
        </button>
      </div>

      <!-- Load more -->
      <div v-if="hasMore" class="flex flex-col items-center gap-3 mt-12">
        <button
          class="btn-secondary px-12 py-3"
          @click="loadMore"
        >
          Cargar más modelos
        </button>
        <p class="text-xs text-white/20">
          Mostrando {{ paginatedModels.length }} de {{ filteredModels.length }}
        </p>
      </div>

      <!-- End of results -->
      <div v-else-if="paginatedModels.length > 0" class="flex items-center justify-center mt-12 gap-4">
        <div class="h-px bg-white/[0.05] flex-1" />
        <p class="text-xs text-white/20 px-4">Fin del directorio</p>
        <div class="h-px bg-white/[0.05] flex-1" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-enter-active,
.grid-leave-active { transition: all 0.3s ease; }
.grid-enter-from { opacity: 0; transform: scale(0.95) translateY(8px); }
.grid-leave-to { opacity: 0; transform: scale(0.95); }
.grid-move { transition: transform 0.3s ease; }
</style>
