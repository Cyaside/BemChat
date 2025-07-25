<template>
    <div>
        <!-- Landing -->
        <div v-if="currentView === 'landing'" class="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
            <Navigation @login="showLogin" @register="showRegister" />
            <HeroSection />
            <FeaturesSection />
            <ContactSection />
        </div>

        <!-- Login -->
        <LoginPage v-else-if="currentView === 'login'" @switch-to-register="showRegister"
            @login-success="handleLoginSuccess" />

        <!-- Register  -->
        <RegisterPage v-else-if="currentView === 'register'" @switch-to-login="showLogin"
            @register-success="handleRegisterSuccess" />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './components/Navigations.vue'
import HeroSection from './components/Herosection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ContactSection from './components/ContactSection.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'

const currentView = ref('landing')

onMounted(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user && token) {
        currentView.value = 'messages'
    }
})

const showLogin = () => {
    currentView.value = 'login'
}

const showRegister = () => {
    currentView.value = 'register'
}

const handleLoginSuccess = () => {
    currentView.value = 'messages'
}

const handleRegisterSuccess = () => {
    currentView.value = 'login'
}

const handleLogout = () => {
    currentView.value = 'landing'
}
</script>

<style>
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
