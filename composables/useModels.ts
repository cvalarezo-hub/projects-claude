import type { Model, FilterState, EstadoDisponibilidad } from '~/types'

const TODOS_LOS_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

const MOCK_MODELS: Model[] = [
  {
    ID: 1,
    Nombre: 'Valentina Ríos',
    Email: 'valentina.rios@lasrikas.com',
    Slug: 'valentina-rios',
    Descripción: 'Modelo fitness y lifestyle con más de 5 años de experiencia en la industria. Me apasiona el bienestar, la nutrición y el entrenamiento funcional. Ofrezco contenido exclusivo, asesorías personalizadas y encuentros privados previa cita.',
    Edad: 24,
    Nacionalidad: 'Colombiana',
    Estatura: 168,
    Peso: 55,
    Medidas: '90-62-92',
    Color_de_cabello: 'Castaño',
    Estado_de_Disponibilidad: 'Disponible Ahora',
    Imagen_principal: 'https://i.pravatar.cc/800?img=47',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=47',
      'https://i.pravatar.cc/800?img=44',
      'https://i.pravatar.cc/800?img=48',
      'https://i.pravatar.cc/800?img=46',
    ],
    video_url: null,
    Horario_Laboral: '10:00 - 22:00',
    Dias_de_Trabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    Ciudad_Base: 'Medellín',
    Precio_Base: 9.99,
    is_verified: true,
    verified_at: '2025-01-15T10:00:00Z',
    plan_id: 2,
    featured_until: '2026-12-31T23:59:59Z',
    telefono: '+573001234567',
    whatsapp: '+573001234567',
    telegram_user: 'valentina_rios_ok',
  },
  {
    ID: 2,
    Nombre: 'Sofía Montoya',
    Email: 'sofia.montoya@lasrikas.com',
    Slug: 'sofia-montoya',
    Descripción: 'Modelo de moda y alta costura. Colaboro con marcas premium nacionales e internacionales. Mi contenido combina arte, elegancia y sensualidad. Disponible para shoots, eventos y colaboraciones de marca.',
    Edad: 22,
    Nacionalidad: 'Colombiana',
    Estatura: 172,
    Peso: 52,
    Medidas: '88-60-90',
    Color_de_cabello: 'Negro',
    Estado_de_Disponibilidad: 'Disponible Ahora',
    Imagen_principal: 'https://i.pravatar.cc/800?img=45',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=45',
      'https://i.pravatar.cc/800?img=49',
      'https://i.pravatar.cc/800?img=43',
    ],
    video_url: null,
    Horario_Laboral: '11:00 - 23:00',
    Dias_de_Trabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    Ciudad_Base: 'Bogotá',
    Precio_Base: 14.99,
    is_verified: true,
    verified_at: '2025-03-20T14:00:00Z',
    plan_id: 3,
    featured_until: '2026-09-30T23:59:59Z',
    telefono: '+573107654321',
    whatsapp: '+573107654321',
    telegram_user: 'sofia_montoya_col',
  },
  {
    ID: 3,
    Nombre: 'Isabella Castro',
    Email: 'isabella.castro@lasrikas.com',
    Slug: 'isabella-castro',
    Descripción: 'Bailarina profesional de salsa y urbano con formación en la Academia Cali Art. Shows en vivo los viernes y sábados. Clases privadas de baile disponibles bajo petición.',
    Edad: 26,
    Nacionalidad: 'Colombiana',
    Estatura: 165,
    Peso: 57,
    Medidas: '92-65-95',
    Color_de_cabello: 'Castaño oscuro',
    Estado_de_Disponibilidad: 'Ocupada',
    Imagen_principal: 'https://i.pravatar.cc/800?img=44',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=44',
      'https://i.pravatar.cc/800?img=47',
      'https://i.pravatar.cc/800?img=42',
    ],
    video_url: null,
    Horario_Laboral: '18:00 - 02:00',
    Dias_de_Trabajo: ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    Ciudad_Base: 'Cali',
    Precio_Base: 7.99,
    is_verified: true,
    verified_at: '2025-02-10T09:00:00Z',
    plan_id: 1,
    featured_until: null,
    telefono: '+573209876543',
    whatsapp: '+573209876543',
    telegram_user: null,
  },
  {
    ID: 4,
    Nombre: 'Camila Vargas',
    Email: 'camila.vargas@lasrikas.com',
    Slug: 'camila-vargas',
    Descripción: 'Entrenadora personal certificada y modelo fitness. Especialista en nutrición deportiva. Tu guía definitiva hacia un estilo de vida saludable. Disponible para asesorías nutricionales y sesiones de entrenamiento presencial.',
    Edad: 23,
    Nacionalidad: 'Colombiana',
    Estatura: 170,
    Peso: 54,
    Medidas: '90-61-93',
    Color_de_cabello: 'Rubio',
    Estado_de_Disponibilidad: 'Disponible Ahora',
    Imagen_principal: 'https://i.pravatar.cc/800?img=48',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=48',
      'https://i.pravatar.cc/800?img=45',
      'https://i.pravatar.cc/800?img=49',
    ],
    video_url: null,
    Horario_Laboral: '07:00 - 19:00',
    Dias_de_Trabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    Ciudad_Base: 'Barranquilla',
    Precio_Base: 5.99,
    is_verified: false,
    verified_at: null,
    plan_id: 1,
    featured_until: null,
    telefono: '+573155551234',
    whatsapp: '+573155551234',
    telegram_user: 'camila_fit_baq',
  },
  {
    ID: 5,
    Nombre: 'Mariana López',
    Email: 'mariana.lopez@lasrikas.com',
    Slug: 'mariana-lopez',
    Descripción: 'Fashion blogger y modelo con presencia en redes de más de 200k seguidores. Especialista en street style y tendencias europeas. Actualmente de gira por Europa para colaboraciones con marcas internacionales.',
    Edad: 25,
    Nacionalidad: 'Colombiana',
    Estatura: 167,
    Peso: 56,
    Medidas: '91-63-94',
    Color_de_cabello: 'Negro',
    Estado_de_Disponibilidad: 'De Viaje',
    Imagen_principal: 'https://i.pravatar.cc/800?img=49',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=49',
      'https://i.pravatar.cc/800?img=46',
      'https://i.pravatar.cc/800?img=44',
    ],
    video_url: null,
    Horario_Laboral: '09:00 - 21:00',
    Dias_de_Trabajo: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'],
    Ciudad_Base: 'Medellín',
    Precio_Base: 19.99,
    is_verified: true,
    verified_at: '2024-11-05T16:00:00Z',
    plan_id: 3,
    featured_until: '2026-08-15T23:59:59Z',
    telefono: null,
    whatsapp: '+573002223344',
    telegram_user: 'mariana_style',
  },
  {
    ID: 6,
    Nombre: 'Daniela Peña',
    Email: 'daniela.pena@lasrikas.com',
    Slug: 'daniela-pena',
    Descripción: 'Artista visual, fotógrafa y modelo creativa. Mis proyectos fusionan el arte conceptual con la sensualidad. Cada sesión es una obra única. Acepto propuestas creativas y colaboraciones artísticas.',
    Edad: 21,
    Nacionalidad: 'Colombiana',
    Estatura: 163,
    Peso: 51,
    Medidas: '87-59-89',
    Color_de_cabello: 'Castaño claro',
    Estado_de_Disponibilidad: 'Disponible Ahora',
    Imagen_principal: 'https://i.pravatar.cc/800?img=46',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=46',
      'https://i.pravatar.cc/800?img=43',
      'https://i.pravatar.cc/800?img=48',
      'https://i.pravatar.cc/800?img=45',
    ],
    video_url: null,
    Horario_Laboral: '14:00 - 00:00',
    Dias_de_Trabajo: ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    Ciudad_Base: 'Bogotá',
    Precio_Base: 6.99,
    is_verified: false,
    verified_at: null,
    plan_id: 1,
    featured_until: null,
    telefono: '+573183334455',
    whatsapp: '+573183334455',
    telegram_user: 'daniela_art_bog',
  },
  {
    ID: 7,
    Nombre: 'Laura Soto',
    Email: 'laura.soto@lasrikas.com',
    Slug: 'laura-soto',
    Descripción: 'Travel creator y modelo de lifestyle. El mundo desde mi perspectiva: playas, atardeceres y momentos únicos. Actualmente en pausa por viaje personal. Pronto de vuelta con contenido exclusivo del Caribe.',
    Edad: 27,
    Nacionalidad: 'Colombiana',
    Estatura: 169,
    Peso: 58,
    Medidas: '93-64-96',
    Color_de_cabello: 'Negro',
    Estado_de_Disponibilidad: 'Inactiva',
    Imagen_principal: 'https://i.pravatar.cc/800?img=43',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=43',
      'https://i.pravatar.cc/800?img=47',
    ],
    video_url: null,
    Horario_Laboral: '10:00 - 20:00',
    Dias_de_Trabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    Ciudad_Base: 'Cartagena',
    Precio_Base: 8.99,
    is_verified: true,
    verified_at: '2025-04-01T11:00:00Z',
    plan_id: 2,
    featured_until: null,
    telefono: null,
    whatsapp: null,
    telegram_user: 'laura_soto_travel',
  },
  {
    ID: 8,
    Nombre: 'Andrea Torres',
    Email: 'andrea.torres@lasrikas.com',
    Slug: 'andrea-torres',
    Descripción: 'Instructora certificada de yoga Vinyasa y Zumba con 7 años de experiencia. Bienestar, energía positiva y equilibrio cuerpo-mente. Clases grupales en vivo todos los días. El plan premium incluye sesiones 1-a-1.',
    Edad: 29,
    Nacionalidad: 'Colombiana',
    Estatura: 166,
    Peso: 53,
    Medidas: '89-61-92',
    Color_de_cabello: 'Castaño rojizo',
    Estado_de_Disponibilidad: 'Disponible Ahora',
    Imagen_principal: 'https://i.pravatar.cc/800?img=42',
    Galeria_fotos: [
      'https://i.pravatar.cc/800?img=42',
      'https://i.pravatar.cc/800?img=44',
      'https://i.pravatar.cc/800?img=46',
      'https://i.pravatar.cc/800?img=48',
    ],
    video_url: null,
    Horario_Laboral: '06:00 - 20:00',
    Dias_de_Trabajo: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    Ciudad_Base: 'Pereira',
    Precio_Base: 12.99,
    is_verified: true,
    verified_at: '2024-09-12T08:00:00Z',
    plan_id: 3,
    featured_until: '2026-10-31T23:59:59Z',
    telefono: '+573016667788',
    whatsapp: '+573016667788',
    telegram_user: 'andrea_wellness_pei',
  },
]

export const DIAS_SEMANA = TODOS_LOS_DIAS

export const useModels = () => {
  const models = ref<Model[]>(MOCK_MODELS)
  const loading = ref(false)

  const filters = ref<FilterState>({
    search: '',
    ageMin: null,
    ageMax: null,
    Ciudad_Base: '',
    Estado_de_Disponibilidad: 'todas',
    sortBy: 'recientes',
  })

  const filteredModels = computed(() => {
    let result = [...models.value]

    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      result = result.filter(m =>
        m.Nombre.toLowerCase().includes(q)
        || m.Ciudad_Base.toLowerCase().includes(q)
        || m.Descripción.toLowerCase().includes(q),
      )
    }

    if (filters.value.ageMin !== null) {
      result = result.filter(m => m.Edad >= (filters.value.ageMin as number))
    }

    if (filters.value.ageMax !== null) {
      result = result.filter(m => m.Edad <= (filters.value.ageMax as number))
    }

    if (filters.value.Ciudad_Base) {
      result = result.filter(m =>
        m.Ciudad_Base.toLowerCase() === filters.value.Ciudad_Base.toLowerCase(),
      )
    }

    if (filters.value.Estado_de_Disponibilidad !== 'todas') {
      result = result.filter(m =>
        m.Estado_de_Disponibilidad === filters.value.Estado_de_Disponibilidad,
      )
    }

    switch (filters.value.sortBy) {
      case 'precio_asc':
        result.sort((a, b) => a.Precio_Base - b.Precio_Base)
        break
      case 'precio_desc':
        result.sort((a, b) => b.Precio_Base - a.Precio_Base)
        break
      case 'nombre':
        result.sort((a, b) => a.Nombre.localeCompare(b.Nombre, 'es'))
        break
      default:
        result.sort((a, b) => b.ID - a.ID)
    }

    return result
  })

  const disponiblesCount = computed(
    () => models.value.filter(m => m.Estado_de_Disponibilidad === 'Disponible Ahora').length,
  )

  const ciudades = computed(() =>
    [...new Set(models.value.map(m => m.Ciudad_Base))].sort((a, b) => a.localeCompare(b, 'es')),
  )

  const getBySlug = (slug: string): Model | undefined =>
    models.value.find(m => m.Slug === slug)

  const resetFilters = () => {
    filters.value = {
      search: '',
      ageMin: null,
      ageMax: null,
      Ciudad_Base: '',
      Estado_de_Disponibilidad: 'todas',
      sortBy: 'recientes',
    }
  }

  return {
    models,
    filters,
    filteredModels,
    disponiblesCount,
    ciudades,
    loading,
    getBySlug,
    resetFilters,
  }
}
