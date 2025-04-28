<script setup lang="ts">
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../main";
import { ref, onUnmounted } from "vue";
import { useRouter } from 'vue-router';

interface Attraction {
  id: string;
  title: string;
  tag: string;
  photo: string;
  descriptions: string;
  time: string;
  map: string;
  icons: string;
}

const router = useRouter();
const attractions = ref<Attraction[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Загрузка достопримечательностей
const fetchAttractions = () => {
  const attractionsQuery = query(
    collection(db, 'attractions'),
    orderBy('title', 'asc')
  );

  const unsubscribe = onSnapshot(
    attractionsQuery,
    (snapshot) => {
      attractions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Без названия',
        tag: doc.data().tag || 'Общее',
        photo: doc.data().photo || '/images/default-attraction.jpg',
        icons: doc.data().icons || '/images/default-attraction.jpg',
        time: doc.data().time || 'Без времени',
        map: doc.data().map || 'Без места',
        descriptions: doc.data().descriptions || 'Без описания',
      }));
      isLoading.value = false;
    },
    (err) => {
      error.value = `Ошибка загрузки достопримечательностей: ${err.message}`;
      isLoading.value = false;
      console.error('Ошибка загрузки:', err);
    }
  );

  return unsubscribe;
};

// Очистка подписки при размонтировании компонента
let unsubscribe: () => void;
onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

// Инициализация загрузки
unsubscribe = fetchAttractions();

// Переход к детальной странице
const goToAttractionDetail = (id: string) => {
  router.push({
    name: 'AttractionDetail',
    params: { id }
  }).catch(err => {
    console.error('Navigation error:', err);
    // Дополнительная обработка ошибки
  });
}
</script>

<template>
  <Header />
  <main class="attaraction">
    <article class="attaraction__layout">
      <div class="attaraction__layout__home">
        <router-link to="/">
          <h1>Главная</h1>
          <img src="../../../public/attaraction/right.svg" alt="">
        </router-link>
      </div>
      <div class="attaraction__layout__text">
        <h1>Достопремичательности</h1>
      </div>
    </article>

    <article class="attaraction__events">
      <div class="attaraction__events__all">
        <h1>Все достопримечательности</h1>
      </div>

      <div class="attaraction__events__content">
        <div class="attaraction__events__content__card" v-for="item in attractions" :key="item.id"
          @click="goToAttractionDetail(item.id)">
          <img :src="`/imagesFirebase/attractions/${item.photo}`" alt="">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </article>

    <div v-if="isLoading" class="loading-state">
      Загрузка данных...
    </div>

    <div v-if="error" class="error-state">
      {{ error }}
    </div>
  </main>
  <Application />
  <Footer />
</template>

<style scoped>
@import "./attaraction.scss";

.loading-state,
.error-state {
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
}

.error-state {
  color: #ff4444;
}
</style>