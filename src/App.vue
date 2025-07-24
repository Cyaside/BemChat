<template>
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
        <HeroSection />
        <ContactSection />
    </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<style>
/* Global styles */
html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}
</style>
