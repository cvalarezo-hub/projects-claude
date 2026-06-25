<script setup lang="ts">
import type { Model } from '~/types'

const props = defineProps<{ model: Model }>()

const statusLabel = computed(() => {
  if (props.model.isLive) return 'live'
  if (props.model.isOnline) return 'online'
  return 'offline'
})

const formattedViewers = computed(() => {
  const v = props.model.viewers ?? 0
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`
})

const categoryLabel = computed(() =>
  props.model.categories.slice(0, 2).join(' · '),
)
</script>

<template>
  <article
    class="card-glass card-hover group relative overflow-hidden cursor-pointer"
    :aria-label="`Ver perfil de ${model.displayName}`"
  >
    <!-- Cover / Avatar area -->
    <div class="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-dark-700">
      <img
        :src="model.avatar"
        :alt="model.displayName"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

      <!-- Top badges -->
      <div class="absolute top-3 left-3 right-3 flex items-start justify-between">
        <!-- Status badge -->
        <div v-if="statusLabel === 'live'" class="badge-live">
          <span class="glow-dot bg-red-400 w-1.5 h-1.5" />
          EN VIVO
        </div>
        <div v-else-if="statusLabel === 'online'" class="badge-online">
          <span class="glow-dot bg-emerald-400 w-1.5 h-1.5" />
          Online
        </div>
        <div v-else class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 text-white/40 text-xs font-medium rounded-full">
          Offline
        </div>

        <!-- Premium badge -->
        <div
          v-if="model.isPremium"
          class="px-2 py-0.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-[10px] font-black tracking-wider"
        >
          PREMIUM
        </div>
      </div>

      <!-- Viewer count (live only) -->
      <div
        v-if="model.isLive && model.viewers"
        class="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm"
      >
        <svg class="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
        </svg>
        <span class="text-xs text-white/80 font-semibold">{{ formattedViewers }}</span>
      </div>
    </div>

    <!-- Card body -->
    <div class="p-4">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <h3 class="font-semibold text-white text-sm truncate">
              {{ model.displayName }}
            </h3>
            <!-- Verified checkmark -->
            <svg
              v-if="model.isVerified"
              class="w-3.5 h-3.5 text-brand-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-white/40 text-xs mt-0.5">
            {{ model.age }} años · {{ model.city }}
          </p>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-1 flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-xs font-semibold text-white/80">{{ model.rating }}</span>
        </div>
      </div>

      <!-- Categories -->
      <p class="text-xs text-white/30 mt-2 capitalize">
        {{ categoryLabel }}
      </p>

      <!-- Action row -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
        <div class="flex items-baseline gap-1">
          <span class="text-brand-400 font-bold text-sm">${{ model.price }}</span>
          <span class="text-white/30 text-xs">/mes</span>
        </div>
        <button class="btn-primary !px-4 !py-1.5 !text-xs">
          Ver perfil
        </button>
      </div>
    </div>
  </article>
</template>
