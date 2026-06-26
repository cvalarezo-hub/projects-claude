// Tipos que reflejan EXACTAMENTE la estructura de la tabla `modelos` en Supabase
// Columnas en snake_case (convención PostgreSQL) — se mapean a la interfaz Model en types/index.ts

export interface DbModelo {
  id: number
  nombre: string
  email: string
  slug: string
  descripcion: string | null
  edad: number
  nacionalidad: string
  estatura: number | null
  peso: number | null
  medidas: string | null
  color_de_cabello: string | null
  estado_de_disponibilidad: 'Disponible Ahora' | 'Ocupada' | 'De Viaje' | 'Inactiva'
  imagen_principal: string | null
  galeria_fotos: string[]
  video_url: string | null
  horario_laboral: string | null
  dias_de_trabajo: string[]
  ciudad_base: string | null
  precio_base: number
  is_verified: boolean
  verified_at: string | null
  plan_id: number | null
  featured_until: string | null
  telefono: string | null
  whatsapp: string | null
  telegram_user: string | null
  user_id: string | null
  created_at: string
  updated_at: string
}

export interface DbModeloInsert extends Omit<DbModelo, 'id' | 'created_at' | 'updated_at'> {}
export interface DbModeloUpdate extends Partial<DbModeloInsert> {}
