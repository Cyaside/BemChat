<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MessageCircle, Menu } from 'lucide-vue-next'

defineEmits(['login', 'register'])

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!--Blur-->
  <nav :class="[
    'backdrop-blur-md shadow-lg sticky top-0 z-15 transition-colors duration-100',
    isScrolled ? 'bg-white/60' : 'bg-white/90'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- logo -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-red-400 to-blue-500 rounded-lg flex items-center justify-center">
            <MessageCircle class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
            BEM Chatting
          </span>
        </div>
        <!--Bagian Dekstop-->
        <!--  nav + auth -->
        <div class="hidden md:flex items-center space-x-8">
          <!-- nav links -->
          <a href="#home" class="text-gray-700 hover:text-red-500 transition-colors font-medium">Home</a>
          <a href="#features" class="text-gray-700 hover:text-red-500 transition-colors font-medium">Features</a>
          <a href="#contact" class="text-gray-700 hover:text-red-500 transition-colors font-medium">Contact</a>

          <!-- auth buttons -->
          <div class="flex space-x-4">
            <button @click="$emit('login')"
              class="bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-2 rounded-full hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105">
              Login
            </button>
            <button @click="$emit('register')"
              class="bg-white border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition-colors">
              Register
            </button>
          </div>
        </div>
        <!--Bagian Mobile-->
        <!-- menu toggle -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 hover:text-red-500">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- nav -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
        <div class="flex flex-col space-y-4">
          <a href="#home" class="text-gray-700 hover:text-red-500 transition-colors font-medium">Home</a>
          <a href="#features" class="text-gray-700 hover:text-red-500 transition-colors font-medium">Features</a>
          <a href="#contact" class="text-gray-700 hover:text-red-500 transition-colors font-medium">Contact</a>

          <!-- auth -->
          <button @click="$emit('login')"
            class="bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-2 rounded-full hover:from-red-500 hover:to-blue-600 transition-all w-fit">
            Login
          </button>
          <button @click="$emit('register')"
            class="bg-white border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition-colors w-fit">
            Register
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
