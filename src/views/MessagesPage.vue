<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { ArrowLeft, Send, Users, MessageCircle, Edit2, Trash2 } from 'lucide-vue-next'

const emit = defineEmits(['back-to-success'])

// State
const currentUser = ref(null)
const users = ref([])
const selectedUser = ref(null)
const messages = ref([])
const newMessage = ref('')
const isLoading = ref(false)
const error = ref('')
const editingMessage = ref(null)
const editContent = ref('')

// Computed
const token = computed(() => localStorage.getItem('token'))
const apiHeaders = computed(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token.value}`
}))

// Lifecycle
onMounted(async () => {
    const user = localStorage.getItem('user')
    if (user) currentUser.value = JSON.parse(user)
    await loadUsers()
})

// Methods
const loadUsers = async () => {
    try {
        const response = await fetch('/api/messages/users', {
            headers: { 'Authorization': `Bearer ${token.value}` }
        })
        const data = await response.json()
        if (data.success) users.value = data.data
    } catch (error) {
        console.error('Error loading users:', error)
    }
}

const selectUser = async (user) => {
    selectedUser.value = user
    await loadMessages()
}

const loadMessages = async () => {
    if (!selectedUser.value) return

    try {
        const response = await fetch(`/api/messages/${selectedUser.value._id}`, {
            headers: { 'Authorization': `Bearer ${token.value}` }
        })
        const data = await response.json()
        if (data.success) {
            messages.value = data.data
            await nextTick()
            scrollToBottom()
        }
    } catch (error) {
        console.error('Error loading messages:', error)
    }
}

const sendMessage = async () => {
    if (!newMessage.value.trim() || !selectedUser.value || isLoading.value) return

    isLoading.value = true
    error.value = ''

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: apiHeaders.value,
            body: JSON.stringify({
                receiverId: selectedUser.value._id,
                content: newMessage.value.trim()
            })
        })

        const data = await response.json()
        if (data.success) {
            messages.value.push(data.data)
            newMessage.value = ''
            await nextTick()
            scrollToBottom()
        } else {
            error.value = data.message
        }
    } catch (err) {
        error.value = 'Gagal mengirim pesan'
    } finally {
        isLoading.value = false
    }
}

const startEdit = (message) => {
    editingMessage.value = message._id
    editContent.value = message.content
}

const cancelEdit = () => {
    editingMessage.value = null
    editContent.value = ''
}

const saveEdit = async (messageId) => {
    if (!editContent.value.trim()) return

    try {
        const response = await fetch(`/api/messages/${messageId}`, {
            method: 'PUT',
            headers: apiHeaders.value,
            body: JSON.stringify({ content: editContent.value.trim() })
        })

        const data = await response.json()
        if (data.success) {
            const messageIndex = messages.value.findIndex(m => m._id === messageId)
            if (messageIndex !== -1) {
                messages.value[messageIndex].content = editContent.value.trim()
                messages.value[messageIndex].updatedAt = new Date().toISOString()
            }
            cancelEdit()
        } else {
            error.value = data.message
        }
    } catch (err) {
        error.value = 'Gagal mengupdate pesan'
    }
}

const deleteMessage = async (messageId) => {
    if (!confirm('Yakin ingin menghapus pesan ini?')) return

    try {
        const response = await fetch(`/api/messages/${messageId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token.value}` }
        })

        const data = await response.json()
        if (data.success) {
            messages.value = messages.value.filter(m => m._id !== messageId)
        } else {
            error.value = data.message
        }
    } catch (err) {
        error.value = 'Gagal menghapus pesan'
    }
}

const scrollToBottom = () => {
    const container = document.getElementById('messages-container')
    if (container) container.scrollTop = container.scrollHeight
}

const formatTime = (date) => new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
})

const isEdited = (message) => {
    if (!message.updatedAt || !message.createdAt) return false
    const created = new Date(message.createdAt).getTime()
    const updated = new Date(message.updatedAt).getTime()
    return Math.abs(updated - created) > 1000
}

const isOwnMessage = (message) => message.senderId === currentUser.value?.id

const getMessageClasses = (message) => [
    'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative group',
    isOwnMessage(message)
        ? 'bg-gradient-to-r from-red-400 to-blue-500 text-white'
        : 'bg-gray-100 text-gray-900'
]

const getTimeClasses = (message) => [
    'text-xs mt-1',
    isOwnMessage(message) ? 'text-white/70' : 'text-gray-500'
]
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-300 via-white to-blue-300">
        <!-- Header -->
        <header class="bg-white/90 backdrop-blur-md shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-4">
                        <button @click="$emit('back-to-success')"
                            class="text-gray-600 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all">
                            <ArrowLeft class="w-5 h-5" />
                        </button>
                        <div class="flex items-center space-x-2">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-red-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <MessageCircle class="w-5 h-5 text-white" />
                            </div>
                            <span
                                class="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                                BEM Messages
                            </span>
                        </div>
                    </div>
                    <span class="text-gray-600">{{ currentUser?.username }}</span>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">

                <!-- List user -->
                <aside class="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="p-4 bg-gradient-to-r from-red-400 to-blue-500 text-white">
                        <div class="flex items-center space-x-2">
                            <Users class="w-5 h-5" />
                            <h3 class="font-semibold">Kontak</h3>
                        </div>
                    </div>

                    <div class="overflow-y-auto h-full">
                        <div v-if="users.length === 0" class="p-4 text-center text-gray-500">
                            Tidak ada kontak
                        </div>

                        <button v-for="user in users" :key="user._id" @click="selectUser(user)" :class="[
                            'w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-all text-left',
                            selectedUser?._id === user._id ? 'bg-red-50 border-l-4 border-l-red-400' : ''
                        ]">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-gradient-to-r from-red-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {{ user.username.charAt(0).toUpperCase() }}
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">{{ user.username }}</p>
                                    <p class="text-sm text-gray-500">
                                        Member sejak {{ new Date(user.createdAt).toLocaleDateString('id-ID') }}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                </aside>

                <!-- Chat Area -->
                <section class="lg:col-span-3 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

                    <!--Kosong -->
                    <div v-if="!selectedUser" class="flex-1 flex items-center justify-center">
                        <div class="text-center">
                            <MessageCircle class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p class="text-gray-500 text-lg">Pilih kontak untuk mulai chat</p>
                        </div>
                    </div>

                    <!-- UI Chat -->
                    <div v-else class="flex flex-col h-full">

                        <!-- Chat Header -->
                        <header class="p-4 bg-gradient-to-r from-red-400 to-blue-500 text-white">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-semibold">
                                    {{ selectedUser.username.charAt(0).toUpperCase() }}
                                </div>
                                <div>
                                    <h3 class="font-semibold">{{ selectedUser.username }}</h3>
                                    <p class="text-sm opacity-90">Online</p>
                                </div>
                            </div>
                        </header>

                        <!-- Messages Kontainer -->
                        <div id="messages-container" class="flex-1 overflow-y-auto p-4 space-y-4">
                            <div v-if="messages.length === 0" class="text-center text-gray-500 py-8">
                                Belum ada pesan. Mulai percakapan!
                            </div>

                            <!-- Message Bubbles -->
                            <div v-for="message in messages" :key="message._id"
                                :class="['flex', isOwnMessage(message) ? 'justify-end' : 'justify-start']">

                                <div :class="getMessageClasses(message)">

                                    <!-- Edit -->
                                    <div v-if="editingMessage === message._id" class="space-y-2">
                                        <textarea v-model="editContent"
                                            class="w-full p-2 border rounded-lg resize-none text-gray-900" rows="2" />
                                        <div class="flex space-x-2">
                                            <button @click="saveEdit(message._id)"
                                                class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                                                Simpan
                                            </button>
                                            <button @click="cancelEdit"
                                                class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                                                Batal
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Normal Mode -->
                                    <div v-else>
                                        <p class="break-words">{{ message.content }}</p>
                                        <p :class="getTimeClasses(message)">
                                            {{ formatTime(message.createdAt) }}
                                            <span v-if="isEdited(message)" class="ml-1">(edited)</span>
                                        </p>

                                        <!-- Edit dan Buang-->
                                        <div v-if="isOwnMessage(message)"
                                            class="absolute -top-8 right-0 bg-white rounded-lg shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                                            <button @click="startEdit(message)"
                                                class="p-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded">
                                                <Edit2 class="w-4 h-4" />
                                            </button>
                                            <button @click="deleteMessage(message._id)"
                                                class="p-1 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded">
                                                <Trash2 class="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Message Input -->
                        <footer class="p-4 border-t border-gray-200">
                            <div v-if="error" class="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                                <p class="text-red-600 text-sm">{{ error }}</p>
                            </div>

                            <div class="flex space-x-3">
                                <input v-model="newMessage" @keyup.enter="sendMessage" type="text"
                                    placeholder="Ketik pesan..."
                                    class="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
                                    :disabled="isLoading" />
                                <button @click="sendMessage" :disabled="isLoading || !newMessage.trim()"
                                    class="bg-gradient-to-r from-red-400 to-blue-500 text-white p-3 rounded-full hover:from-red-500 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Send class="w-5 h-5" />
                                </button>
                            </div>
                        </footer>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>
