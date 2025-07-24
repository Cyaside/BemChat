<script setup>
import FeatureCard from './FeatureCard.vue'

const features = [
  {
    id: 1,
    title: 'Instan & Cepat',
    description: 'Pesan terkirim dalam hitungan detik! Koordinasi rapat mendadak atau diskusi urgent jadi lebih efisien tanpa delay apapun.',
    gradient: 'from-red-50 to-red-100',
    iconBg: 'from-red-400 to-red-500',
    icon: 'zap'
  },
  {
    id: 2,
    title: 'Terkoneksi Antar Teman',
    description: 'Hubungkan seluruh anggota BEM dalam satu platform. Dari ketua, deputi hingga staff divisi, semua bisa berkomunikasi dan terkoneksi dengan mudah',
    gradient: 'from-blue-50 to-blue-100',
    iconBg: 'from-blue-400 to-blue-500',
    icon: 'users'
  },
  {
    id: 3,
    title: 'Sharing KJ & Tugas Seru',
    description: 'Berbagi kunji jawaban kuis, tugas, atau bahkan ujian (Bruh) jadi lebih gampang! Fitur sharing yang bisa bikin naik nilai',
    gradient: 'from-red-50 to-blue-50',
    iconBg: 'from-red-400 to-blue-500',
    icon: 'share2'
  }
]
</script>

<template>
  <section id="features" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">

          Kenapa Pilih <span class="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">BEM </span>
          <span class="text-blue-500">Chatting</span>?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Platform komunikasi yang dirancang khusus untuk kebutuhan anak-anak BEM
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <FeatureCard v-for="feature in features" :key="feature.id" :icon="feature.icon" :title="feature.title"
          :description="feature.description" :gradient="feature.gradient" :iconBg="feature.iconBg" />
      </div>
    </div>
  </section>
</template>
