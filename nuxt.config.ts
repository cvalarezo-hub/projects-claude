export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],

  supabase: {
    url: process.env.SUPABASE_URL || 'https://bzrffsduulvzsksnoepa.supabase.co',
    key: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cmZmc2R1dWx2enNrc25vZXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODg5OTUsImV4cCI6MjA5ODA2NDk5NX0.a_cch6wmEpHOudbVDbImcEuFK-WAfVr8P2Qfn-6jYFc',
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      // Páginas públicas que NO redirigen a login
      exclude: [
        '/',
        '/modelos',
        '/modelos/**',
        '/modelo/**',
        '/agencias',
        '/agencias/**',
        '/terminos',
        '/privacidad',
        '/cookies',
        '/como-funciona',
        '/auth/registro',
      ],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'es', class: 'dark' },
      title: 'Las Rikas — Plataforma Premium de Modelos',
      meta: [
        { name: 'description', content: 'Descubre modelos independientes y agencias premium en Las Rikas, la plataforma en vivo más exclusiva.' },
        { name: 'theme-color', content: '#0a0a0f' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Las Rikas' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap',
        },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  nitro: {
    preset: 'node-server',
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://lasrikas.com',
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_ANON_KEY || '',
    },
  },
})
