<script setup lang="ts">
import Header from "../layout/header/header.vue";
import Application from "../application/application.vue";
import Footer from "../layout/footer/footer.vue";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../main";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface PostersItem {
  id: string;
  title: string;
  tag: string;
  price: string;
  date: string;
  address: string;
  photo: string;
}

const router = useRouter();
const posters = ref<PostersItem[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Функция для форматирования даты
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      // hour: '2-digit',
      // minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};

// Загрузка афиши
const fetchPosters = () => {
  const postersQuery = query(collection(db, "posters"), orderBy("date", "desc"));

  const unsubscribe = onSnapshot(
    postersQuery,
    (snapshot) => {
      posters.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || "Без названия",
        tag: doc.data().tag || "Другое",
        price: doc.data().price || 0,
        date: doc.data().date || "Дата не указана",
        address: doc.data().address || "Адрес не указан",
        photo: doc.data().photo || "default.jpg",
      }));
      isLoading.value = false;
    },
    (err) => {
      error.value = `Ошибка загрузки афиши: ${err.message}`;
      isLoading.value = false;
      console.error("Ошибка загрузки афиши:", err);
    }
  );

  return unsubscribe;
};

// Переход к детальной странице новости
const goToPostersDetail = (id: string) => {
  router.push(`/Posters/${id}`);
};

onMounted(() => {
  const unsubscribe = fetchPosters();

  // Отписка при размонтировании компонента
  return () => {
    if (unsubscribe) unsubscribe();
  };
});
</script>

<template>
  <Header />
  <main class="poster">
    <article class="poster__layout">
      <router-link to="/">
        <div class="poster__layout__home">
          <h1>Главная</h1>
          <img src="/poster/right.svg" alt="" />
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
        <div
          v-for="poster in posters"
          :key="poster.id"
          @click="goToPostersDetail(poster.id)"
          class="poster__events__content__link"
        >
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img
              :src="`/imagesFirebase/posters/${poster.photo}`"
                loading="lazy"
                @error="(e) => e.target.src = '/images/default-news.jpg'"
              />
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
        </div>
      </div>
    </article>
  </main>
  <Application />
  <Footer />
</template>

<style scoped>
@import "./poster.scss";
</style>
