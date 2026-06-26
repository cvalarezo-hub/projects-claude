-- ═══════════════════════════════════════════════════════════════
-- TABLA: modelos
-- Ejecutar en: Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.modelos (
  id                       BIGSERIAL PRIMARY KEY,
  nombre                   TEXT NOT NULL,
  email                    TEXT UNIQUE NOT NULL,
  slug                     TEXT UNIQUE NOT NULL,
  descripcion              TEXT,
  edad                     SMALLINT NOT NULL CHECK (edad >= 18),
  nacionalidad             TEXT NOT NULL DEFAULT 'Colombiana',
  estatura                 SMALLINT,
  peso                     SMALLINT,
  medidas                  TEXT,
  color_de_cabello         TEXT,
  estado_de_disponibilidad TEXT NOT NULL DEFAULT 'Inactiva'
    CHECK (estado_de_disponibilidad IN ('Disponible Ahora','Ocupada','De Viaje','Inactiva')),
  imagen_principal         TEXT,
  galeria_fotos            TEXT[]   NOT NULL DEFAULT '{}',
  video_url                TEXT,
  horario_laboral          TEXT     DEFAULT '09:00 - 21:00',
  dias_de_trabajo          TEXT[]   NOT NULL DEFAULT '{}',
  ciudad_base              TEXT,
  precio_base              NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_verified              BOOLEAN  NOT NULL DEFAULT false,
  verified_at              TIMESTAMPTZ,
  plan_id                  SMALLINT CHECK (plan_id IN (1, 2, 3)),
  featured_until           TIMESTAMPTZ,
  telefono                 TEXT,
  whatsapp                 TEXT,
  telegram_user            TEXT,
  -- Vínculo con Supabase Auth
  user_id                  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_modelos_slug       ON public.modelos (slug);
CREATE INDEX IF NOT EXISTS idx_modelos_ciudad     ON public.modelos (ciudad_base);
CREATE INDEX IF NOT EXISTS idx_modelos_estado     ON public.modelos (estado_de_disponibilidad);
CREATE INDEX IF NOT EXISTS idx_modelos_user_id    ON public.modelos (user_id);
CREATE INDEX IF NOT EXISTS idx_modelos_featured   ON public.modelos (featured_until) WHERE featured_until IS NOT NULL;

-- Trigger: actualiza updated_at automáticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_modelos_updated_at
  BEFORE UPDATE ON public.modelos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Función: genera slug desde nombre (Ej: "Valentina Ríos" → "valentina-rios")
CREATE OR REPLACE FUNCTION public.generate_slug(input TEXT)
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  result TEXT;
BEGIN
  result := lower(input);
  result := translate(result, 'áéíóúüñàèìòùâêîôûäëïöü', 'aeiouunaeioua eiouaeioу');
  result := regexp_replace(result, '[^a-z0-9\s-]', '', 'g');
  result := regexp_replace(result, '\s+', '-', 'g');
  result := regexp_replace(result, '-+', '-', 'g');
  result := trim(both '-' from result);
  RETURN result;
END;
$$;
