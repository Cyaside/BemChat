<script setup>
import { computed } from 'vue'
import { User, Phone } from 'lucide-vue-next'

const props = defineProps({
    icon: String,
    label: String,
    value: String,
    bgColor: String
})

const iconComponent = computed(() => {
    const icons = {
        user: User,
        phone: Phone
    }
    return icons[props.icon] || User
})
</script>

<template>
    <div class="flex items-center space-x-4">
        <div :class="`w-12 h-12 bg-gradient-to-r ${bgColor} rounded-full flex items-center justify-center`">
            <component :is="iconComponent" class="w-6 h-6 text-white" />
        </div>
        <div class="text-left">
            <p class="text-sm text-gray-500 uppercase tracking-wide">{{ label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
        </div>
    </div>
</template>
