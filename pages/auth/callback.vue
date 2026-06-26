<script setup lang="ts">
// Maneja el callback de Supabase Auth (confirmación de email, OAuth, reset password)
definePageMeta({ layout: false })

const route = useRoute()
const next = (route.query.next as string) || '/cuenta'

onMounted(async () => {
  await navigateTo(next)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-900">
    <div class="flex flex-col items-center gap-4">
      <svg class="w-8 h-8 text-brand-400 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p class="text-white/40 text-sm">Verificando sesión...</p>
    </div>
  </div>
</template>
