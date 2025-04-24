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
  home: string;
  time: string;
  duration: string;
  age: string;
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
        home: data?.home || "Место проведения не указано",
        duration: data?.duration || "Продолжительность не указано",
        age: data?.age || "Возростное ограничение не указано",
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

const showModal = ref(false);
const purchaseSuccess = ref(false);
const isPurchasing = ref(false);
const purchaseError = ref('');
const ticketCount = ref(1);
const buyerName = ref('');
const buyerEmail = ref('');

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  purchaseSuccess.value = false;
  ticketCount.value = 1;
  buyerName.value = '';
  buyerEmail.value = '';
  buyerPhone.value = '';
  purchaseError.value = '';
};

const buyTicket = () => {
  isPurchasing.value = true;
  setTimeout(() => {
    isPurchasing.value = false;
    purchaseSuccess.value = true;
  }, 1500);
};
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
              <h1>Возростное ограничение</h1>
              <p>{{ poster.age }}</p>
            </div>

            <div class="info-block__price">
              <h1>Цена билета</h1>
              <p>{{ poster.price }}</p>
            </div>

          </div>

          <!-- Кнопка для открытия модального окна -->
          <button @click="showModal = true" class="buy-button">
            <p>Купить билет</p>
          </button>

          <!-- Модальное окно -->
          <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
              <button class="modal-close" @click="closeModal">&times;</button>

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
                  <p>Ваше имя:</p>
                  <input v-model="buyerName" type="text" required class="form-control">
                </div>

                <div class="form-group">
                  <p>Email:</p>
                  <input v-model="buyerEmail" type="email" required class="form-control">
                </div>

                <div class="form-group">
                  <p>Телефон:</p>
                  <input v-model="buyerPhone" type="tel" required class="form-control" placeholder="+7 (XXX) XXX-XX-XX">
                </div>

                <div v-if="purchaseError" class="error-message">
                  {{ purchaseError }}
                </div>

                <button @click="buyTicket" :disabled="isPurchasing" class="buy-button-ticket">
                  <p v-if="isPurchasing">Обработка...</p>
                  <p v-else>Оформить заказ</p>
                </button>
              </div>

              <div v-else class="success-message">
                <h3>Спасибо за покупку!</h3>
                <h2>Ваш заказ на {{ ticketCount }} билет(а, ов) оформлен.</h2>
                <h2>Наш менеджер свяжется с вами в ближайшее время для подтверждения.</h2>
                <button @click="resetForm" class="buy-button">
                  <p>Купить еще билеты</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="poster__container__content__image">
            <img :src="`/imagesFirebase/posters/${poster.photo}`" :alt="poster.title"
              @error="(e) => e.target.src = '/images/default-news.jpg'" />
          </div>
      </div>
      <div class="poster__container__description">
        <h1>О событии</h1>
        <p>{{ poster.description }}</p>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
@import "./posterDetail.scss";
</style>