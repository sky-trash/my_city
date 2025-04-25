<script setup lang="ts">
defineOptions({
  name: 'UserProfile'
})

import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';
import { collection, doc, onSnapshot, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../main";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

interface UserData {
  id: string;
  userId: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  role?: string;
}

interface Purchase {
  id: string;
  userId: string;
  posterId: string;
  posterTitle: string;
  posterDate: string;
  posterTime: string;
  posterAddress: string;
  posterPrice: number;
  ticketCount: number;
  totalPrice: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  purchaseDate: { seconds: number; nanoseconds: number };
  status: 'pending' | 'confirmed' | 'cancelled';
  ticketId: string;
  eventPhoto?: string;
}

const auth = getAuth();
const currentUser = ref<User | null>(null);
const userData = ref<UserData | null>(null);
const userTickets = ref<Purchase[]>([]);
const authReady = ref(false);
const isLoading = ref(false);
const isLoadingTickets = ref(false);
const unsubscribeSnapshot = ref<() => void>();
const unsubscribeAuth = ref<() => void>();

// Отслеживаем состояние авторизации
onMounted(() => {
  unsubscribeAuth.value = onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    authReady.value = true;

    if (user) {
      await loadUserData(user.uid);
      await loadUserTickets(user.uid);
    } else {
      userData.value = null;
      userTickets.value = [];
    }
  });
});

// Загрузка данных пользователя
async function loadUserData(uid: string) {
  isLoading.value = true;

  try {
    if (unsubscribeSnapshot.value) {
      unsubscribeSnapshot.value();
    }

    const userQuery = query(
      collection(db, 'users'),
      where('userId', '==', uid)
    );

    unsubscribeSnapshot.value = onSnapshot(userQuery, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserData[];

      userData.value = docs[0] || null;
      isLoading.value = false;
    });
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    isLoading.value = false;
  }
}

// Загрузка билетов пользователя
async function loadUserTickets(userId: string) {
  isLoadingTickets.value = true;
  try {
    const ticketsRef = collection(db, 'users', userId, 'tickets');
    const q = query(ticketsRef, orderBy('purchaseDate', 'desc'));
    const querySnapshot = await getDocs(q);
    
    userTickets.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Конвертируем Firestore Timestamp в дату
        purchaseDate: formatFirestoreDate(data.purchaseDate)
      } as Purchase;
    });
  } catch (error) {
    console.error('Ошибка загрузки билетов:', error);
    userTickets.value = [];
  } finally {
    isLoadingTickets.value = false;
  }
}

// Форматирование даты из Firestore
const formatFirestoreDate = (timestamp: { seconds: number, nanoseconds: number }) => {
  if (!timestamp?.seconds) return 'Дата не указана';
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Форматирование статуса
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтвержден',
    cancelled: 'Отменен'
  };
  return statusMap[status] || status;
};

// Очистка подписок
onUnmounted(() => {
  if (unsubscribeSnapshot.value) unsubscribeSnapshot.value();
  if (unsubscribeAuth.value) unsubscribeAuth.value();
});
</script>

<template>
  <Header />
  <main class="profile">
    <!-- Состояние загрузки -->
    <template v-if="!authReady">
      <div class="loading-state">
        <p>Проверка авторизации...</p>
      </div>
    </template>

    <!-- Не авторизован -->
    <template v-else-if="!currentUser">
      <div class="auth-required">
        <p>Для просмотра профиля необходимо авторизоваться</p>
        <router-link to="/auth">Войти</router-link>
      </div>
    </template>

    <!-- Основной контент -->
    <template v-else>
      <!-- Загрузка данных -->
      <template v-if="isLoading">
        <div class="loading-state">
          <p>Загрузка данных профиля...</p>
        </div>
      </template>

      <!-- Данные профиля -->
      <template v-else>
        <article class="profile__icons">
          <img src="../../../public/profile/profile.svg" alt="Фон профиля">
          <div class="profile__icons__human">
            <img
              src="../../../public/profile/Pic.svg"
              alt="Аватар пользователя"
              v-if="userData"
            >
          </div>
        </article>

        <article class="profile__description">
          <template v-if="userData">
            <div class="profile__description__data">
              <div class="profile__description__data__name">
                <h1>{{ userData.name }} {{ userData.surname }}</h1>
              </div>
              <div class="profile__description__data__email">
                <p>+{{ userData.phone }}</p>
              </div>
              <div class="profile__description__data__email">
                <p>{{ userData.email }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="data-missing">
              <p>Данные профиля не найдены</p>
            </div>
          </template>

          <div class="profile__description__change">
            <router-link :to="{ name: 'profileEdit', params: { id: userData?.id } }">
              <button>
                <h1>Изменить</h1>
              </button>
            </router-link>
          </div>
        </article>

        <article class="profile__history">
          <div class="profile__history__content">
            <div class="profile__history__content__text">
              <img src="../../../public/profile/Ticket.svg" alt="Иконка билета">
              <h1>История покупок</h1>
            </div>
            
            <div class="profile__history__content__display">
              <!-- Загрузка билетов -->
              <div v-if="isLoadingTickets" class="loading-tickets">
                <p>Загрузка истории покупок...</p>
              </div>
              
              <!-- Пустая история -->
              <div v-else-if="userTickets.length === 0" class="empty-history">
                <p>У вас пока нет купленных билетов</p>
                <router-link to="/posters" class="browse-link">
                  Посмотреть афишу
                </router-link>
              </div>
              
              <!-- Список билетов -->
              <div v-else class="tickets-list">
                <div
                  v-for="ticket in userTickets"
                  :key="ticket.id"
                  class="ticket-card"
                >
                  <div class="ticket-image-container">
                    <img 
                      :src="ticket.eventPhoto ? `/imagesFirebase/posters/${ticket.eventPhoto}` : '/images/default-poster.jpg'"
                      :alt="ticket.posterTitle"
                      class="ticket-image"
                      @error="(e) => (e.target as HTMLImageElement).src = '/images/default-poster.jpg'"
                    />
                  </div>
                  
                  <div class="ticket-info">
                    <h3 class="ticket-title">{{ ticket.posterTitle }}</h3>
                    <div class="ticket-meta">
                      <p><strong>Дата:</strong> {{ ticket.posterDate }}, {{ ticket.posterTime }}</p>
                      <p><strong>Место:</strong> {{ ticket.posterAddress }}</p>
                      <p><strong>Количество билетов:</strong> {{ ticket.ticketCount }}</p>
                      <p><strong>Сумма:</strong> {{ ticket.totalPrice }} ₽</p>
                      <p><strong>Статус:</strong> <span :class="'status-' + ticket.status">{{ formatStatus(ticket.status) }}</span></p>
                      <p><strong>Дата покупки:</strong> {{ ticket.purchaseDate }}</p>
                    </div>
                    
                    <div class="ticket-actions">
                      <router-link 
                        :to="`/ticket/${ticket.ticketId}`" 
                        class="view-ticket"
                      >
                        Посмотреть билет
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </template>
    </template>
  </main>
  <Footer />
</template>

<style scoped>
@import "./profile.scss";

.loading-state,
.auth-required,
.data-missing,
.empty-history {
  text-align: center;
  padding: 2rem;
  color: var(--font-family);
}

.auth-required a {
  color: var(--font-family);
  text-decoration: underline;
}

/* Стили для истории билетов */
.profile__history__content__display {
  margin-top: 20px;
}

.loading-tickets,
.empty-history {
  text-align: center;
  padding: 30px;
  color: #666;
}

.browse-link {
  display: inline-block;
  margin-top: 10px;
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ticket-card {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ticket-image-container {
  width: 200px;
  min-height: 200px;
  background: #f5f5f5;
}

.ticket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ticket-info {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.ticket-title {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
}

.ticket-meta {
  flex: 1;
}

.ticket-meta p {
  margin: 5px 0;
  font-size: 0.95rem;
  color: #555;
}

.ticket-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.view-ticket {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.view-ticket:hover {
  text-decoration: underline;
}

/* Статусы билетов */
.status-pending {
  color: #ff9800;
}

.status-confirmed {
  color: #4caf50;
}

.status-cancelled {
  color: #f44336;
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .ticket-card {
    flex-direction: column;
  }
  
  .ticket-image-container {
    width: 100%;
    height: 150px;
  }
}
</style>
