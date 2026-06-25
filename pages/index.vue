<script setup lang="ts">
const { filteredModels, filters, liveCount, onlineCount, cities, resetFilters } = useModels()

useHead({
  title: 'Las Rikas — Modelos Premium en Vivo',
  meta: [
    {
      name: 'description',
      content: `Descubre ${liveCount.value} modelos en vivo ahora mismo. Plataforma premium con modelos independientes verificadas de toda Latinoamérica.`,
    },
    {
      property: 'og:title',
      content: 'Las Rikas — Plataforma Premium de Modelos',
    },
    {
      property: 'og:description',
      content: 'La experiencia premium para descubrir modelos independientes y agencias en vivo.',
    },
    {
      property: 'og:image',
      content: '/og-image.jpg',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://lasrikas.com',
    },
  ],
})

const stats = computed(() => [
  { label: 'Modelos activas', value: '2,400+', icon: '👑' },
  { label: 'En vivo ahora', value: liveCount.value.toString(), icon: '🔴', highlight: true },
  { label: 'Online', value: onlineCount.value.toString(), icon: '✦' },
  { label: 'Ciudades', value: '28+', icon: '🌎' },
])
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden pt-16">
      <!-- Background layers -->
      <div class="absolute inset-0 bg-dark-900" />
      <div class="absolute inset-0 bg-hero-glow opacity-60" />

      <!-- Decorative orbs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-700/10 blur-[120px] animate-pulse-slow" />
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-pink-700/8 blur-[100px] animate-pulse-slow" style="animation-delay: 2s;" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-900/10 blur-[140px]" />

      <!-- Grid pattern overlay -->
      <div class="absolute inset-0 opacity-[0.03] bg-grid-pattern" />

      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <!-- Label pill -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-sm font-medium mb-8 animate-fade-in">
          <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span>{{ liveCount }} modelos en vivo ahora mismo</span>
        </div>

        <!-- Headline -->
        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 animate-slide-up text-balance">
          Descubre las<br />
          <span class="text-gradient">modelos más exclusivas</span><br />
          de Latinoamérica
        </h1>

        <p class="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style="animation-delay: 0.1s;">
          La plataforma premium para conectar con modelos independientes verificadas.
          Contenido en vivo, chats privados y mucho más.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s;">
          <button class="btn-primary text-base px-8 py-3.5 shadow-glow-brand">
            Explorar ahora — Es gratis
          </button>
          <button class="btn-secondary text-base px-8 py-3.5">
            Ver en vivo
            <span class="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          </button>
        </div>

        <!-- Trust line -->
        <p class="mt-8 text-xs text-white/25 animate-fade-in" style="animation-delay: 0.4s;">
          Mayores de 18 años · Verificado · Seguro · Sin tarjeta requerida para registro
        </p>
      </div>

      <!-- Bottom fade -->
      <div class="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>

    <!-- ============ STATS BAR ============ -->
    <section class="relative z-10 -mt-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card-glass grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col items-center justify-center py-5 px-6 text-center"
          >
            <div class="flex items-center gap-2">
              <span
                class="text-2xl sm:text-3xl font-bold"
                :class="stat.highlight ? 'text-red-400' : 'text-white'"
              >
                {{ stat.value }}
              </span>
              <span
                v-if="stat.highlight"
                class="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"
              />
            </div>
            <p class="text-xs text-white/35 mt-1 font-medium">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ MODELS SECTION ============ -->
    <section class="py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section header -->
        <div class="flex items-end justify-between mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-display font-bold text-white">
              Modelos destacadas
            </h2>
            <p class="text-white/40 text-sm mt-1">
              Descubre perfiles verificados y contenido exclusivo
            </p>
          </div>
          <NuxtLink
            to="/modelos"
            class="hidden sm:flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            Ver todas
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Filters -->
        <div class="mb-8">
          <SearchFilters
            v-model="filters"
            :cities="cities"
            :total-results="filteredModels.length"
            @reset="resetFilters"
          />
        </div>

        <!-- Models grid -->
        <TransitionGroup
          v-if="filteredModels.length > 0"
          name="grid"
          tag="div"
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-5"
        >
          <ModelCard
            v-for="model in filteredModels"
            :key="model.id"
            :model="model"
          />
        </TransitionGroup>

        <!-- Empty state -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-24 text-center"
        >
          <div class="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mb-4">
            <svg class="w-7 h-7 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-white/60 font-semibold mb-2">
            Sin resultados
          </h3>
          <p class="text-white/30 text-sm mb-5">
            Prueba con otros filtros o limpia la búsqueda.
          </p>
          <button class="btn-secondary text-sm" @click="resetFilters">
            Limpiar filtros
          </button>
        </div>

        <!-- Load more -->
        <div v-if="filteredModels.length > 0" class="flex justify-center mt-12">
          <button class="btn-secondary px-10">
            Cargar más modelos
          </button>
        </div>
      </div>
    </section>

    <!-- ============ CTA SECTION ============ -->
    <section class="py-16 section-divider">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="relative card-glass p-10 sm:p-14 overflow-hidden">
          <!-- Glow background -->
          <div class="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-pink-900/20 rounded-2xl" />
          <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-brand-600/10 blur-[80px]" />

          <div class="relative z-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold tracking-wider uppercase mb-6">
              Para modelos
            </div>
            <h2 class="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              ¿Eres modelo?<br />
              <span class="text-gradient">Empieza a ganar hoy</span>
            </h2>
            <p class="text-white/50 text-base max-w-lg mx-auto mb-8 leading-relaxed">
              Únete a nuestra plataforma y conecta con miles de fans. Cobra directamente, sin intermediarios, con pagos garantizados.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button class="btn-primary text-base px-8 py-3.5">
                Crear cuenta de modelo
              </button>
              <button class="btn-ghost text-base">
                Conocer más →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grid-enter-active,
.grid-leave-active {
  transition: all 0.3s ease;
}
.grid-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
.grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.grid-move {
  transition: transform 0.3s ease;
}
</style>
