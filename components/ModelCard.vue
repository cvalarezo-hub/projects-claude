<script setup lang="ts">
import type { Model, EstadoDisponibilidad } from '~/types'

const props = defineProps<{ model: Model }>()

type StatusCfg = Record<EstadoDisponibilidad, { label: string; dot: string; badge: string }>

const STATUS_CFG: StatusCfg = {
  'Disponible Ahora': {
    label: 'Disponible',
    dot: 'bg-emerald-400',
    badge: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/35',
  },
  'Ocupada': {
    label: 'Ocupada',
    dot: 'bg-amber-400',
    badge: 'text-amber-400 bg-amber-500/15 border-amber-500/35',
  },
  'De Viaje': {
    label: 'De Viaje',
    dot: 'bg-blue-400',
    badge: 'text-blue-400 bg-blue-500/15 border-blue-500/35',
  },
  'Inactiva': {
    label: 'Inactiva',
    dot: 'bg-white/25',
    badge: 'text-white/30 bg-white/5 border-white/10',
  },
}

const status = computed(() => STATUS_CFG[props.model.Estado_de_Disponibilidad])
const isPremium = computed(() => props.model.plan_id !== null && props.model.plan_id !== undefined && props.model.plan_id >= 2)
</script>

<template>
  <NuxtLink
    :to="`/modelo/${model.Slug}`"
    class="card-glass card-hover group relative overflow-hidden block"
    :aria-label="`Ver perfil de ${model.Nombre}`"
  >
    <!-- Cover / Avatar area -->
    <div class="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-dark-700">
      <img
        :src="model.Imagen_principal"
        :alt="model.Nombre"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

      <!-- Top badges -->
      <div class="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
        <!-- Status badge -->
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-xs font-bold uppercase tracking-wide"
          :class="status.badge"
        >
          <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="status.dot" />
          {{ status.label }}
        </div>

        <!-- Premium badge -->
        <div
          v-if="isPremium"
          class="px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-[10px] font-black tracking-wider flex-shrink-0"
        >
          PREMIUM
        </div>
      </div>

      <!-- Verified stamp -->
      <div
        v-if="model.is_verified"
        class="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-brand-600/80 backdrop-blur-sm"
      >
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="text-[10px] text-white font-bold">Verificada</span>
      </div>
    </div>

    <!-- Card body -->
    <div class="p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <h3 class="font-semibold text-white text-sm truncate">
            {{ model.Nombre }}
          </h3>
          <p class="text-white/40 text-xs mt-0.5">
            {{ model.Edad }} años · {{ model.Ciudad_Base }}
          </p>
        </div>
        <div class="flex-shrink-0 text-right">
          <span class="text-xs text-white/25">desde</span>
          <p class="text-brand-400 font-bold text-sm leading-none mt-0.5">${{ model.Precio_Base }}</p>
        </div>
      </div>

      <!-- Specs row -->
      <div class="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.06]">
        <span class="text-xs text-white/30">{{ model.Estatura }} cm</span>
        <span class="w-px h-3 bg-white/10" />
        <span class="text-xs text-white/30">{{ model.Medidas }}</span>
        <span class="w-px h-3 bg-white/10" />
        <span class="text-xs text-white/30 capitalize">{{ model.Color_de_cabello }}</span>
      </div>

      <!-- Horario pill -->
      <div class="mt-3 flex items-center gap-1.5">
        <svg class="w-3 h-3 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs text-white/25">{{ model.Horario_Laboral }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
