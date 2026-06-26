<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const user = useSupabaseUser()
const { fetchByUserId } = useSupabaseModels()
const { logout } = useAuth()

const { data: perfil, pending } = await useAsyncData(
  'mi-perfil',
  () => fetchByUserId(user.value!.id),
)

useHead({ title: 'Mi cuenta — lasrikas.com' })
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">

    <!-- Header -->
    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="text-2xl font-display font-bold text-white">
          {{ perfil?.Nombre ?? 'Mi cuenta' }}
        </h1>
        <p class="text-white/40 text-sm mt-1">{{ user?.email }}</p>
      </div>
      <button class="btn-ghost text-sm text-red-400 hover:text-red-300" @click="logout">
        Cerrar sesión
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="card-glass h-28 animate-pulse" />
    </div>

    <!-- Sin perfil de modelo -->
    <div v-else-if="!perfil" class="card-glass p-8 text-center">
      <p class="text-white/50 mb-4">No encontramos un perfil de modelo asociado a esta cuenta.</p>
      <NuxtLink to="/auth/registro" class="btn-primary">Crear perfil de modelo</NuxtLink>
    </div>

    <!-- Dashboard con perfil -->
    <template v-else>
      <!-- Status rápido -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="card-glass p-5">
          <p class="text-xs text-white/30 mb-1">Estado actual</p>
          <p class="font-semibold text-sm" :class="{
            'text-emerald-400': perfil.Estado_de_Disponibilidad === 'Disponible Ahora',
            'text-amber-400':   perfil.Estado_de_Disponibilidad === 'Ocupada',
            'text-blue-400':    perfil.Estado_de_Disponibilidad === 'De Viaje',
            'text-white/30':    perfil.Estado_de_Disponibilidad === 'Inactiva',
          }">
            {{ perfil.Estado_de_Disponibilidad }}
          </p>
        </div>
        <div class="card-glass p-5">
          <p class="text-xs text-white/30 mb-1">Ciudad base</p>
          <p class="font-semibold text-sm text-white">{{ perfil.Ciudad_Base || '—' }}</p>
        </div>
        <div class="card-glass p-5">
          <p class="text-xs text-white/30 mb-1">Perfil verificado</p>
          <p class="font-semibold text-sm" :class="perfil.is_verified ? 'text-brand-400' : 'text-white/30'">
            {{ perfil.is_verified ? '✓ Verificada' : 'Pendiente' }}
          </p>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <NuxtLink to="/cuenta/perfil" class="card-glass p-6 flex items-center gap-4 card-hover group">
          <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors">
            <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-white text-sm">Editar perfil</p>
            <p class="text-xs text-white/35">Fotos, descripción, horarios y tarifas</p>
          </div>
          <svg class="w-4 h-4 text-white/20 ml-auto group-hover:text-brand-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>

        <NuxtLink :to="`/modelo/${perfil.Slug}`" target="_blank" class="card-glass p-6 flex items-center gap-4 card-hover group">
          <div class="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center group-hover:bg-dark-500 transition-colors">
            <svg class="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div>
            <p class="font-semibold text-white text-sm">Ver mi perfil público</p>
            <p class="text-xs text-white/35">lasrikas.com/modelo/{{ perfil.Slug }}</p>
          </div>
          <svg class="w-4 h-4 text-white/20 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Completar perfil -->
      <div v-if="!perfil.Descripción || !perfil.Imagen_principal" class="card-glass p-6 border border-amber-500/20">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p class="text-amber-400 font-medium text-sm">Perfil incompleto</p>
            <p class="text-white/40 text-xs mt-0.5">
              Tu perfil aún no tiene {{ !perfil.Imagen_principal ? 'foto principal' : '' }}{{ !perfil.Imagen_principal && !perfil.Descripción ? ' ni ' : '' }}{{ !perfil.Descripción ? 'descripción' : '' }}. Complétalo para aparecer en el directorio.
            </p>
            <NuxtLink to="/cuenta/perfil" class="inline-block mt-2 text-xs text-brand-400 hover:text-brand-300 font-medium">
              Completar ahora →
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
