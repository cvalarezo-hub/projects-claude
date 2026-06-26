-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) + STORAGE
-- ═══════════════════════════════════════════════════════════════

-- 1. Habilitar RLS en la tabla modelos
ALTER TABLE public.modelos ENABLE ROW LEVEL SECURITY;

-- 2. Política: cualquier visitante puede VER perfiles
CREATE POLICY "modelos_public_select"
  ON public.modelos FOR SELECT
  USING (true);

-- 3. Política: una modelo solo puede EDITAR su propio perfil
CREATE POLICY "modelos_owner_update"
  ON public.modelos FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. Política: una modelo autenticada puede INSERT su propio perfil (registro)
CREATE POLICY "modelos_owner_insert"
  ON public.modelos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. Política: solo el service_role puede ELIMINAR (admin vía Supabase dashboard)
CREATE POLICY "modelos_service_delete"
  ON public.modelos FOR DELETE
  USING (auth.role() = 'service_role');

-- ─── Storage bucket para fotos de modelos ──────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('model-photos', 'model-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Política: cualquier usuario puede VER fotos (bucket público)
CREATE POLICY "photos_public_select"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'model-photos');

-- Política: modelo autenticada puede SUBIR sus propias fotos
CREATE POLICY "photos_owner_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'model-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política: modelo autenticada puede ELIMINAR sus propias fotos
CREATE POLICY "photos_owner_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'model-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
