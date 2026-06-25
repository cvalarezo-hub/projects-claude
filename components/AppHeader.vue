<script setup lang="ts">
import type { NavItem } from '~/types'

const navItems: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Modelos', to: '/modelos' },
  { label: 'Agencias', to: '/agencias' },
  { label: 'En Vivo', to: '/live', badge: 'LIVE' },
  { label: 'Premium', to: '/premium' },
]

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
const closeMenu = () => (isMenuOpen.value = false)

watch(() => route.path, closeMenu)

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-dark-900/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg'
      : 'bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-18">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 flex-shrink-0 group">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand-sm group-hover:shadow-glow-brand transition-shadow">
            <span class="text-white font-black text-sm">LR</span>
          </div>
          <span class="font-display font-bold text-lg text-white">
            Las<span class="text-gradient">Rikas</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center gap-1">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
              :class="route.path === item.to
                ? 'text-white bg-white/5'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'"
            >
              {{ item.label }}
              <span
                v-if="item.badge"
                class="px-1.5 py-0.5 text-[10px] font-black tracking-wider rounded bg-red-500 text-white leading-none animate-pulse-slow"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </li>
        </ul>

        <!-- Desktop CTA -->
        <div class="hidden lg:flex items-center gap-3">
          <button class="btn-ghost text-sm">
            Iniciar sesión
          </button>
          <button class="btn-primary text-sm">
            Registrarse
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
          :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="toggleMenu"
        >
          <span
            class="block w-5 h-0.5 bg-white/80 transition-all duration-300 origin-center"
            :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"
          />
          <span
            class="block w-5 h-0.5 bg-white/80 transition-all duration-300"
            :class="isMenuOpen ? 'opacity-0 scale-x-0' : ''"
          />
          <span
            class="block w-5 h-0.5 bg-white/80 transition-all duration-300 origin-center"
            :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"
          />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div
        v-if="isMenuOpen"
        class="lg:hidden bg-dark-800/98 backdrop-blur-xl border-t border-white/[0.06]"
      >
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            :class="route.path === item.to
              ? 'text-white bg-brand-500/10 text-brand-400'
              : 'text-white/70 hover:text-white hover:bg-white/5'"
          >
            {{ item.label }}
            <span
              v-if="item.badge"
              class="px-2 py-0.5 text-[10px] font-black tracking-wider rounded bg-red-500 text-white"
            >
              {{ item.badge }}
            </span>
          </NuxtLink>

          <div class="pt-4 flex flex-col gap-2 border-t border-white/[0.06]">
            <button class="btn-secondary w-full justify-center">
              Iniciar sesión
            </button>
            <button class="btn-primary w-full justify-center">
              Registrarse gratis
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
