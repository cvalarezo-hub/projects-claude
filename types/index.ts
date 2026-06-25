export type EstadoDisponibilidad =
  | 'Disponible Ahora'
  | 'Ocupada'
  | 'De Viaje'
  | 'Inactiva'

export interface Model {
  ID: number
  Nombre: string
  Email: string
  Slug: string
  Descripción: string
  Edad: number
  Nacionalidad: string
  Estatura: number          // cm
  Peso: number              // kg
  Medidas: string           // "90-60-90"
  Color_de_cabello: string
  Estado_de_Disponibilidad: EstadoDisponibilidad
  Imagen_principal: string
  Galeria_fotos: string[]
  video_url?: string | null
  Horario_Laboral: string   // "10:00 - 22:00"
  Dias_de_Trabajo: string[]
  Ciudad_Base: string
  Precio_Base: number
  is_verified: boolean
  verified_at?: string | null
  plan_id?: number | null
  featured_until?: string | null
  // Campos de contacto — se activarán cuando el backend los soporte
  telefono?: string | null
  whatsapp?: string | null
  telegram_user?: string | null
}

export interface FilterState {
  search: string
  ageMin: number | null
  ageMax: number | null
  Ciudad_Base: string
  Estado_de_Disponibilidad: 'todas' | EstadoDisponibilidad
  sortBy: 'recientes' | 'precio_asc' | 'precio_desc' | 'nombre'
}

export type NavItem = {
  label: string
  to: string
  icon?: string
  badge?: string | number
}
