<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './components/Navigations.vue'
import HeroSection from './components/Herosection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ContactSection from './components/ContactSection.vue'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue'
import { MessageCircle, User } from 'lucide-vue-next'

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
        <!-- Landing Page -->
        <div v-if="currentView === 'landing'" class="min-h-screen bg-gradient-to-br from-red-300 via-white to-blue-300">
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

        <!-- Success Page ke Dashboard -->
        <div v-else-if="currentView === 'success'"
            class="min-h-screen bg-gradient-to-br from-red-300 via-white to-blue-300">

            <!-- Header -->
            <div class="bg-white/90 backdrop-blur-md shadow-lg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Section kiri -->
                        <div class="flex items-center space-x-2">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-red-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <MessageCircle class="w-5 h-5 text-white" />
                            </div>
                            <span
                                class="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                                BEM Chatting
                            </span>
                        </div>

                        <!-- Section kanan -->
                        <div class="flex items-center space-x-4">
                            <span class="text-gray-600">{{ currentUser?.username }}</span>
                            <button @click="handleLogout"
                                class="text-gray-600 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!--Konten -->
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <!-- Selamat datang -->
                <div class="text-center mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">
                        Selamat Datang, {{ currentUser?.username }}! 👋
                    </h1>
                    <p class="text-xl text-gray-600 mb-8">
                        Kamu berhasil masuk ke BEM Chatting. Siap untuk mulai ngobrol dengan teman-teman BEM?
                    </p>
                </div>


                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <!-- Mulai Chat -->
                    <div
                        class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        <div class="w-20 h-20 bg-gradient-to-r from-red-400 to-blue-500
       rounded-full flex items-center justify-center">
                            <MessageCircle class="w-10 h-10 text-white" />
                        </div>

                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Mulai Chat</h3>
                        <p class="text-gray-600 mb-6">
                            Langsung terhubung dengan teman-teman dan sesama anggota BEM untuk koordinasi kegiatan
                            atau ngobrol santai.
                        </p>
                        <button @click="currentView = 'messages'"
                            class="w-full bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105 font-semibold">
                            Buka Messages
                        </button>
                    </div>


                    <!-- Bagian Profile -->
                    <div class="bg-white rounded-2xl shadow-xl p-8">
                        <!-- Icon Profile -->
                        <div
                            class="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-400 to-blue-500 rounded-full mb-4">
                            <User class="w-10 h-10 text-white" />
                        </div>

                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Profile Kamu</h3>

                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Username:</span>
                                <span class="font-semibold text-gray-900">{{ currentUser?.username }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Member sejak:</span>
                                <span class="font-semibold text-gray-900">
                                    {{ new Date(currentUser?.createdAt).toLocaleDateString('id-ID') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Messages Page -->
        <MessagesPage v-else-if="currentView === 'messages'" @back-to-success="currentView = 'success'" />
    </div>
</template>
