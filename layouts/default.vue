<script setup lang="ts">
// Dark mode class is already set in nuxt.config.ts via htmlAttrs
</script>

<template>
  <div class="flex flex-col min-h-screen bg-dark-900 text-white">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
