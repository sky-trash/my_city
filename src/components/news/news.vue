<script setup lang="ts">
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../main";
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

interface NewsItem {
  id: string;
  title: string;
  tag: string;
  date: string;
  photo: string;
  views?: number;
}

const router = useRouter();
const news = ref<NewsItem[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const itemsToShow = ref(6); // Начальное количество отображаемых новостей

// Функция для форматирования даты
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      // hour: '2-digit',
      // minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

// Загрузка новостей
const fetchNews = () => {
  const newsQuery = query(
    collection(db, 'news'),
    orderBy('date', 'desc'),
    limit(itemsToShow.value)
  );

  const unsubscribe = onSnapshot(
    newsQuery,
    (snapshot) => {
      news.value = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Без названия',
        tag: doc.data().tag || 'Общее',
        date: formatDate(doc.data().date),
        photo: doc.data().photo || '/images/default-news.jpg',
        views: doc.data().views || 0
      }));
      isLoading.value = false;
    },
    (err) => {
      error.value = `Ошибка загрузки новостей: ${err.message}`;
      isLoading.value = false;
      console.error('Ошибка загрузки новостей:', err);
    }
  );

  return unsubscribe;
};

// Переход к детальной странице новости
const goToNewsDetail = (id: string) => {
  router.push(`/news/${id}`);
};

// Загрузка дополнительных новостей
const loadMore = () => {
  itemsToShow.value += 4;
  fetchNews();
};

onMounted(() => {
  const unsubscribe = fetchNews();

  // Отписка при размонтировании компонента
  return () => {
    if (unsubscribe) unsubscribe();
  };
});
</script>

<template>
  <div>
    <Header />
    <main class="news">
      <article class="news__layout">
        <router-link to="/" class="news__layout__home">
          <h1>Главная</h1>
          <img src="/news/right.svg" alt="Стрелка вправо">
        </router-link>
        <div class="news__layout__text">
          <h1>Городские новости</h1>
        </div>
      </article>

      <article class="news__events">
        <div class="news__events__text">
          <h1>Все события</h1>
        </div>

        <!-- Состояние загрузки -->
        <div v-if="isLoading" class="loading-state">
          Загрузка новостей...
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="error-state">
          {{ error }}
        </div>

        <!-- Список новостей -->
        <div class="news__events__content">
          <div
            v-for="item in news"
            :key="item.id"
            class="news__events__content__card"
            @click="goToNewsDetail(item.id)"
          >
            <div class="news__events__content__card__icons">
              <img
                :src="`/imagesFirebase/news/${item.photo}`"
                loading="lazy"
                @error="(e) => e.target.src = '/images/default-news.jpg'"
              >
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>{{ item.tag }}</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>{{ item.title }}</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>{{ item.date }}</p>
                <img src="/news/ear.svg" alt="Просмотры">
                <p>{{ item.views }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка "Показать еще" -->
        <div class="news__events__button" v-if="news.length > 0 && !isLoading">
          <button @click="loadMore">
            <h1>Показать еще</h1>
          </button>
        </div>
      </article>
    </main>
    <Application />
    <Footer />
  </div>
</template>

<style scoped>
@import "./news.scss";

.loading-state,
.error-state {
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
}

.error-state {
  color: #ff0000;
}

.news__events__content__card {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.news__events__content__card:hover {
  transform: translateY(-5px);
}

.news__events__content__card__icons img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}
</style>
