export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://lasrikas.com',
    },
  },
})
