<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../main'
import Header from '../layout/header/header.vue'
import Footer from '../layout/footer/footer.vue'
import QRCode from 'qrcode'

interface Ticket {
  id: string
  ticketId: string
  posterTitle: string
  posterDate: string
  posterTime: string
  posterAddress: string
  ticketCount: number
  totalPrice: number
  purchaseDate: { seconds: number; nanoseconds: number }
  status: 'pending' | 'confirmed' | 'cancelled'
  eventPhoto?: string
  userId: string
}

interface UserData {
  id: string
  name: string
  surname: string
  email: string
}

const route = useRoute()
const auth = getAuth()
const currentUser = ref<User | null>(null)
const ticket = ref<Ticket | null>(null)
const userData = ref<UserData | null>(null)
const isLoading = ref(true)
const qrCodeUrl = ref('')
const unsubscribeAuth = ref<() => void>()

const formatDate = (timestamp: { seconds: number, nanoseconds: number }) => {
  if (!timestamp?.seconds) return 'Дата не указана'
  const date = new Date(timestamp.seconds * 1000)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтвержден',
    cancelled: 'Отменен'
  }
  return statusMap[status] || status
}

const generateQRCode = async (text: string) => {
  try {
    return await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
  } catch (err) {
    console.error('Ошибка генерации QR-кода:', err)
    return ''
  }
}

const loadTicket = async (ticketId: string, userId: string) => {
  try {
    // Проверяем существование билета у пользователя
    const ticketRef = doc(db, 'users', userId, 'tickets', ticketId)
    const ticketSnap = await getDoc(ticketRef)

    if (!ticketSnap.exists()) {
      throw new Error('Билет не найден')
    }

    const ticketData = ticketSnap.data() as Ticket
    ticket.value = {
      id: ticketSnap.id,
      ...ticketData
    }

    // Генерируем QR-код
    qrCodeUrl.value = await generateQRCode(ticketData.ticketId)

    // Загружаем данные пользователя
    const userRef = doc(db, 'users', userId)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      userData.value = {
        id: userSnap.id,
        ...userSnap.data()
      } as UserData
    }
  } catch (error) {
    console.error('Ошибка загрузки билета:', error)
    ticket.value = null
  } finally {
    isLoading.value = false
  }
}

const downloadTicket = () => {
  // Здесь должна быть логика генерации PDF
  alert('Функция скачивания PDF будет реализована позже')
}

const sendToEmail = () => {
  // Здесь должна быть логика отправки на email
  alert('Функция отправки на email будет реализована позже')
}

onMounted(async () => {
  unsubscribeAuth.value = onAuthStateChanged(auth, async (user) => {
    currentUser.value = user
    if (user && route.params.id) {
      await loadTicket(route.params.id as string, user.uid)
    } else {
      isLoading.value = false
    }
  })
})

onUnmounted(() => {
  if (unsubscribeAuth.value) unsubscribeAuth.value()
})
</script>
<template>
  <Header />
  <main class="ticket-page">
    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="loading-state">
      <p>Загрузка данных билета...</p>
    </div>

    <!-- Билет не найден -->
    <div v-else-if="!ticket" class="not-found">
      <h2>Билет не найден</h2>
      <p>Запрошенный билет не существует или у вас нет к нему доступа</p>
      <router-link to="/profile">Вернуться в профиль</router-link>
    </div>

    <!-- Основное содержимое билета -->
    <div v-else class="ticket-container">
      <div class="ticket-header">
        <h1>Ваш билет</h1>
        <p class="ticket-id">№ {{ ticket.ticketId }}</p>
      </div>

      <div class="ticket-content">
        <!-- Левая часть - информация о событии -->
        <div class="event-info">
          <div class="event-image">
            <img src="../../../public/photo.jpg"
              @error="(e) => (e.target as HTMLImageElement).src = '/images/default-poster.jpg'">
          </div>

          <h2 class="event-title">{{ ticket.posterTitle }}</h2>

          <div class="event-details">
            <div class="detail-item">
              <!-- <img src="../../../public/poster/date.svg" alt="Дата"> -->
              <p>{{ ticket.posterDate }}, {{ ticket.posterTime }}</p>
            </div>

            <div class="detail-item">
              <!-- <img src="../../../public/poster/date.svg" alt="Место"> -->
              <p>{{ ticket.posterAddress }}</p>
            </div>
          </div>
        </div>

        <!-- Правая часть - QR-код и данные билета -->
        <div class="ticket-data">
          <div class="qr-code">
            <img :src="qrCodeUrl" alt="QR-код билета" v-if="qrCodeUrl">
            <div class="qr-placeholder" v-else>QR-код</div>
            <p class="ticket-status" :class="'status-' + ticket.status">
              {{ formatStatus(ticket.status) }}
            </p>
          </div>

          <div class="ticket-meta">
            <div class="meta-item">
              <h3>Количество билетов:</h3>
              <p>{{ ticket.ticketCount }}</p>
            </div>

            <div class="meta-item">
              <h3>Сумма:</h3>
              <p>{{ ticket.totalPrice }} ₽</p>
            </div>

            <div class="meta-item">
              <h3>Дата покупки:</h3>
              <p>{{ formatDate(ticket.purchaseDate) }}</p>
            </div>

            <div class="meta-item" v-if="userData">
              <h3>Владелец:</h3>
              <p>{{ userData.name }} {{ userData.surname }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ticket-actions">
        <button @click="downloadTicket" class="download-btn">
          Скачать билет (PDF)
        </button>
        <button @click="sendToEmail" class="email-btn">
          Отправить на email
        </button>
      </div>

      <div class="ticket-instructions">
        <h3>Как использовать билет:</h3>
        <ol>
          <li>Сохраните билет на устройство или распечатайте</li>
          <li>Придите на мероприятие заранее (рекомендуем за 30-40 минут)</li>
          <li>Покажите QR-код на входе</li>
        </ol>
      </div>
    </div>
  </main>
  <Footer />
</template>
<style scoped>
@import "./ticket.css";
</style>