<script setup lang="ts">
useHead({
  title: 'Agencias — lasrikas.com',
  meta: [{ name: 'description', content: 'Directorio de agencias de modelos en Colombia. Encuentra representación o contrata modelos a través de agencias verificadas.' }],
})

const agencias = [
  { nombre: 'Elite Medellín', ciudad: 'Medellín', modelos: 24, descripcion: 'Agencia líder en Antioquia con más de 5 años representando talento femenino de alto nivel.', is_verified: true },
  { nombre: 'Bogotá VIP Agency', ciudad: 'Bogotá', modelos: 18, descripcion: 'Representación exclusiva para modelos del área metropolitana de Bogotá.', is_verified: true },
  { nombre: 'Cali Stars', ciudad: 'Cali', modelos: 12, descripcion: 'Agencia especializada en talento del Valle del Cauca.', is_verified: false },
  { nombre: 'Caribbean Models', ciudad: 'Cartagena', modelos: 9, descripcion: 'Agencia de la Costa Caribe colombiana con modelos disponibles para viajes.', is_verified: true },
]
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">

    <div class="mb-10">
      <h1 class="text-3xl font-display font-bold text-white">Agencias</h1>
      <p class="text-white/40 mt-2">Directorio de agencias verificadas en Colombia</p>
    </div>

    <!-- Coming soon banner -->
    <div class="card-glass p-6 mb-8 border border-brand-500/20">
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="text-white font-medium text-sm">Directorio de agencias próximamente</p>
          <p class="text-white/40 text-xs mt-0.5">Estamos en proceso de incorporar agencias verificadas. ¿Tienes una agencia? Contáctanos.</p>
          <a href="mailto:agencias@lasrikas.com" class="inline-block mt-2 text-xs text-brand-400 hover:text-brand-300 font-medium">
            agencias@lasrikas.com →
          </a>
        </div>
      </div>
    </div>

    <!-- Grid de agencias (mock) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="agencia in agencias"
        :key="agencia.nombre"
        class="card-glass p-6 flex flex-col gap-3"
      >
        <!-- Avatar -->
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-600/30 to-dark-700 flex items-center justify-center">
          <span class="font-black text-xl text-brand-400">{{ agencia.nombre.charAt(0) }}</span>
        </div>

        <div>
          <div class="flex items-center gap-2 mb-1">
            <h2 class="font-semibold text-white text-sm">{{ agencia.nombre }}</h2>
            <svg v-if="agencia.is_verified" class="w-3.5 h-3.5 text-brand-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="text-xs text-white/40 mb-2">{{ agencia.ciudad }} · {{ agencia.modelos }} modelos</p>
          <p class="text-xs text-white/50 leading-relaxed">{{ agencia.descripcion }}</p>
        </div>

        <button class="mt-auto btn-secondary text-xs py-2 w-full justify-center" disabled>
          Ver perfil (próximamente)
        </button>
      </div>
    </div>
  </div>
</template>
