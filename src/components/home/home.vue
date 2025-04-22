<script setup lang="ts">
import Application from "../application/application.vue";
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
  views: number;
}

const router = useRouter();
const news = ref<NewsItem[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const itemsToShow = ref(4); // Начальное количество отображаемых новостей

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
  <main class="main">
    <article class="main__news">
      <div class="main__news__navbar">
        <div class="main__news__navbar__all">
          <h1>Все новости</h1>
        </div>
        <div class="main__news__navbar__more">
          <a href="/News">
            <h1>Подробнее</h1>
            <img src="../../../public/home/right.svg" alt="">
          </a>
        </div>
      </div>
        <!-- Состояние загрузки -->
        <div v-if="isLoading" class="loading-state">
          Загрузка новостей...
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="error-state">
          {{ error }}
        </div>
      <div class="main__news__content">
        <a href="#" v-for="newsis in news" :key="newsis.id" @click="goToNewsDetail(newsis.id)">
          <div class="main__news__content__card">
            <div class="main__news__content__card__icons">
              <img :src="`/imagesFirebase/news/${newsis.photo}`" alt="">
            </div>
            <div class="main__news__content__card__info">
              <div class="main__news__content__card__info__tag">
                <p>{{ newsis.tag }}</p>
              </div>
              <div class="main__news__content__card__info__text">
                <h1>{{ newsis.title }}</h1>
              </div>
              <div class="main__news__content__card__info__time">
                <p>{{ newsis.date }}</p>
                <img src="../../../public/home/eye.svg" alt="">
                <p>{{ newsis.views }}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </article>

    <article class="main__cause">
      <img id="image-cause" src="/home/cause.svg" alt="Причины переехать" />
      <div class="main__cause__content">
        <div class="main__cause__content__text">
          <h1>
            5 весомых причин<br />
            переехать в Борисоглебск
          </h1>
        </div>
        <div class="main__cause__content__five">
          <div
            v-for="(reason, index) in [
              { icon: 'story.svg', text: 'Исторический город' },
              { icon: 'work.svg', text: 'Возможность трудоустройства' },
              { icon: 'life.svg', text: 'Жилье' },
              { icon: 'rest.svg', text: 'Возможность для отдыха' },
              { icon: 'children.svg', text: 'Объекты для детей' },
            ]"
            :key="index"
            class="main__cause__content__five__cause"
          >
            <img :src="`/home/${reason.icon}`" :alt="reason.text" />
            <h1>{{ reason.text }}</h1>
          </div>
        </div>
        <div class="main__cause__content__button">
          <router-link to="/Reasons">
            <button>
              <h1>Подробнее</h1>
              <img src="/home/right-cause.svg" alt="" />
              <img id="right-cause-white" src="/home/right-cause-white.svg" alt="" />
            </button>
          </router-link>
        </div>
      </div>
    </article>

    <article class="main__map">
      <img id="map" src="/home/map/map.svg" alt="Карта Борисоглебска" />
    </article>

    <article class="main__numbers">
      <div class="main__numbers__text">
        <h1>Борисоглебск в цифрах</h1>
      </div>
      <div class="main__numbers__content">
        <div
          v-for="(stat, index) in [
            { value: '60 687', label: 'человек численность населения' },
            { value: '113', label: 'памятников культуры и архитектуры' },
            { value: '25', label: 'количество ВУЗов и СУЗов' },
          ]"
          :key="index"
          class="main__numbers__content__card"
        >
          <h1>{{ stat.value }}</h1>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </article>
  </main>

  <Application />
</template>

<style scoped>
@import "./home.scss";

.loading-state,
.error-state {
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
}

.error-state {
  color: #ff0000;
}
</style>
