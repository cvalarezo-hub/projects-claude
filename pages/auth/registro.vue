<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { registerModelo, loading, error } = useAuth()

const step = ref<1 | 2>(1)
const showPass = ref(false)

const form = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  Nombre: '',
  Edad: '' as unknown as number,
  Ciudad_Base: '',
})

const CIUDADES = ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Cartagena', 'Pereira', 'Bucaramanga', 'Manizales', 'Santa Marta', 'Cúcuta', 'Otra']

const validateStep1 = computed(() =>
  form.email.includes('@')
  && form.password.length >= 8
  && form.password === form.passwordConfirm,
)

const submit = async () => {
  if (!validateStep1.value || !form.Nombre || !form.Edad || !form.Ciudad_Base) return

  const slug = form.Nombre
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  const result = await registerModelo(form.email, form.password, {
    Nombre: form.Nombre,
    Edad: Number(form.Edad),
    Ciudad_Base: form.Ciudad_Base,
    Slug: `${slug}-${Date.now().toString(36)}`,
  })

  if (result === true) await navigateTo('/cuenta')
}

useHead({ title: 'Registro de modelo — lasrikas.com' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 pt-16 pb-10">
    <div class="w-full max-w-md">

      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand-sm">
            <span class="text-white font-black text-sm">LR</span>
          </div>
          <span class="font-display font-bold text-xl text-white">Las<span class="text-gradient">Rikas</span></span>
        </NuxtLink>
        <h1 class="text-xl font-semibold text-white mt-6">Crea tu perfil de modelo</h1>
        <p class="text-white/40 text-sm mt-1">Paso {{ step }} de 2</p>
      </div>

      <!-- Step indicator -->
      <div class="flex gap-2 mb-6">
        <div class="flex-1 h-1 rounded-full transition-all duration-300" :class="step >= 1 ? 'bg-brand-500' : 'bg-white/10'" />
        <div class="flex-1 h-1 rounded-full transition-all duration-300" :class="step >= 2 ? 'bg-brand-500' : 'bg-white/10'" />
      </div>

      <div class="card-glass p-8">
        <form class="space-y-5" @submit.prevent="step === 1 ? (step = 2) : submit()">

          <!-- Error -->
          <div v-if="error" class="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {{ error }}
          </div>

          <!-- ── PASO 1: Cuenta ── -->
          <template v-if="step === 1">
            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Email</label>
              <input v-model="form.email" type="email" required placeholder="tu@email.com" class="input-field w-full" />
            </div>

            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Contraseña (mín. 8 caracteres)</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPass ? 'text' : 'password'"
                  required
                  minlength="8"
                  placeholder="••••••••"
                  class="input-field w-full pr-11"
                />
                <button type="button" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60" @click="showPass = !showPass">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 5.943 7.523 3 12 3c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Confirmar contraseña</label>
              <input
                v-model="form.passwordConfirm"
                type="password"
                required
                placeholder="••••••••"
                class="input-field w-full"
                :class="form.passwordConfirm && form.password !== form.passwordConfirm ? '!border-red-500/50' : ''"
              />
              <p v-if="form.passwordConfirm && form.password !== form.passwordConfirm" class="text-red-400 text-xs mt-1">
                Las contraseñas no coinciden
              </p>
            </div>

            <button
              type="submit"
              class="btn-primary w-full justify-center py-3"
              :disabled="!validateStep1"
            >
              Siguiente →
            </button>
          </template>

          <!-- ── PASO 2: Datos básicos ── -->
          <template v-else>
            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Nombre artístico</label>
              <input v-model="form.Nombre" type="text" required placeholder="Ej: Valentina Ríos" class="input-field w-full" />
            </div>

            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Edad</label>
              <input
                v-model.number="form.Edad"
                type="number"
                required
                min="18"
                max="60"
                placeholder="18"
                class="input-field w-full"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Ciudad base</label>
              <select v-model="form.Ciudad_Base" required class="select-field w-full">
                <option value="" disabled>Selecciona tu ciudad</option>
                <option v-for="c in CIUDADES" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <div class="pt-1 flex gap-3">
              <button type="button" class="btn-secondary flex-1 justify-center py-3" @click="step = 1">
                ← Atrás
              </button>
              <button type="submit" class="btn-primary flex-1 justify-center py-3" :disabled="loading">
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ loading ? 'Creando cuenta...' : 'Crear perfil' }}
              </button>
            </div>
          </template>
        </form>

        <div class="mt-6 pt-6 border-t border-white/[0.06] text-center">
          <p class="text-sm text-white/40">
            ¿Ya tienes cuenta?
            <NuxtLink to="/auth/login" class="text-brand-400 hover:text-brand-300 font-medium ml-1">
              Inicia sesión
            </NuxtLink>
          </p>
        </div>
      </div>

      <p class="text-[10px] text-white/20 text-center mt-5 px-4">
        Al registrarte confirmas que tienes 18 años o más y aceptas los
        <NuxtLink to="/terminos" class="underline">Términos de uso</NuxtLink>
        y la
        <NuxtLink to="/privacidad" class="underline">Política de privacidad</NuxtLink>.
      </p>
    </div>
  </div>
</template>
