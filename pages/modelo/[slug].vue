<script setup lang="ts">
import type { EstadoDisponibilidad } from '~/types'

const route = useRoute()
const { getBySlug } = useModels()

const model = getBySlug(route.params.slug as string)

if (!model) {
  throw createError({ statusCode: 404, statusMessage: 'Modelo no encontrada' })
}

// ─── Gallery ───────────────────────────────────────────────────────────────
const allPhotos = computed(() =>
  model.Galeria_fotos.length > 0 ? model.Galeria_fotos : [model.Imagen_principal],
)
const currentIdx = ref(0)
const activePhoto = computed(() => allPhotos.value[currentIdx.value])
const prevPhoto = () => { currentIdx.value = (currentIdx.value - 1 + allPhotos.value.length) % allPhotos.value.length }
const nextPhoto = () => { currentIdx.value = (currentIdx.value + 1) % allPhotos.value.length }

// ─── Status config ─────────────────────────────────────────────────────────
type StatusCfg = Record<EstadoDisponibilidad, { label: string; color: string; dot: string; bg: string }>
const STATUS_CFG: StatusCfg = {
  'Disponible Ahora': { label: 'Disponible Ahora', color: 'text-emerald-400', dot: 'bg-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/35' },
  'Ocupada':          { label: 'Ocupada',           color: 'text-amber-400',   dot: 'bg-amber-400',   bg: 'bg-amber-500/15 border-amber-500/35'   },
  'De Viaje':         { label: 'De Viaje',          color: 'text-blue-400',    dot: 'bg-blue-400',    bg: 'bg-blue-500/15 border-blue-500/35'     },
  'Inactiva':         { label: 'Inactiva',          color: 'text-white/30',    dot: 'bg-white/25',    bg: 'bg-white/5 border-white/10'            },
}
const status = computed(() => STATUS_CFG[model.Estado_de_Disponibilidad])

// ─── Days schedule ─────────────────────────────────────────────────────────
const DIAS_SEMANA = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const DIAS_FULL   = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const isDiaActivo = (idx: number) => model.Dias_de_Trabajo.includes(DIAS_FULL[idx])

// ─── Plan label ────────────────────────────────────────────────────────────
const planLabel = computed(() => {
  if (!model.plan_id) return null
  const map: Record<number, string> = { 1: 'Básico', 2: 'Premium', 3: 'Elite' }
  return map[model.plan_id] ?? null
})

// ─── Contact helpers ───────────────────────────────────────────────────────
const waLink = computed(() =>
  model.whatsapp
    ? `https://wa.me/${model.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${model.Nombre}, vi tu perfil en lasrikas.com`)}`
    : null,
)
const tgLink = computed(() =>
  model.telegram_user ? `https://t.me/${model.telegram_user}` : null,
)

// ─── SEO ───────────────────────────────────────────────────────────────────
useHead({
  title: `${model.Nombre} — Modelo en ${model.Ciudad_Base} | lasrikas.com`,
  meta: [
    {
      name: 'description',
      content: `Perfil oficial${model.is_verified ? ' verificado' : ''} de ${model.Nombre} en ${model.Ciudad_Base}. Conoce sus tarifas, horarios y fotos exclusivas.`,
    },
    { property: 'og:title',       content: `${model.Nombre} — ${model.Ciudad_Base} | lasrikas.com` },
    { property: 'og:description', content: model.Descripción },
    { property: 'og:image',       content: model.Imagen_principal },
    { property: 'og:type',        content: 'profile' },
    { name: 'robots',             content: 'index, follow' },
  ],
  link: [{ rel: 'canonical', href: `https://lasrikas.com/modelo/${model.Slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntity: {
          '@type': 'Person',
          name: model.Nombre,
          description: model.Descripción,
          image: model.Imagen_principal,
          nationality: model.Nacionalidad,
          jobTitle: 'Modelo independiente',
          address: {
            '@type': 'PostalAddress',
            addressLocality: model.Ciudad_Base,
            addressCountry: 'CO',
          },
        },
      }),
    },
  ],
})
</script>

<template>
  <div class="pt-16 pb-20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Back nav -->
      <div class="py-4">
        <NuxtLink
          to="/modelos"
          class="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Directorio
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10">

        <!-- ══════ LEFT COLUMN ══════ -->
        <div class="space-y-6">

          <!-- ── Gallery ── -->
          <div class="relative rounded-2xl overflow-hidden bg-dark-800">
            <!-- Main image -->
            <div class="relative aspect-[4/5] sm:aspect-[16/10]">
              <Transition name="photo" mode="out-in">
                <img
                  :key="currentIdx"
                  :src="activePhoto"
                  :alt="`Foto ${currentIdx + 1} de ${model.Nombre}`"
                  class="w-full h-full object-cover"
                />
              </Transition>

              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />

              <!-- Nav arrows (only when multiple photos) -->
              <template v-if="allPhotos.length > 1">
                <button
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Foto anterior"
                  @click="prevPhoto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Foto siguiente"
                  @click="nextPhoto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </template>

              <!-- Photo counter -->
              <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white/70 font-medium">
                {{ currentIdx + 1 }} / {{ allPhotos.length }}
              </div>
            </div>

            <!-- Thumbnails strip -->
            <div v-if="allPhotos.length > 1" class="flex gap-2 p-3 overflow-x-auto no-scrollbar">
              <button
                v-for="(photo, i) in allPhotos"
                :key="i"
                class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                :class="i === currentIdx
                  ? 'border-brand-500 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80'"
                @click="currentIdx = i"
              >
                <img :src="photo" :alt="`Miniatura ${i + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- ── Descripción ── -->
          <div class="card-glass p-6">
            <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Sobre mí</h2>
            <p class="text-white/70 text-sm leading-relaxed">
              {{ model.Descripción }}
            </p>
          </div>

          <!-- ── Horario y días ── -->
          <div class="card-glass p-6">
            <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-5">Disponibilidad</h2>

            <!-- Horario visual -->
            <div class="flex items-center gap-3 mb-5 p-4 rounded-xl bg-dark-700/60">
              <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-white/35 mb-0.5">Horario laboral</p>
                <p class="text-white font-semibold text-lg tracking-wide">{{ model.Horario_Laboral }}</p>
              </div>
            </div>

            <!-- Week grid -->
            <div class="grid grid-cols-7 gap-1.5">
              <div
                v-for="(dia, i) in DIAS_SEMANA"
                :key="dia"
                class="flex flex-col items-center gap-1.5"
              >
                <span class="text-[10px] font-medium" :class="isDiaActivo(i) ? 'text-white/50' : 'text-white/20'">
                  {{ dia }}
                </span>
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                  :class="isDiaActivo(i)
                    ? 'bg-brand-500/25 border border-brand-500/50'
                    : 'bg-white/5 border border-white/5'"
                >
                  <span
                    class="w-2.5 h-2.5 rounded-full"
                    :class="isDiaActivo(i) ? 'bg-brand-400' : 'bg-white/10'"
                  />
                </div>
              </div>
            </div>

            <p class="text-xs text-white/25 mt-3">
              Trabaja {{ model.Dias_de_Trabajo.length }} días a la semana
            </p>
          </div>
        </div>

        <!-- ══════ RIGHT COLUMN ══════ -->
        <div class="space-y-5">

          <!-- ── Header card ── -->
          <div class="card-glass p-6">
            <!-- Status badge -->
            <div
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide mb-4"
              :class="[status.bg, status.color]"
            >
              <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="status.dot" />
              {{ status.label }}
            </div>

            <!-- Name + verification -->
            <div class="flex items-start gap-3 mb-1">
              <h1 class="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {{ model.Nombre }}
              </h1>
              <div
                v-if="model.is_verified"
                class="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/30 border border-brand-500/50 flex items-center justify-center"
                title="Perfil verificado"
              >
                <svg class="w-3.5 h-3.5 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <p class="text-white/40 text-sm mb-4">
              {{ model.Nacionalidad }} · {{ model.Ciudad_Base }}
            </p>

            <!-- Plan badge -->
            <div v-if="planLabel" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/35 text-gold-400 text-xs font-bold">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Plan {{ planLabel }}
            </div>

            <!-- Price -->
            <div class="mt-5 pt-5 border-t border-white/[0.06] flex items-baseline gap-2">
              <span class="text-3xl font-bold text-brand-400">${{ model.Precio_Base }}</span>
              <span class="text-white/30 text-sm">USD / mes</span>
            </div>
          </div>

          <!-- ── Ficha técnica ── -->
          <div class="card-glass p-6">
            <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Ficha técnica</h2>
            <dl class="space-y-3">
              <div class="flex items-center justify-between">
                <dt class="text-xs text-white/35 font-medium">Edad</dt>
                <dd class="text-sm text-white font-semibold">{{ model.Edad }} años</dd>
              </div>
              <div class="h-px bg-white/[0.04]" />
              <div class="flex items-center justify-between">
                <dt class="text-xs text-white/35 font-medium">Estatura</dt>
                <dd class="text-sm text-white font-semibold">{{ model.Estatura }} cm</dd>
              </div>
              <div class="h-px bg-white/[0.04]" />
              <div class="flex items-center justify-between">
                <dt class="text-xs text-white/35 font-medium">Peso</dt>
                <dd class="text-sm text-white font-semibold">{{ model.Peso }} kg</dd>
              </div>
              <div class="h-px bg-white/[0.04]" />
              <div class="flex items-center justify-between">
                <dt class="text-xs text-white/35 font-medium">Medidas</dt>
                <dd class="text-sm text-white font-semibold font-mono">{{ model.Medidas }}</dd>
              </div>
              <div class="h-px bg-white/[0.04]" />
              <div class="flex items-center justify-between">
                <dt class="text-xs text-white/35 font-medium">Color de cabello</dt>
                <dd class="text-sm text-white font-semibold">{{ model.Color_de_cabello }}</dd>
              </div>
              <div class="h-px bg-white/[0.04]" />
              <div class="flex items-center justify-between">
                <dt class="text-xs text-white/35 font-medium">Nacionalidad</dt>
                <dd class="text-sm text-white font-semibold">{{ model.Nacionalidad }}</dd>
              </div>
            </dl>
          </div>

          <!-- ── Action buttons ── -->
          <div class="card-glass p-5 space-y-3">
            <h2 class="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Contactar</h2>

            <!-- Call -->
            <a
              :href="model.telefono ? `tel:${model.telefono}` : undefined"
              :class="model.telefono ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center opacity-40 pointer-events-none'"
              :aria-disabled="!model.telefono"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Llamar
            </a>

            <!-- WhatsApp -->
            <a
              :href="waLink ?? '#'"
              target="_blank"
              rel="noopener noreferrer"
              :class="waLink ? 'w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 transition-all duration-200' : 'btn-secondary w-full justify-center opacity-40 pointer-events-none'"
              :aria-disabled="!waLink"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            <!-- Telegram -->
            <a
              :href="tgLink ?? '#'"
              target="_blank"
              rel="noopener noreferrer"
              :class="tgLink ? 'w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm bg-[#229ED9]/15 border border-[#229ED9]/40 text-[#229ED9] hover:bg-[#229ED9]/25 transition-all duration-200' : 'btn-secondary w-full justify-center opacity-40 pointer-events-none'"
              :aria-disabled="!tgLink"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Telegram
            </a>
          </div>

          <!-- ── Disclaimer ── -->
          <p class="text-[10px] text-white/15 text-center leading-relaxed px-2">
            Al contactar confirmas que tienes 18 años o más. Las tarifas y disponibilidad son definidas exclusivamente por la modelo.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-enter-active,
.photo-leave-active {
  transition: opacity 0.25s ease;
}
.photo-enter-from,
.photo-leave-to {
  opacity: 0;
}
</style>
