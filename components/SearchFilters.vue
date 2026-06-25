<script setup lang="ts">
import type { FilterState, EstadoDisponibilidad } from '~/types'

const props = defineProps<{
  modelValue: FilterState
  ciudades: string[]
  totalResults: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterState]
  reset: []
}>()

const statusOptions: Array<{ label: string; value: 'todas' | EstadoDisponibilidad; dot?: string }> = [
  { label: 'Todas', value: 'todas' },
  { label: 'Disponible', value: 'Disponible Ahora', dot: 'bg-emerald-400' },
  { label: 'Ocupada', value: 'Ocupada', dot: 'bg-amber-400' },
  { label: 'De Viaje', value: 'De Viaje', dot: 'bg-blue-400' },
  { label: 'Inactiva', value: 'Inactiva', dot: 'bg-white/25' },
]

const sortOptions = [
  { label: 'Más recientes', value: 'recientes' },
  { label: 'Precio: menor', value: 'precio_asc' },
  { label: 'Precio: mayor', value: 'precio_desc' },
  { label: 'Nombre A-Z', value: 'nombre' },
]

const isExpanded = ref(false)

const update = (partial: Partial<FilterState>) =>
  emit('update:modelValue', { ...props.modelValue, ...partial })

const hasActiveFilters = computed(() =>
  props.modelValue.Ciudad_Base !== ''
  || props.modelValue.Estado_de_Disponibilidad !== 'todas'
  || props.modelValue.ageMin !== null
  || props.modelValue.ageMax !== null,
)
</script>

<template>
  <div class="space-y-4">
    <!-- Search + toggle row -->
    <div class="flex gap-3">
      <div class="relative flex-1">
        <svg
          class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Buscar por nombre, ciudad..."
          class="input-field pl-10"
          :value="modelValue.search"
          @input="update({ search: ($event.target as HTMLInputElement).value })"
        />
      </div>

      <button
        class="btn-secondary flex items-center gap-2 whitespace-nowrap"
        :class="{ '!border-brand-500 !text-brand-400 bg-brand-500/10': hasActiveFilters }"
        @click="isExpanded = !isExpanded"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
        <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
      </button>
    </div>

    <!-- Status pills -->
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        v-for="opt in statusOptions"
        :key="opt.value"
        class="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
        :class="modelValue.Estado_de_Disponibilidad === opt.value
          ? 'bg-brand-600 border-brand-600 text-white shadow-glow-brand-sm'
          : 'bg-dark-700/60 border-white/10 text-white/50 hover:text-white hover:border-white/20'"
        @click="update({ Estado_de_Disponibilidad: opt.value })"
      >
        <span
          v-if="opt.dot && modelValue.Estado_de_Disponibilidad === opt.value"
          class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"
        />
        <span v-else-if="opt.dot" class="w-1.5 h-1.5 rounded-full" :class="opt.dot" />
        {{ opt.label }}
      </button>
    </div>

    <!-- Expanded filters panel -->
    <Transition name="expand">
      <div v-if="isExpanded" class="card-glass p-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Ciudad -->
          <div>
            <label class="block text-xs font-medium text-white/40 mb-1.5">Ciudad</label>
            <select
              class="select-field w-full"
              :value="modelValue.Ciudad_Base"
              @change="update({ Ciudad_Base: ($event.target as HTMLSelectElement).value })"
            >
              <option value="">Todas las ciudades</option>
              <option v-for="ciudad in ciudades" :key="ciudad" :value="ciudad">
                {{ ciudad }}
              </option>
            </select>
          </div>

          <!-- Edad mín -->
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

          <!-- Edad máx -->
          <div>
            <label class="block text-xs font-medium text-white/40 mb-1.5">Edad máxima</label>
            <input
              type="number"
              min="18"
              max="60"
              placeholder="60"
              class="input-field"
              :value="modelValue.ageMax ?? ''"
              @input="update({ ageMax: ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null })"
            />
          </div>

          <!-- Ordenar -->
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

        <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
          <p class="text-sm text-white/40">
            <span class="text-white font-medium">{{ totalResults }}</span>
            resultado{{ totalResults !== 1 ? 's' : '' }}
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

    <!-- Results + sort (collapsed) -->
    <div v-if="!isExpanded" class="flex items-center justify-between px-1">
      <p class="text-sm text-white/30">
        <span class="text-white/60 font-medium">{{ totalResults }}</span>
        resultado{{ totalResults !== 1 ? 's' : '' }}
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
