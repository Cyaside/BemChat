<script setup>
import { computed } from 'vue'
import { Zap, Users, Share2 } from 'lucide-vue-next'

const props = defineProps({
  title: String,
  description: String,
  gradient: String,
  iconBg: String,
  icon: String
})

const iconComponent = computed(() => {
  const icons = {
    zap: Zap,
    users: Users,
    share2: Share2
  }
  return icons[props.icon] || Zap
})
</script>

<template>
  <div
    :class="`bg-gradient-to-br ${gradient} p-8 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-2`">
    <div :class="`w-16 h-16 bg-gradient-to-r ${iconBg} rounded-2xl flex items-center justify-center mb-6`">
      <component :is="iconComponent" class="w-8 h-8 text-white" />
    </div>
    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ title }}</h3>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>
  </div>
</template>
