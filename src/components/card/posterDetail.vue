<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../main';
import { collection, addDoc } from 'firebase/firestore';
import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';

// маска для телефона
const formatPhone = (phone: string) => {
  return phone
    .replace(/\D/g, '')
  // .replace(/^(\d)/, '+7 (9')
  // .replace(/^(\+\d{1})(\d)/, '$0 $9')
  // .replace(/(\d{3})(\d)/, '$0) $0')
  // .replace(/(\d{3})(\d)/, '$0-$9')
  // .replace(/(-\d{2})(\d)/, '$0-$9')
  // .replace(/(-\d{2})\d+?$/, '$9');
};

const buyerPhone = ref('');

watch(buyerPhone, (newVal) => {
  buyerPhone.value = formatPhone(newVal);
});

interface PosterDetail {
  id: string;
  title: string;
  tag: string;
  price: string;
  date: string;
  time: string;
  address: string;
  photo: string;
  description: string;
}

const route = useRoute();
const poster = ref<PosterDetail | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: '2-digit',
      // minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

onMounted(async () => {
  try {
    // Проверяем наличие ID в параметрах маршрута
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
        price: data?.price || "Цена не указана",
        date: data?.date || "Дата не указана",
        time: data?.time || "Время не указано",
        address: data?.address || "Адрес не указан",
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
});

// Состояние для формы покупки
const ticketCount = ref(1);
const buyerName = ref('');
const buyerEmail = ref('');
const isPurchasing = ref(false);
const purchaseSuccess = ref(false);
const purchaseError = ref('');

// Функция покупки билета
const buyTicket = async () => {
  if (!poster.value) return;

  purchaseError.value = '';
  isPurchasing.value = true;

  try {
    // Валидация
    if (!buyerName.value.trim()) {
      throw new Error('Введите ваше имя');
    }
    if (!buyerEmail.value.trim() || !/^\S+@\S+\.\S+$/.test(buyerEmail.value)) {
      throw new Error('Введите корректный email');
    }
    if (!buyerPhone.value.trim()) {
      throw new Error('Введите номер телефона');
    }

    // Сохраняем заказ в Firestore
    await addDoc(collection(db, 'tickets'), {
      posterId: poster.value.id,
      posterTitle: poster.value.title,
      count: ticketCount.value,
      name: buyerName.value,
      email: buyerEmail.value,
      phone: buyerPhone.value,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    purchaseSuccess.value = true;
  } catch (err) {
    purchaseError.value = err instanceof Error ? err.message : 'Ошибка при покупке билета';
    console.error('Ошибка покупки:', err);
  } finally {
    isPurchasing.value = false;
  }
};
</script>

<template>
  <Header />
  <main class="poster-detail">
    <div v-if="isLoading" class="loading">
      <h2>Загрузка мероприятия...</h2>
    </div>

    <div v-else-if="error" class="error">
      <h2>{{ error }}</h2>
      <router-link to="/poster" class="back-link">
        ← Вернуться к афише
      </router-link>
    </div>

    <div v-else-if="poster" class="poster-container">
      <div class="poster-header">
        <router-link to="/posters" class="back-link">
          ← Назад к афише
        </router-link>
        <h1 class="poster-title">{{ poster.title }}</h1>
        <div class="poster-meta">
          <span class="tag">{{ poster.tag }}</span>
          <span class="price">от {{ poster.price }} ₽</span>
        </div>
      </div>

      <div class="poster-content">
        <div class="poster-image">
          <img :src="`/imagesFirebase/posters/${poster.photo}`" :alt="poster.title"
            @error="(e) => e.target.src = '/images/default-news.jpg'" />
        </div>

        <div class="poster-info">
          <div class="info-block">
            <h3>Дата и время</h3>
            <p>{{ formatDate(poster.date) }} {{ poster.time }}</p>
          </div>

          <div class="info-block">
            <h3>Место проведения</h3>
            <p>{{ poster.address }}</p>
          </div>

          <div class="info-block">
            <h3>Описание</h3>
            <p class="description">{{ poster.description }}</p>
          </div>

          <div v-if="!purchaseSuccess" class="ticket-form">
            <h3>Купить билет</h3>

            <div class="form-group">
              <div class="price-calculation">
                <p>Цена за билет: {{ poster.price }} ₽</p>
                <label>Количество билетов:</label>
                <input v-model.number="ticketCount" type="number" min="1" max="10" class="form-control">
                <p class="total-price">Итого: {{ Number(poster.price) * ticketCount }} ₽</p>
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

            <button @click="buyTicket" :disabled="isPurchasing" class="buy-button">
              <span v-if="isPurchasing">Обработка...</span>
              <span v-else>Оформить заказ</span>
            </button>
          </div>

          <div v-else class="success-message">
            <h3>Спасибо за покупку!</h3>
            <p>Ваш заказ на {{ ticketCount }} билет(а) оформлен.</p>
            <p>Наш менеджер свяжется с вами в ближайшее время для подтверждения.</p>
            <button @click="purchaseSuccess = false" class="buy-button">
              Купить еще билеты
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
.poster-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

input {
  color: #000;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #000;
}

.poster-header {
  margin-bottom: 2rem;
}

.poster-title {
  font-size: 2.5rem;
  margin: 0.5rem 0;
}

.poster-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tag {
  background-color: #f0f0f0;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.price {
  font-weight: bold;
  color: #2c3e50;
}

.poster-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.poster-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-block {
  margin-bottom: 1.5rem;
}

.info-block h3 {
  margin-bottom: 0.5rem;
  color: #555;
}

.description {
  line-height: 1.6;
}

.buy-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.buy-button:hover {
  background-color: #369f6b;
}

@media (max-width: 768px) {
  .poster-content {
    grid-template-columns: 1fr;
  }

  .poster-title {
    font-size: 2rem;
  }
}

.ticket-form {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #ff4444;
  margin: 1rem 0;
}

.success-message {
  background: #f0fff4;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.success-message h3 {
  color: #2e7d32;
  margin-bottom: 1rem;
}

.buy-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {

  .ticket-form,
  .success-message {
    padding: 1rem;
  }
}
</style>