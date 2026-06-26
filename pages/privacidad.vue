<script setup lang="ts">
useHead({
  title: 'Política de privacidad — lasrikas.com',
  meta: [{ name: 'description', content: 'Política de privacidad de lasrikas.com. Cómo recopilamos, usamos y protegemos tu información personal.' }],
})
</script>

<template>
  <div class="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-display font-bold text-white mb-2">Política de privacidad</h1>
    <p class="text-white/30 text-sm mb-10">Última actualización: 26 de junio de 2026</p>

    <div class="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">1. Información que recopilamos</h2>
        <p>Recopilamos la siguiente información cuando usas lasrikas.com:</p>
        <ul class="list-disc pl-5 space-y-2 mt-2">
          <li><strong class="text-white/90">Modelos registradas:</strong> email, nombre artístico, edad, ciudad, fotos e información de perfil que decidas publicar.</li>
          <li><strong class="text-white/90">Visitantes:</strong> datos de navegación anónimos (páginas vistas, tiempo en sitio) mediante cookies analíticas.</li>
          <li><strong class="text-white/90">Verificación de edad:</strong> guardamos una cookie local en tu dispositivo que indica que confirmaste tener 18+ años. No transmitimos este dato a servidores externos.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">2. Cómo usamos tu información</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Para mostrar tu perfil en el directorio público.</li>
          <li>Para gestionar tu cuenta y autenticación.</li>
          <li>Para comunicarnos contigo sobre tu cuenta o nuestros servicios.</li>
          <li>Para mejorar el funcionamiento del Sitio mediante análisis de uso.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">3. Almacenamiento de datos</h2>
        <p>Los datos se almacenan en servidores seguros provistos por <strong class="text-white/90">Supabase</strong> (infraestructura en la nube con cifrado en reposo y en tránsito). Las fotos se almacenan en el servicio de almacenamiento de Supabase con acceso público controlado por políticas de seguridad a nivel de fila (RLS).</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">4. Cookies</h2>
        <p>Usamos las siguientes cookies:</p>
        <ul class="list-disc pl-5 space-y-2 mt-2">
          <li><code class="text-brand-400 text-xs">lr_age_verified</code>: cookie de sesión de verificación de edad. Expira en 365 días.</li>
          <li><code class="text-brand-400 text-xs">sb-*</code>: cookies de sesión de Supabase Auth para modelos autenticadas.</li>
        </ul>
        <p class="mt-2">No usamos cookies de rastreo de terceros ni publicidad comportamental.</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">5. Compartición de datos</h2>
        <p>No vendemos, alquilamos ni compartimos tu información personal con terceros, salvo cuando sea requerido por ley o para operar los servicios técnicos del Sitio (hosting, autenticación).</p>
        <p class="mt-2"><strong class="text-white/90">Información pública de perfil:</strong> el nombre artístico, fotos, ciudad, disponibilidad y demás información que publicas en tu perfil de modelo es visible públicamente para todos los visitantes del Sitio.</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">6. Tus derechos</h2>
        <p>Puedes en cualquier momento:</p>
        <ul class="list-disc pl-5 space-y-2 mt-2">
          <li>Acceder a los datos de tu perfil desde tu panel de cuenta.</li>
          <li>Modificar o eliminar la información de tu perfil.</li>
          <li>Solicitar la eliminación completa de tu cuenta y datos enviando un correo a <a href="mailto:privacidad@lasrikas.com" class="text-brand-400 hover:text-brand-300">privacidad@lasrikas.com</a>.</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">7. Seguridad</h2>
        <p>Implementamos medidas técnicas y organizativas para proteger tu información, incluyendo cifrado TLS, políticas de seguridad a nivel de base de datos (RLS) y acceso restringido a datos sensibles. Sin embargo, ningún sistema es 100% seguro y no podemos garantizar seguridad absoluta.</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-white mb-3">8. Contacto</h2>
        <p>Para ejercer tus derechos o para cualquier consulta sobre privacidad, contáctanos en: <a href="mailto:privacidad@lasrikas.com" class="text-brand-400 hover:text-brand-300">privacidad@lasrikas.com</a></p>
      </section>
    </div>
  </div>
</template>
