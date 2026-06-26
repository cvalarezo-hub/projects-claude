import type { Model, FilterState, EstadoDisponibilidad } from '~/types'
import type { DbModelo } from '~/types/database'

// Convierte una fila de la BD (snake_case) a la interfaz Model (Spanish fields)
function dbToModel(row: DbModelo): Model {
  return {
    ID:                       row.id,
    Nombre:                   row.nombre,
    Email:                    row.email,
    Slug:                     row.slug,
    Descripción:              row.descripcion ?? '',
    Edad:                     row.edad,
    Nacionalidad:             row.nacionalidad,
    Estatura:                 row.estatura ?? 0,
    Peso:                     row.peso ?? 0,
    Medidas:                  row.medidas ?? '',
    Color_de_cabello:         row.color_de_cabello ?? '',
    Estado_de_Disponibilidad: row.estado_de_disponibilidad as EstadoDisponibilidad,
    Imagen_principal:         row.imagen_principal ?? '',
    Galeria_fotos:            row.galeria_fotos ?? [],
    video_url:                row.video_url,
    Horario_Laboral:          row.horario_laboral ?? '09:00 - 21:00',
    Dias_de_Trabajo:          row.dias_de_trabajo ?? [],
    Ciudad_Base:              row.ciudad_base ?? '',
    Precio_Base:              row.precio_base,
    is_verified:              row.is_verified,
    verified_at:              row.verified_at,
    plan_id:                  row.plan_id,
    featured_until:           row.featured_until,
    telefono:                 row.telefono,
    whatsapp:                 row.whatsapp,
    telegram_user:            row.telegram_user,
  }
}

// Convierte la interfaz Model a columnas de la BD para INSERT/UPDATE
export function modelToDb(model: Partial<Model>): Partial<DbModelo> {
  const db: Partial<DbModelo> = {}
  if (model.Nombre              !== undefined) db.nombre                   = model.Nombre
  if (model.Email               !== undefined) db.email                    = model.Email
  if (model.Slug                !== undefined) db.slug                     = model.Slug
  if (model.Descripción         !== undefined) db.descripcion              = model.Descripción
  if (model.Edad                !== undefined) db.edad                     = model.Edad
  if (model.Nacionalidad        !== undefined) db.nacionalidad             = model.Nacionalidad
  if (model.Estatura            !== undefined) db.estatura                 = model.Estatura
  if (model.Peso                !== undefined) db.peso                     = model.Peso
  if (model.Medidas             !== undefined) db.medidas                  = model.Medidas
  if (model.Color_de_cabello    !== undefined) db.color_de_cabello         = model.Color_de_cabello
  if (model.Estado_de_Disponibilidad !== undefined) db.estado_de_disponibilidad = model.Estado_de_Disponibilidad
  if (model.Imagen_principal    !== undefined) db.imagen_principal         = model.Imagen_principal
  if (model.Galeria_fotos       !== undefined) db.galeria_fotos            = model.Galeria_fotos
  if (model.video_url           !== undefined) db.video_url                = model.video_url
  if (model.Horario_Laboral     !== undefined) db.horario_laboral          = model.Horario_Laboral
  if (model.Dias_de_Trabajo     !== undefined) db.dias_de_trabajo          = model.Dias_de_Trabajo
  if (model.Ciudad_Base         !== undefined) db.ciudad_base              = model.Ciudad_Base
  if (model.Precio_Base         !== undefined) db.precio_base              = model.Precio_Base
  if (model.telefono            !== undefined) db.telefono                 = model.telefono
  if (model.whatsapp            !== undefined) db.whatsapp                 = model.whatsapp
  if (model.telegram_user       !== undefined) db.telegram_user            = model.telegram_user
  return db
}

export const useSupabaseModels = () => {
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAll = async (filters?: Partial<FilterState>): Promise<Model[]> => {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('modelos')
        .select('*')
        .order('featured_until', { ascending: false, nullsFirst: false })
        .order('id', { ascending: false })

      if (filters?.search) {
        query = query.or(`nombre.ilike.%${filters.search}%,ciudad_base.ilike.%${filters.search}%`)
      }
      if (filters?.Ciudad_Base) {
        query = query.eq('ciudad_base', filters.Ciudad_Base)
      }
      if (filters?.Estado_de_Disponibilidad && filters.Estado_de_Disponibilidad !== 'todas') {
        query = query.eq('estado_de_disponibilidad', filters.Estado_de_Disponibilidad)
      }
      if (filters?.ageMin !== null && filters?.ageMin !== undefined) {
        query = query.gte('edad', filters.ageMin)
      }
      if (filters?.ageMax !== null && filters?.ageMax !== undefined) {
        query = query.lte('edad', filters.ageMax)
      }

      const { data, error: sbError } = await query
      if (sbError) throw sbError
      return (data as DbModelo[]).map(dbToModel)
    }
    catch (e) {
      error.value = 'Error al cargar modelos'
      console.error(e)
      return []
    }
    finally {
      loading.value = false
    }
  }

  const fetchBySlug = async (slug: string): Promise<Model | null> => {
    const { data, error: sbError } = await supabase
      .from('modelos')
      .select('*')
      .eq('slug', slug)
      .single()

    if (sbError || !data) return null
    return dbToModel(data as DbModelo)
  }

  const fetchByUserId = async (userId: string): Promise<Model | null> => {
    const { data, error: sbError } = await supabase
      .from('modelos')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (sbError || !data) return null
    return dbToModel(data as DbModelo)
  }

  const updatePerfil = async (id: number, updates: Partial<Model>): Promise<boolean> => {
    loading.value = true
    const { error: sbError } = await supabase
      .from('modelos')
      .update(modelToDb(updates))
      .eq('id', id)
    loading.value = false
    if (sbError) { error.value = sbError.message; return false }
    return true
  }

  const uploadPhoto = async (userId: string, file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop()
    const path = `${userId}/${Date.now()}.${ext}`
    const { error: sbError } = await supabase.storage
      .from('model-photos')
      .upload(path, file, { upsert: true })
    if (sbError) { error.value = sbError.message; return null }
    const { data } = supabase.storage.from('model-photos').getPublicUrl(path)
    return data.publicUrl
  }

  const deletePhoto = async (url: string): Promise<boolean> => {
    const path = url.split('/model-photos/')[1]
    if (!path) return false
    const { error: sbError } = await supabase.storage
      .from('model-photos')
      .remove([path])
    return !sbError
  }

  return {
    loading,
    error,
    fetchAll,
    fetchBySlug,
    fetchByUserId,
    updatePerfil,
    uploadPhoto,
    deletePhoto,
  }
}
