<script setup>
import Application from '../application/application.vue';
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../main" // Убрал неиспользуемый apps
import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter();
const news = ref([]);
const nShow = ref(4); // количество карточек для отображения

// Функция для получения новостей с сортировкой и лимитом
const fetchNews = () => {
  const newsQuery = query(
    collection(db, "news"),
    orderBy("date", "desc"), // Сортировка по дате (предполагая, что date - timestamp)
    limit(nShow.value)
  );

  const unsubscribe = onSnapshot(newsQuery, (snapshot) => {
    news.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      tag: doc.data().tag,
      date: formatDate(doc.data().date), // Форматируем дату
      photo: doc.data().photo || '/images/default-news.jpg', // Дефолтное изображение
      views: doc.data().views || 0 // Добавил счетчик просмотров
    }));
  });

  return unsubscribe;
};

// Форматирование даты (простая реализация)
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Переход к полной новости
const goToNews = (id) => {
  router.push(`/news/${id}`);
};

onMounted(() => {
  const unsubscribe = fetchNews();

  // Отписка при размонтировании компонента
  return () => unsubscribe();
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
          <router-link to="/News">
            <h1>Подробнее</h1>
            <img src="/home/right.svg" alt="Стрелка вправо">
          </router-link>
        </div>
      </div>
      <div class="main__news__content">
        <div v-for="item in news" :key="item.id" class="news-card" @click="goToNews(item.id)">
          <div class="main__news__content__card">
            <div class="main__news__content__card__icons">
              <img :src="item.photo" :alt="item.title">
            </div>
            <div class="main__news__content__card__info">
              <div class="main__news__content__card__info__tag">
                <p>{{ item.tag }}</p>
              </div>
              <div class="main__news__content__card__info__text">
                <h1>{{ item.title }}</h1>
              </div>
              <div class="main__news__content__card__info__time">
                <p>{{ item.date }}</p>
                <img src="/home/eye.svg" alt="Просмотры">
                <p>{{ item.views }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <article class="main__cause">
      <img id="image-cause" src="/home/cause.svg" alt="Причины переехать">
      <div class="main__cause__content">
        <div class="main__cause__content__text">
          <h1>5 весомых причин<br> переехать в Борисоглебск</h1>
        </div>
        <div class="main__cause__content__five">
          <div v-for="(reason, index) in [
            { icon: 'story.svg', text: 'Исторический город' },
            { icon: 'work.svg', text: 'Возможность трудоустройства' },
            { icon: 'life.svg', text: 'Жилье' },
            { icon: 'rest.svg', text: 'Возможность для отдыха' },
            { icon: 'children.svg', text: 'Объекты для детей' }
          ]" :key="index" class="main__cause__content__five__cause">
            <img :src="`/home/${reason.icon}`" :alt="reason.text">
            <h1>{{ reason.text }}</h1>
          </div>
        </div>
        <div class="main__cause__content__button">
          <router-link to="/Reasons">
            <button>
              <h1>Подробнее</h1>
              <img src="/home/right-cause.svg" alt="">
              <img id="right-cause-white" src="/home/right-cause-white.svg" alt="">
            </button>
          </router-link>
        </div>
      </div>
    </article>

    <article class="main__map">
      <img id="map" src="/home/map/map.svg" alt="Карта Борисоглебска">
    </article>

    <article class="main__numbers">
      <div class="main__numbers__text">
        <h1>Борисоглебск в цифрах</h1>
      </div>
      <div class="main__numbers__content">
        <div v-for="(stat, index) in [
          { value: '60 687', label: 'человек численность населения' },
          { value: '113', label: 'памятников культуры и архитектуры' },
          { value: '25', label: 'количество ВУЗов и СУЗов' }
        ]" :key="index" class="main__numbers__content__card">
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
</style>
