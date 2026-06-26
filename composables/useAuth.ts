import type { Model } from '~/types'
import { modelToDb } from '~/composables/useSupabaseModels'

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    const { error: sbError } = await supabase.auth.signInWithPassword({ email, password })
    loading.value = false
    if (sbError) { error.value = sbError.message; return false }
    return true
  }

  const registerModelo = async (
    email: string,
    password: string,
    basicData: Pick<Model, 'Nombre' | 'Edad' | 'Ciudad_Base' | 'Slug'>,
  ) => {
    loading.value = true
    error.value = null

    const { data: authData, error: signUpError } = await supabase.auth
      .signUp({ email, password })

    if (signUpError || !authData.user) {
      error.value = signUpError?.message ?? 'Error en el registro'
      loading.value = false
      return false
    }

    // Si el email requiere confirmación, la sesión aún no existe.
    // Intentamos login inmediato para obtener sesión activa.
    if (!authData.session) {
      const { error: loginError } = await supabase.auth
        .signInWithPassword({ email, password })
      if (loginError) {
        error.value = 'Cuenta creada. Revisa tu correo para confirmar tu email antes de continuar.'
        loading.value = false
        return 'confirm-email'
      }
    }

    const { error: insertError } = await supabase
      .from('modelos')
      .insert({
        ...modelToDb(basicData),
        email,
        user_id: authData.user.id,
        estado_de_disponibilidad: 'Inactiva',
      })

    loading.value = false
    if (insertError) { error.value = insertError.message; return false }
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    await navigateTo('/')
  }

  const resetPassword = async (email: string) => {
    loading.value = true
    const { error: sbError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/cuenta/nueva-password`,
    })
    loading.value = false
    if (sbError) { error.value = sbError.message; return false }
    return true
  }

  return {
    user,
    isLoggedIn,
    loading,
    error,
    login,
    registerModelo,
    logout,
    resetPassword,
  }
}
