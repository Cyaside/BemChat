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

.delay-500 {
    animation-delay: 0.5s;
}

.delay-1000 {
    animation-delay: 1s;
}
</style>

<template>
    <section id="home"
        class="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="text-center">

                <!-- Bulat-->
                <div class="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full opacity-60 animate-pulse"></div>
                <div
                    class="absolute top-40 right-20 w-16 h-16 bg-blue-100 rounded-full opacity-60 animate-pulse delay-1000">
                </div>
                <div
                    class="absolute bottom-20 left-1/4 w-12 h-12 bg-red-200 rounded-full opacity-60 animate-pulse delay-500">
                </div>
                <div
                    class="absolute bottom-32 left-1/3 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-pulse delay-500">
                </div>
                <div
                    class="absolute top-10 right-1/3 w-10 h-10 bg-red-100 rounded-full opacity-50 animate-pulse delay-1000">
                </div>
                <div
                    class="absolute bottom-10 right-1/4 w-14 h-14 bg-blue-100 rounded-full opacity-60 animate-pulse delay-700">
                </div>
                <div
                    class="absolute top-1/2 left-12 w-16 h-16 bg-red-200 rounded-full opacity-40 animate-pulse delay-300">
                </div>
                <div
                    class="absolute top-3/4 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-pulse delay-1000">
                </div>

                <!-- Isi -->
                <div class="relative z-10">
                    <h1 class="text-5xl md:text-7xl font-bold mb-6">
                        <span
                            class="bg-gradient-to-r from-red-500 via-blue-500 to-red-400 bg-clip-text text-transparent">
                            BEM Chatting
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                        adalah tempat ngobrol khusus buat anak-anak BEM — biar koordinasi kegiatan, rapat divisi, atau
                        sekadar
                        diskusi jadi makin lancar dan seru. ✌️
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            class="bg-gradient-to-r from-red-400 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg">
                            Mulai Ngobrol Sekarang
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
