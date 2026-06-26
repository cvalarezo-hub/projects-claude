<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { login, loading, error } = useAuth()

const form = reactive({ email: '', password: '' })
const showPass = ref(false)

const submit = async () => {
  const ok = await login(form.email, form.password)
  if (ok) await navigateTo('/cuenta')
}

useHead({ title: 'Iniciar sesión — lasrikas.com' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 pt-16">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand-sm">
            <span class="text-white font-black text-sm">LR</span>
          </div>
          <span class="font-display font-bold text-xl text-white">Las<span class="text-gradient">Rikas</span></span>
        </NuxtLink>
        <h1 class="text-xl font-semibold text-white mt-6">Bienvenida de vuelta</h1>
        <p class="text-white/40 text-sm mt-1">Ingresa a tu cuenta</p>
      </div>

      <div class="card-glass p-8">
        <form class="space-y-5" @submit.prevent="submit">
          <!-- Error -->
          <div v-if="error" class="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {{ error }}
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-medium text-white/50 mb-1.5">Email</label>
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              placeholder="tu@email.com"
              class="input-field w-full"
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-medium text-white/50">Contraseña</label>
              <NuxtLink to="/auth/reset-password" class="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </NuxtLink>
            </div>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="input-field w-full pr-11"
              />
              <button
                type="button"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                @click="showPass = !showPass"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!showPass" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 5.943 7.523 3 12 3c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full justify-center py-3" :disabled="loading">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-white/[0.06] text-center">
          <p class="text-sm text-white/40">
            ¿Eres modelo y aún no tienes cuenta?
            <NuxtLink to="/auth/registro" class="text-brand-400 hover:text-brand-300 font-medium ml-1 transition-colors">
              Regístrate gratis
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
