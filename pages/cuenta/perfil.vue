<script setup lang="ts">
import type { EstadoDisponibilidad } from '~/types'
definePageMeta({ middleware: 'auth' })

const user = useSupabaseUser()
const { fetchByUserId, updatePerfil, uploadPhoto, loading, error } = useSupabaseModels()

const { data: perfil, refresh } = await useAsyncData(
  'mi-perfil-edit',
  () => fetchByUserId(user.value!.id),
)

const saved = ref(false)
const photoUploading = ref(false)

const ESTADOS: EstadoDisponibilidad[] = ['Disponible Ahora', 'Ocupada', 'De Viaje', 'Inactiva']
const TODOS_LOS_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const CIUDADES = ['Medellín', 'Bogotá', 'Cali', 'Barranquilla', 'Cartagena', 'Pereira', 'Bucaramanga', 'Manizales', 'Santa Marta', 'Cúcuta', 'Otra']

const form = reactive({
  Descripción: perfil.value?.Descripción ?? '',
  Edad: perfil.value?.Edad ?? 18,
  Ciudad_Base: perfil.value?.Ciudad_Base ?? '',
  Estatura: perfil.value?.Estatura ?? 0,
  Peso: perfil.value?.Peso ?? 0,
  Medidas: perfil.value?.Medidas ?? '',
  Color_de_cabello: perfil.value?.Color_de_cabello ?? '',
  Estado_de_Disponibilidad: perfil.value?.Estado_de_Disponibilidad ?? 'Inactiva' as EstadoDisponibilidad,
  Horario_Laboral: perfil.value?.Horario_Laboral ?? '09:00 - 21:00',
  Dias_de_Trabajo: perfil.value?.Dias_de_Trabajo ?? [] as string[],
  Precio_Base: perfil.value?.Precio_Base ?? 0,
  telefono: perfil.value?.telefono ?? '',
  whatsapp: perfil.value?.whatsapp ?? '',
  telegram_user: perfil.value?.telegram_user ?? '',
})

const toggleDia = (dia: string) => {
  const idx = form.Dias_de_Trabajo.indexOf(dia)
  if (idx >= 0) form.Dias_de_Trabajo.splice(idx, 1)
  else form.Dias_de_Trabajo.push(dia)
}

const handlePhotoUpload = async (e: Event, type: 'principal' | 'galeria') => {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length || !perfil.value) return
  photoUploading.value = true

  if (type === 'principal') {
    const url = await uploadPhoto(user.value!.id, files[0])
    if (url) await updatePerfil(perfil.value.ID, { Imagen_principal: url })
  }
  else {
    const uploads = await Promise.all(
      Array.from(files).map(f => uploadPhoto(user.value!.id, f)),
    )
    const newUrls = uploads.filter(Boolean) as string[]
    const combined = [...(perfil.value.Galeria_fotos ?? []), ...newUrls]
    await updatePerfil(perfil.value.ID, { Galeria_fotos: combined })
  }

  photoUploading.value = false
  await refresh()
}

const save = async () => {
  if (!perfil.value) return
  const ok = await updatePerfil(perfil.value.ID, { ...form })
  if (ok) {
    saved.value = true
    setTimeout(() => (saved.value = false), 3000)
    await refresh()
  }
}

useHead({ title: 'Editar perfil — lasrikas.com' })
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">

    <div class="flex items-center gap-3 mb-8">
      <NuxtLink to="/cuenta" class="text-white/40 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <h1 class="text-2xl font-display font-bold text-white">Editar perfil</h1>
    </div>

    <div v-if="!perfil" class="card-glass p-8 text-center text-white/40">
      No se encontró el perfil.
    </div>

    <template v-else>
      <div class="space-y-6">

        <!-- ── Fotos ── -->
        <section class="card-glass p-6">
          <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-5">Fotos</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Foto principal -->
            <div>
              <p class="text-xs text-white/40 mb-2">Imagen principal</p>
              <label class="relative block aspect-square rounded-xl overflow-hidden bg-dark-700 cursor-pointer group border border-white/10 hover:border-brand-500/40 transition-colors">
                <img v-if="perfil.Imagen_principal" :src="perfil.Imagen_principal" class="w-full h-full object-cover" />
                <div v-else class="flex flex-col items-center justify-center h-full gap-2">
                  <svg class="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-xs text-white/30">Subir foto</span>
                </div>
                <div v-if="perfil.Imagen_principal" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-xs text-white font-medium">Cambiar foto</span>
                </div>
                <input type="file" accept="image/*" class="sr-only" :disabled="photoUploading" @change="handlePhotoUpload($event, 'principal')" />
              </label>
            </div>

            <!-- Galería -->
            <div>
              <p class="text-xs text-white/40 mb-2">Galería ({{ perfil.Galeria_fotos?.length ?? 0 }} fotos)</p>
              <div class="grid grid-cols-3 gap-1.5">
                <div v-for="(photo, i) in perfil.Galeria_fotos" :key="i" class="aspect-square rounded-lg overflow-hidden bg-dark-700">
                  <img :src="photo" class="w-full h-full object-cover" />
                </div>
                <label class="aspect-square rounded-lg overflow-hidden bg-dark-700/60 border border-dashed border-white/10 hover:border-brand-500/40 flex items-center justify-center cursor-pointer transition-colors">
                  <svg class="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <input type="file" accept="image/*" multiple class="sr-only" :disabled="photoUploading" @change="handlePhotoUpload($event, 'galeria')" />
                </label>
              </div>
              <p v-if="photoUploading" class="text-xs text-brand-400 mt-2 animate-pulse">Subiendo fotos...</p>
            </div>
          </div>
        </section>

        <!-- ── Disponibilidad ── -->
        <section class="card-glass p-6">
          <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-5">Disponibilidad y precio</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Estado de disponibilidad</label>
              <select v-model="form.Estado_de_Disponibilidad" class="select-field w-full">
                <option v-for="e in ESTADOS" :key="e" :value="e">{{ e }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Precio base (USD/mes)</label>
              <input v-model.number="form.Precio_Base" type="number" min="0" step="0.01" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Horario laboral</label>
              <input v-model="form.Horario_Laboral" type="text" placeholder="09:00 - 21:00" class="input-field w-full" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-white/40 mb-2">Días de trabajo</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="dia in TODOS_LOS_DIAS"
                :key="dia"
                type="button"
                class="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                :class="form.Dias_de_Trabajo.includes(dia)
                  ? 'bg-brand-600 border-brand-600 text-white'
                  : 'bg-dark-700/60 border-white/10 text-white/40 hover:border-white/20'"
                @click="toggleDia(dia)"
              >
                {{ dia }}
              </button>
            </div>
          </div>
        </section>

        <!-- ── Descripción ── -->
        <section class="card-glass p-6">
          <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-5">Perfil público</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Ciudad base</label>
              <select v-model="form.Ciudad_Base" class="select-field w-full">
                <option v-for="c in CIUDADES" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Descripción</label>
              <textarea
                v-model="form.Descripción"
                rows="4"
                maxlength="600"
                placeholder="Cuéntales a tus clientes sobre ti..."
                class="input-field w-full resize-none"
              />
              <p class="text-xs text-white/20 mt-1 text-right">{{ form.Descripción.length }}/600</p>
            </div>
          </div>
        </section>

        <!-- ── Ficha técnica ── -->
        <section class="card-glass p-6">
          <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-5">Ficha técnica</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Edad</label>
              <input v-model.number="form.Edad" type="number" min="18" max="60" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Estatura (cm)</label>
              <input v-model.number="form.Estatura" type="number" min="140" max="200" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Peso (kg)</label>
              <input v-model.number="form.Peso" type="number" min="40" max="120" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Medidas</label>
              <input v-model="form.Medidas" type="text" placeholder="90-60-90" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Color de cabello</label>
              <input v-model="form.Color_de_cabello" type="text" placeholder="Castaño" class="input-field w-full" />
            </div>
          </div>
        </section>

        <!-- ── Contacto ── -->
        <section class="card-glass p-6">
          <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-5">Contacto</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Teléfono (con código de país)</label>
              <input v-model="form.telefono" type="text" placeholder="+573001234567" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">WhatsApp</label>
              <input v-model="form.whatsapp" type="text" placeholder="+573001234567" class="input-field w-full" />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/40 mb-1.5">Usuario de Telegram</label>
              <input v-model="form.telegram_user" type="text" placeholder="mi_usuario" class="input-field w-full" />
            </div>
          </div>
        </section>

        <!-- Error -->
        <div v-if="error" class="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {{ error }}
        </div>

        <!-- Save button -->
        <div class="flex items-center gap-4">
          <button class="btn-primary px-10 py-3 flex items-center gap-2" :disabled="loading" @click="save">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Guardando...' : 'Guardar cambios' }}
          </button>
          <Transition name="fade">
            <span v-if="saved" class="text-emerald-400 text-sm font-medium">✓ Guardado</span>
          </Transition>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
