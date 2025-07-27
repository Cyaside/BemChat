<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './components/Navigations.vue'
import HeroSection from './components/Herosection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ContactSection from './components/ContactSection.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'

const currentView = ref('landing')
const currentUser = ref(null)

onMounted(() => {
    // Check User
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (user && token) {
        currentUser.value = JSON.parse(user)
        currentView.value = 'success'
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
    currentView.value = 'success'
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

        <!-- Sukses -->
        <div v-else-if="currentView === 'success'"
            class="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center">
            <div class="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
                <div
                    class="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Login Berhasil!</h2>
                <p class="text-gray-600 mb-6">Selamat datang di BEM Chatting, {{ currentUser?.username }}!</p>
                <button @click="handleLogout"
                    class="bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-red-500 hover:to-blue-600 transition-all">
                    Logout
                </button>
            </div>
        </div>

    </div>
</template>
