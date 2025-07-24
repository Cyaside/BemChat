<script setup>
import ContactInfo from './ContactInfo.vue'
import { MessageCircle } from 'lucide-vue-next'
</script>

<template>
    <section id="contact" class="py-20 bg-gradient-to-br from-red-50 to-blue-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Butuh Bantuan? <span class="text-red-500">Hubungi Kami!</span>
            </h2>
            <p class="text-xl text-gray-600 mb-12">
                Tim support (Mr. Kim) siap membantu kamu 24/7
            </p>

            <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <!-- Cp ama line -->
                    <div class="space-y-6">
                        <ContactInfo icon="user" label="Contact Person" value="Hakim"
                            bgColor="from-red-400 to-red-500" />
                        <ContactInfo icon="phone" label="LINE ID" value="kimnzh" bgColor="from-blue-400 to-blue-500" />
                    </div>

                    <!-- Gambar dan Teks buat bagian kanan -->
                    <div class="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-6">
                        <div class="flex items-center justify-center space-x-4 mb-4">
                            <!-- Mr Kim-->
                            <img src="/anomali.jpg" alt="Anomali" class="w-20 h-20 object-cover rounded-2xl shadow" />
                            <!-- Ikon chat -->
                            <div class="w-20 h-20 bg-gradient-to-r from-red-400 to-blue-500
                       rounded-full flex items-center justify-center">
                                <MessageCircle class="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <p class="text-gray-600 text-center">
                            jika ada pertanyaan atau butuh bantuan bisa langsung saja hubungi Mr. Kim
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
