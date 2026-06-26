<script setup lang="ts">
const COOKIE_KEY = 'lr_age_verified'
const show = ref(false)

onMounted(() => {
  const verified = document.cookie.split(';').some(c => c.trim().startsWith(`${COOKIE_KEY}=1`))
  if (!verified) show.value = true
})

const confirm = () => {
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString()
  document.cookie = `${COOKIE_KEY}=1;path=/;expires=${expires};SameSite=Lax`
  show.value = false
}

const leave = () => {
  window.location.href = 'https://www.google.com'
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-gate">
      <div v-if="show" class="fixed inset-0 z-[999] flex items-center justify-center p-4" style="background:rgba(3,4,10,0.97);backdrop-filter:blur(20px);">
        <div class="w-full max-w-sm text-center">
          <!-- Logo -->
          <div class="flex justify-center mb-6">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand">
              <span class="text-white font-black text-xl">LR</span>
            </div>
          </div>

          <h1 class="font-display font-bold text-2xl text-white mb-2">
            Las<span class="text-gradient">Rikas</span>
          </h1>

          <p class="text-white/40 text-sm mb-8">
            Este sitio contiene contenido para adultos.<br />
            Solo pueden acceder personas mayores de 18 años.
          </p>

          <div class="card-glass p-6 mb-4">
            <p class="text-white font-medium mb-1">¿Tienes 18 años o más?</p>
            <p class="text-white/30 text-xs mb-6">Al continuar confirmas que cumples con la edad mínima requerida en tu país.</p>

            <div class="flex flex-col gap-3">
              <button class="btn-primary w-full justify-center py-3 text-base font-semibold" @click="confirm">
                Sí, tengo 18 años o más
              </button>
              <button class="btn-ghost w-full justify-center py-3 text-sm text-white/40 hover:text-white/60" @click="leave">
                No, salir
              </button>
            </div>
          </div>

          <p class="text-[10px] text-white/20 px-4">
            Al ingresar aceptas nuestros
            <NuxtLink to="/terminos" class="underline" @click="confirm">Términos de uso</NuxtLink>
            y
            <NuxtLink to="/privacidad" class="underline" @click="confirm">Política de privacidad</NuxtLink>.
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-gate-enter-active, .fade-gate-leave-active { transition: opacity 0.4s ease; }
.fade-gate-enter-from, .fade-gate-leave-to { opacity: 0; }
</style>
