<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './components/Navigations.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ContactSection from './components/ContactSection.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'
import MessagesPage from './views/MessagesPage.vue'
import DashboardPage from './views/DashboardPage.vue'
import { MessageCircle } from 'lucide-vue-next'

const currentView = ref('landing')
const currentUser = ref(null)

onMounted(() => {
    // Check User
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    // Berhasil login Dashboard
    if (user && token) {
        currentUser.value = JSON.parse(user)
        currentView.value = 'dashboard'
    }
})

const showLogin = () => {
    currentView.value = 'login'
}

const showRegister = () => {
    currentView.value = 'register'
}

const handleLoginSuccess = () => {
    const user = localStorage.getItem('user')
    if (user) {
        currentUser.value = JSON.parse(user)
    }
    currentView.value = 'dashboard'
}

const handleRegisterSuccess = () => {
    currentView.value = 'login'
}

const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    currentUser.value = null
    currentView.value = 'landing'
}

const navigateToMessages = () => {
    currentView.value = 'messages'
}

const navigateToDashboard = () => {
    currentView.value = 'dashboard'
}

const navigateToLanding = () => {
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

<template>
    <div>
        <!-- Landing Page -->
        <div v-if="currentView === 'landing'" class="min-h-screen bg-gradient-to-br from-red-300 via-white to-blue-300">
            <Navigation @login="showLogin" @register="showRegister" />
            <HeroSection @go-to-login="showLogin" />
            <FeaturesSection />
            <ContactSection />
        </div>

        <!-- Login -->
        <LoginPage v-else-if="currentView === 'login'" @switch-to-register="showRegister"
            @login-success="handleLoginSuccess" @switch-to-landing="navigateToLanding" />

        <!-- Register  -->
        <RegisterPage v-else-if="currentView === 'register'" @switch-to-login="showLogin"
            @register-success="handleRegisterSuccess" @switch-to-landing="navigateToLanding" />

        <!-- Dashboard Page -->
        <DashboardPage v-else-if="currentView === 'dashboard'" :currentUser="currentUser" @logout="handleLogout"
            @navigate-to-messages="navigateToMessages" />

        <!-- Messages Page -->
        <MessagesPage v-else-if="currentView === 'messages'" @back-to-success="navigateToDashboard" />
    </div>
</template>
