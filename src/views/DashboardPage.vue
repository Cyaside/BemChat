<script setup>
import { MessageCircle, User } from 'lucide-vue-next'

const props = defineProps({
    currentUser: Object
})

const emit = defineEmits(['logout', 'navigate-to-messages'])
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-200 via-white to-blue-200">

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
                        <button @click="emit('logout')"
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
                    Kamu berhasil login ke BEM Chatting. Apakah kamu sudah Siap untuk mulai mengobrol?
                </p>
            </div>


            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <!-- Mulai Chat -->
                <div
                    class="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all transform hover:-translate-y-2">
                    <div class="w-20 h-20 bg-gradient-to-r from-red-400 to-blue-500
                rounded-full flex items-center justify-center mb-4">
                        <MessageCircle class="w-10 h-10 text-white" />
                    </div>

                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Mulai Chat</h3>
                    <p class="text-gray-600 mb-6">
                        Langsung terhubung dengan teman-teman dan sesama anggota BEM untuk koordinasi kegiatan
                        atau ngobrol santai.
                    </p>
                    <button @click="emit('navigate-to-messages')"
                        class="w-full bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105 font-semibold">
                        Buka Messages
                    </button>
                </div>


                <!-- Bagian Profile -->
                <div
                    class="bg-white rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all transform hover:-translate-y-2">
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
</template>
