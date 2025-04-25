<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../main';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';

// Props declaration
defineProps<{
  id?: string
}>();

// Interfaces
interface PosterDetail {
  id: string;
  title: string;
  tag: string;
  price: number;
  date: string;
  home: string;
  time: string;
  duration: string;
  age: string;
  address: string;
  photo: string;
  description: string;
}

interface Purchase {
  id?: string;
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
  purchaseDate: any;
  status: 'pending' | 'confirmed' | 'cancelled';
  ticketId?: string;
}

// Router and state
const route = useRoute();
const router = useRouter();
const poster = ref<PosterDetail | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Auth state
const isAuthenticated = ref(false);
const currentUser = ref<any>(null);

// Purchase form
const showModal = ref(false);
const showAuthModal = ref(false);
const purchaseSuccess = ref(false);
const isPurchasing = ref(false);
const purchaseError = ref('');
const ticketCount = ref(1);
const buyerName = ref('');
const buyerEmail = ref('');
const buyerPhone = ref('');

// Helpers
const formatPhone = (phone: string) => phone.replace(/\D/g, '');

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = '/images/default-poster.jpg';
};

const generateTicketId = () => {
  if (!currentUser.value) return '';
  return `${currentUser.value.uid.slice(0, 8)}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
};

// Lifecycle hooks
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user;
    currentUser.value = user;
    if (user) {
      buyerName.value = user.displayName || '';
      buyerEmail.value = user.email || '';
    }
  });

  loadPoster();
});

// Data loading
const loadPoster = async () => {
  try {
    if (!route.params.id || typeof route.params.id !== 'string') {
      throw new Error('Неверный ID мероприятия');
    }

    const docRef = doc(db, "posters", route.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      poster.value = {
        id: docSnap.id,
        title: data?.title || "Без названия",
        tag: data?.tag || "Другое",
        price: data?.price || 0,
        date: formatDate(data?.date) || "Дата не указана",
        time: data?.time || "Время не указано",
        address: data?.address || "Адрес не указан",
        home: data?.home || "Место проведения не указано",
        duration: data?.duration || "Продолжительность не указано",
        age: data?.age || "Возрастное ограничение не указано",
        photo: data?.photo || "default.jpg",
        description: data?.description || "Описание отсутствует"
      };
    } else {
      throw new Error('Мероприятие не найдено');
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
    console.error("Ошибка загрузки:", err);
  } finally {
    isLoading.value = false;
  }
};

// Modal handlers
const goToAuth = () => router.push(`/auth?redirect=${encodeURIComponent(route.fullPath)}`);

const openModal = () => {
  if (!isAuthenticated.value) {
    showAuthModal.value = true;
    return;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  purchaseSuccess.value = false;
  ticketCount.value = 1;
  buyerName.value = currentUser.value?.displayName || '';
  buyerEmail.value = currentUser.value?.email || '';
  buyerPhone.value = '';
  purchaseError.value = '';
};

// Purchase logic
const buyTicket = async () => {
  if (!poster.value) {
    purchaseError.value = 'Мероприятие не найдено';
    return;
  }

  if (!buyerName.value || !buyerEmail.value || !buyerPhone.value) {
    purchaseError.value = 'Заполните все обязательные поля';
    return;
  }

  if (buyerPhone.value.length < 11) {
    purchaseError.value = 'Введите корректный номер телефона';
    return;
  }

  isPurchasing.value = true;
  purchaseError.value = '';

  try {
    const purchaseData: Purchase = {
      userId: currentUser.value?.uid || '',
      posterId: poster.value.id,
      posterTitle: poster.value.title,
      posterDate: poster.value.date,
      posterTime: poster.value.time,
      posterAddress: poster.value.address,
      posterPrice: poster.value.price,
      ticketCount: ticketCount.value,
      totalPrice: poster.value.price * ticketCount.value,
      buyerName: buyerName.value,
      buyerEmail: buyerEmail.value,
      buyerPhone: buyerPhone.value,
      purchaseDate: serverTimestamp(),
      status: 'pending',
      ticketId: generateTicketId()
    };

    const purchasesRef = collection(db, 'purchases');
    await setDoc(doc(purchasesRef), purchaseData);
    purchaseSuccess.value = true;
  } catch (error) {
    console.error('Ошибка при покупке:', error);
    purchaseError.value = 'Произошла ошибка при оформлении заказа';
  } finally {
    isPurchasing.value = false;
  }
};

// Computed
const totalPrice = computed(() => poster.value ? poster.value.price * ticketCount.value : 0);

// Watchers
watch(buyerPhone, (newVal) => {
  buyerPhone.value = formatPhone(newVal);
});
</script>

<template>
  <Header />
  <main class="poster">
    <div v-if="isLoading" class="loading">
      <h2>Загрузка мероприятия...</h2>
    </div>

    <div v-else-if="error" class="error">
      <h2>{{ error }}</h2>
      <router-link to="/posters" class="back-link">
        ← Вернуться к афише
      </router-link>
    </div>

    <div v-else-if="poster" class="poster__container">
      <div class="poster__container__header">
        <router-link to="/" class="back-link">
          <h1>Главная</h1>
          <img src="../../../public/poster/right.svg" alt="">
        </router-link>
        <router-link to="/posters" class="back-link">
          <h1>Афиша</h1>
          <img src="../../../public/poster/right.svg" alt="">
        </router-link>
        <h1>{{ poster.title }}</h1>
      </div>
      
      <div class="poster__container__content">
        <div class="poster__container__content__info">
          <div class="info-block__tag">
            <p>{{ poster.tag }}</p>
          </div>

          <div class="info-block__title">
            <p>{{ poster.title }}</p>
          </div>

          <div class="info-block__date">
            <p>{{ poster.date }}, {{ poster.time }}</p>
          </div>

          <div class="poster__container__content__info__block">
            <div class="info-block__home">
              <h1>Постановщик</h1>
              <p>{{ poster.home }}</p>
            </div>

            <div class="info-block__duration">
              <h1>Продолжительность</h1>
              <p>{{ poster.duration }}</p>
            </div>

            <div class="info-block__age">
              <h1>Возрастное ограничение</h1>
              <p>{{ poster.age }}</p>
            </div>

            <div class="info-block__price">
              <h1>Цена билета</h1>
              <p>{{ poster.price }} ₽</p>
            </div>
          </div>

          <button @click="openModal" class="buy-button">
            <p>Купить билет</p>
          </button>

          <!-- Purchase Modal -->
          <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
              <button class="modal-close" @click="closeModal">&times;</button>

              <div v-if="!purchaseSuccess" class="ticket-form">
                <h3>Купить билет на "{{ poster.title }}"</h3>

                <div class="form-group">
                  <div class="price-calculation">
                    <p>Цена за билет: {{ poster.price }} ₽</p>
                    <label>Количество билетов:</label>
                    <input v-model.number="ticketCount" type="number" min="1" max="10" class="form-control">
                    <p class="total-price">Итого: {{ totalPrice }} ₽</p>
                  </div>
                </div>

                <div class="form-group">
                  <label>Ваше имя:</label>
                  <input v-model="buyerName" type="text" required class="form-control">
                </div>

                <div class="form-group">
                  <label>Email:</label>
                  <input v-model="buyerEmail" type="email" required class="form-control">
                </div>

                <div class="form-group">
                  <label>Телефон:</label>
                  <input v-model="buyerPhone" type="tel" required class="form-control" placeholder="+7 (XXX) XXX-XX-XX">
                </div>

                <div v-if="purchaseError" class="error-message">
                  {{ purchaseError }}
                </div>

                <button @click="buyTicket" :disabled="isPurchasing" class="buy-button-ticket">
                  <span v-if="isPurchasing">Обработка...</span>
                  <span v-else>Оформить заказ</span>
                </button>
              </div>

              <div v-else class="success-message">
                <h3>Спасибо за покупку!</h3>
                <p>Ваш заказ на {{ ticketCount }} билет(а) оформлен.</p>
                <p>Наш менеджер свяжется с вами для подтверждения.</p>
                <p>Номер заказа: {{ generateTicketId() }}</p>
                <button @click="closeModal" class="close-button">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="poster__container__content__image">
          <img 
            :src="`/imagesFirebase/posters/${poster.photo}`" 
            :alt="poster.title"
            @error="handleImageError" 
          />
        </div>
      </div>
      
      <div class="poster__container__description">
        <h1>О событии</h1>
        <p>{{ poster.description }}</p>
      </div>
    </div>

    <!-- Auth Modal -->
    <div v-if="showAuthModal" class="modal-overlay" @click.self="showAuthModal = false">
      <div class="modal-content">
        <button class="modal-close" @click="showAuthModal = false">&times;</button>
        <div class="auth-message">
          <h3>Требуется авторизация</h3>
          <p>Для покупки билетов необходимо войти в систему</p>
          <div class="auth-buttons">
            <button @click="goToAuth" class="auth-button">
              Войти
            </button>
            <button @click="showAuthModal = false" class="cancel-button">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
@import "./posterDetail.scss";

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: modalFadeIn 0.3s ease-out;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #333;
}

.auth-message {
  text-align: center;
  padding: 1rem 0;
}

.auth-message h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.auth-message p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
}

.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.auth-button {
  background-color: #42b983;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
  flex: 1;
}

.auth-button:hover {
  background-color: #3aa876;
}

.cancel-button {
  background-color: #f1f1f1;
  color: #333;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  flex: 1;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптация для мобильных устройств */
@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    width: 95%;
  }
  
  .auth-buttons {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .auth-button,
  .cancel-button {
    width: 100%;
  }
}
</style>