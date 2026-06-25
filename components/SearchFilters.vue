<script setup lang="ts">
import type { FilterState, Category } from '~/types'

const props = defineProps<{
  modelValue: FilterState
  cities: string[]
  totalResults: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterState]
  reset: []
}>()

const categories: Category[] = [
  { label: 'Todas', value: '' },
  { label: 'Fitness', value: 'fitness' },
  { label: 'Moda', value: 'fashion' },
  { label: 'Arte', value: 'art' },
  { label: 'Danza', value: 'dance' },
  { label: 'Bienestar', value: 'wellness' },
  { label: 'Viajes', value: 'travel' },
  { label: 'Fotografía', value: 'photography' },
  { label: 'Lifestyle', value: 'lifestyle' },
]

const statusOptions = [
  { label: 'Todas', value: 'all' },
  { label: 'En vivo', value: 'live' },
  { label: 'Online', value: 'online' },
]

const sortOptions = [
  { label: 'Más populares', value: 'popular' },
  { label: 'Mejor calificación', value: 'rating' },
  { label: 'Más recientes', value: 'newest' },
  { label: 'Precio: menor', value: 'price_asc' },
  { label: 'Precio: mayor', value: 'price_desc' },
]

const isExpanded = ref(false)

const update = (partial: Partial<FilterState>) => {
  emit('update:modelValue', { ...props.modelValue, ...partial })
}

const hasActiveFilters = computed(() =>
  props.modelValue.city !== ''
  || props.modelValue.category !== ''
  || props.modelValue.ageMin !== null
  || props.modelValue.ageMax !== null
  || props.modelValue.status !== 'all',
)
</script>

<template>
  <div class="space-y-4">
    <!-- Search bar + toggle row -->
    <div class="flex gap-3">
      <!-- Search input -->
      <div class="relative flex-1">
        <svg
          class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Buscar por nombre, ciudad o etiqueta..."
          class="input-field pl-10"
          :value="modelValue.search"
          @input="update({ search: ($event.target as HTMLInputElement).value })"
        />
      </div>

      <!-- Filters toggle button (mobile) -->
      <button
        class="btn-secondary flex items-center gap-2 whitespace-nowrap"
        :class="{ '!border-brand-500 !text-brand-400 bg-brand-500/10': hasActiveFilters }"
        @click="isExpanded = !isExpanded"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
        <span
          v-if="hasActiveFilters"
          class="w-2 h-2 rounded-full bg-brand-500"
        />
      </button>
    </div>

    <!-- Quick status pills -->
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        class="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
        :class="modelValue.status === opt.value
          ? 'bg-brand-600 border-brand-600 text-white shadow-glow-brand-sm'
          : 'bg-dark-700/60 border-white/10 text-white/50 hover:text-white hover:border-white/20'"
        @click="update({ status: opt.value as FilterState['status'] })"
      >
        <span v-if="opt.value === 'live'" class="inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          {{ opt.label }}
        </span>
        <span v-else>{{ opt.label }}</span>
      </button>

      <!-- Category pills -->
      <div class="w-px h-4 bg-white/10 mx-1 flex-shrink-0" />
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
        :class="modelValue.category === cat.value
          ? 'bg-dark-700 border-brand-500/60 text-brand-400'
          : 'bg-dark-700/40 border-white/[0.06] text-white/40 hover:text-white/70 hover:border-white/15'"
        @click="update({ category: cat.value })"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Expanded filters -->
    <Transition name="expand">
      <div
        v-if="isExpanded"
        class="card-glass p-5"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- City -->
          <div>
            <label class="block text-xs font-medium text-white/40 mb-1.5">Ciudad</label>
            <select
              class="select-field w-full"
              :value="modelValue.city"
              @change="update({ city: ($event.target as HTMLSelectElement).value })"
            >
              <option value="">Todas las ciudades</option>
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>

          <!-- Age min -->
          <div>
            <label class="block text-xs font-medium text-white/40 mb-1.5">Edad mínima</label>
            <input
              type="number"
              min="18"
              max="60"
              placeholder="18"
              class="input-field"
              :value="modelValue.ageMin ?? ''"
              @input="update({ ageMin: ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null })"
            />
          </div>

          <!-- Age max -->
          <div>
            <label class="block text-xs font-medium text-white/40 mb-1.5">Edad máxima</label>
            <input
              type="number"
              min="18"
              max="60"
              placeholder="99"
              class="input-field"
              :value="modelValue.ageMax ?? ''"
              @input="update({ ageMax: ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null })"
            />
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-xs font-medium text-white/40 mb-1.5">Ordenar por</label>
            <select
              class="select-field w-full"
              :value="modelValue.sortBy"
              @change="update({ sortBy: ($event.target as HTMLSelectElement).value as FilterState['sortBy'] })"
            >
              <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Reset -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
          <p class="text-sm text-white/40">
            <span class="text-white font-medium">{{ totalResults }}</span> resultado{{ totalResults !== 1 ? 's' : '' }}
          </p>
          <button
            v-if="hasActiveFilters"
            class="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors"
            @click="emit('reset')"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </Transition>

    <!-- Results count (collapsed state) -->
    <div v-if="!isExpanded" class="flex items-center justify-between px-1">
      <p class="text-sm text-white/30">
        <span class="text-white/60 font-medium">{{ totalResults }}</span> resultado{{ totalResults !== 1 ? 's' : '' }}
      </p>
      <select
        class="select-field !py-1 !text-xs"
        :value="modelValue.sortBy"
        @change="update({ sortBy: ($event.target as HTMLSelectElement).value as FilterState['sortBy'] })"
      >
        <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 400px;
}
</style>
