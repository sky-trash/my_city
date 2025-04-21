<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../main";
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';

const posters = ref([]);
const isLoading = ref(true);
const error = ref(null);
let unsubscribe = null;

const fetchPosters = () => {
  try {
    const postersQuery = query(collection(db, 'posters'));
    unsubscribe = onSnapshot(postersQuery, (snapshot) => {
      posters.value = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Без названия',
        tag: doc.data().tag || 'Другое',
        price: doc.data().price || 0,
        date: doc.data().date || 'Дата не указана',
        address: doc.data().address || 'Адрес не указан',
        photo: doc.data().photo || 'default.jpg',
      }));
      isLoading.value = false;
    }, (err) => {
      error.value = 'Ошибка загрузки мероприятий';
      isLoading.value = false;
    });
  } catch (err) {
    error.value = 'Неожиданная ошибка';
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPosters();
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
  <Header />
  <main class="poster">
    <article class="poster__layout">
      <router-link to="/">
        <div class="poster__layout__home">
          <h1>Главная</h1>
          <img src="/poster/right.svg" alt="">
        </div>
      </router-link>
      <div class="poster__layout__text">
        <h1>Афиша</h1>
      </div>
    </article>

    <article class="poster__events">
      <div class="poster__events__text">
        <h1>Все события</h1>
      </div>

      <div v-if="isLoading" class="poster__events__content">
        <div class="poster__events__content__card">
          <div class="poster__events__content__card__info">
            <div class="poster__events__content__card__info__text">
              <h1>Загрузка мероприятий...</h1>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="poster__events__content">
        <div class="poster__events__content__card">
          <div class="poster__events__content__card__info">
            <div class="poster__events__content__card__info__text">
              <h1>{{ error }}</h1>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="posters.length === 0" class="poster__events__content">
        <div class="poster__events__content__card">
          <div class="poster__events__content__card__info">
            <div class="poster__events__content__card__info__text">
              <h1>Нет доступных мероприятий</h1>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="poster__events__content">
        <router-link
          v-for="poster in posters"
          :key="poster.id"
          :to="`/event/${poster.id}`"
          class="poster__events__content__link"
        >
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img
                :src="`/imagesFirebase/posters/${poster.photo}`"
                :alt="poster.title"
                loading="lazy"
              >
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>{{ poster.tag }}</h1>
                <h2>от {{ poster.price }} ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>{{ poster.title }}</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>{{ poster.date }}, {{ poster.address }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </article>
  </main>
  <Application />
  <Footer />
</template>

<style scoped>
@import "./poster.scss";
</style>
