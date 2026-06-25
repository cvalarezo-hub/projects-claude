<script setup lang="ts">
const year = new Date().getFullYear()

const footerLinks = {
  Plataforma: [
    { label: 'Cómo funciona', to: '/como-funciona' },
    { label: 'Precios', to: '/precios' },
    { label: 'Para modelos', to: '/para-modelos' },
    { label: 'Para agencias', to: '/agencias' },
    { label: 'Afiliados', to: '/afiliados' },
  ],
  Soporte: [
    { label: 'Centro de ayuda', to: '/ayuda' },
    { label: 'Contacto', to: '/contacto' },
    { label: 'Estado del sistema', to: '/status' },
    { label: 'Seguridad', to: '/seguridad' },
  ],
  Legal: [
    { label: 'Términos de uso', to: '/terminos' },
    { label: 'Privacidad', to: '/privacidad' },
    { label: 'Cookies', to: '/cookies' },
    { label: '18 U.S.C. § 2257', to: '/2257' },
  ],
}

const socialLinks = [
  { label: 'Twitter / X', icon: 'x', href: '#' },
  { label: 'Instagram', icon: 'ig', href: '#' },
  { label: 'Telegram', icon: 'tg', href: '#' },
]
</script>

<template>
  <footer class="bg-dark-950 border-t border-white/[0.04] mt-auto">
    <!-- Main footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        <!-- Brand column -->
        <div class="lg:col-span-2">
          <NuxtLink to="/" class="inline-flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span class="text-white font-black text-sm">LR</span>
            </div>
            <span class="font-display font-bold text-lg text-white">
              Las<span class="text-gradient">Rikas</span>
            </span>
          </NuxtLink>

          <p class="text-white/40 text-sm leading-relaxed max-w-xs">
            La plataforma premium en vivo para descubrir y conectar con modelos independientes y agencias de todo el mundo.
          </p>

          <!-- Social links -->
          <div class="flex items-center gap-3 mt-6">
            <a
              v-for="social in socialLinks"
              :key="social.icon"
              :href="social.href"
              :aria-label="social.label"
              class="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-500/20 hover:border-brand-500/40 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-brand-400 transition-all duration-200 text-xs font-bold"
            >
              {{ social.icon.toUpperCase() }}
            </a>
          </div>

          <!-- Age verification badge -->
          <div class="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.08]">
            <span class="text-xs font-black text-white/60">18+</span>
            <span class="w-px h-3 bg-white/20" />
            <span class="text-xs text-white/40">Solo adultos</span>
          </div>
        </div>

        <!-- Link columns -->
        <div
          v-for="(links, section) in footerLinks"
          :key="section"
          class="flex flex-col gap-3"
        >
          <h3 class="text-xs font-semibold tracking-widest uppercase text-white/30 mb-1">
            {{ section }}
          </h3>
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-sm text-white/50 hover:text-white/90 transition-colors duration-200"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/[0.04]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-white/25">
          © {{ year }} Las Rikas. Todos los derechos reservados.
        </p>
        <p class="text-xs text-white/25">
          Todo el contenido es para adultos mayores de 18 años.
        </p>
      </div>
    </div>
  </footer>
</template>
