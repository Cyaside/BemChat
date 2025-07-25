<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MessageCircle, Menu, X } from 'lucide-vue-next'

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

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.mobile-menu-enter {
  animation: slideDown 0.3s ease-out;
}

.nav-link {
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 50%;
  background: linear-gradient(to right, #ef4444, #3b82f6);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.logo-container {
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.auth-button {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.auth-button:hover {
  transform: translateY(-2px);
}

.mobile-menu-toggle {
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  transform: rotate(90deg);
}
</style>

<template>
  <nav :class="[
    'backdrop-blur-md shadow-lg sticky top-0 z-20 transition-all duration-300',
    isScrolled ? 'bg-white/80 shadow-xl' : 'bg-white/90'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="logo-container flex items-center space-x-2 cursor-pointer" @click="scrollToSection('home')">
          <div
            class="w-8 h-8 bg-gradient-to-r from-red-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-red-500 hover:to-blue-600 transition-all duration-300">
            <MessageCircle class="w-5 h-5 text-white" />
          </div>
          <span
            class="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent hover:from-red-600 hover:to-blue-700 transition-all duration-300">
            BEM Chatting
          </span>
        </div>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center space-x-8">

          <!-- Nav Link -->
          <button @click="scrollToSection('home')"
            class="nav-link text-gray-700 hover:text-red-500 font-medium">Home</button>
          <button @click="scrollToSection('features')"
            class="nav-link text-gray-700 hover:text-red-500 font-medium">Features</button>
          <button @click="scrollToSection('contact')"
            class="nav-link text-gray-700 hover:text-red-500 font-medium">Contact</button>

          <!-- Auth -->
          <div class="flex space-x-4">
            <button @click="$emit('login')"
              class="auth-button bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-2 rounded-full hover:from-red-500 hover:to-blue-600 hover:shadow-lg">
              Login
            </button>
            <button @click="$emit('register')"
              class="auth-button bg-white border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 hover:border-red-600 hover:shadow-lg">
              Register
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="mobile-menu-toggle text-gray-700 hover:text-red-500 p-2">
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!--  Nav -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 mobile-menu-enter">
        <div class="flex flex-col space-y-4">
          <button @click="scrollToSection('home')"
            class="text-gray-700 hover:text-red-500 font-medium text-left py-2 hover:bg-red-50 px-2 rounded transition-all duration-200">Home</button>
          <button @click="scrollToSection('features')"
            class="text-gray-700 hover:text-red-500 font-medium text-left py-2 hover:bg-red-50 px-2 rounded transition-all duration-200">Features</button>
          <button @click="scrollToSection('contact')"
            class="text-gray-700 hover:text-red-500 font-medium text-left py-2 hover:bg-red-50 px-2 rounded transition-all duration-200">Contact</button>

          <!-- Auth  -->
          <div class="pt-4 space-y-3">
            <button @click="$emit('login')"
              class="w-full bg-gradient-to-r from-red-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-red-500 hover:to-blue-600 transition-all">
              Login
            </button>
            <button @click="$emit('register')"
              class="w-full bg-white border border-red-500 text-red-500 px-6 py-3 rounded-full hover:bg-red-50 transition-all">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
