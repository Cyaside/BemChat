<script setup>
import { ref } from 'vue'
import { MessageCircle, Eye, EyeOff, ArrowLeft } from 'lucide-vue-next'

const emit = defineEmits(['switch-to-login', 'register-success', 'switch-to-landing'])

const registerForm = ref({
    username: '',
    password: '',
    confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

const handleRegister = async () => {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
        error.value = 'Password tidak cocok'
        return
    }

    isLoading.value = true
    error.value = ''

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: registerForm.value.username,
                password: registerForm.value.password
            })
        })

        const data = await response.json()

        if (response.ok) {
            emit('register-success')
        } else {
            error.value = data.message || 'Registrasi failed'
        }
    } catch (err) {
        error.value = 'Telah terjadi kesalahan, silahkan coba lagi.'
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
@keyframes pulse {

    0%,
    100% {
        opacity: 0.4;
    }

    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.delay-1000 {
    animation-delay: 1s;
}
</style>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div class="max-w-md w-full">
            <!-- Bulet -->
            <div class="absolute top-20 right-10 w-16 h-16 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
            <div
                class="absolute bottom-20 left-10 w-20 h-20 bg-red-100 rounded-full opacity-60 animate-pulse delay-200">
            </div>

            <div class="bg-white rounded-3xl shadow-2xl p-8 relative z-10">
                <!-- Back Button -->
                <button @click="emit('switch-to-landing')"
                    class="absolute top-4 left-4 text-gray-600 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all">
                    <ArrowLeft class="w-5 h-5" />
                </button>

                <!-- Logo -->
                <div class="text-center mb-8">
                    <div
                        class="w-16 h-16 bg-gradient-to-r from-red-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageCircle class="w-8 h-8 text-white" />
                    </div>
                    <h1
                        class="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                        BEM Chatting
                    </h1>
                    <p class="text-gray-600 mt-2">Buat akun baru</p>
                </div>

                <!-- Form Register -->
                <form @submit.prevent="handleRegister" class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input id="username" v-model="registerForm.username" type="text" required
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                            placeholder="Pilih username" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div class="relative">
                            <input id="password" v-model="registerForm.password"
                                :type="showPassword ? 'text' : 'password'" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all pr-12"
                                placeholder="Buat password" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <Eye v-if="!showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi
                            Password</label>
                        <div class="relative">
                            <input id="confirmPassword" v-model="registerForm.confirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'" required
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all pr-12"
                                placeholder="Konfirmasi password" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-gradient-to-r from-red-400 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isLoading">Mendaftar...</span>
                        <span v-else>Daftar</span>
                    </button>
                </form>

                <!-- Pesan Error -->
                <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p class="text-red-600 text-sm">{{ error }}</p>
                </div>

                <!-- Login Link -->
                <div class="mt-6 text-center">
                    <p class="text-gray-600">
                        Sudah punya akun?
                        <button @click="$emit('switch-to-login')" class="text-red-500 hover:text-red-600 font-semibold">
                            Masuk sekarang
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
