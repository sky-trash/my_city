<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../main';
import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';

interface Attraction {
  id: string;
  title: string;
  tag: string;
  photo: string;
  icons: string;
  descriptions: string;
  time: string;
  map: string;
}

const route = useRoute();
const attraction = ref<Attraction | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const docRef = doc(db, 'attractions', route.params.id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      attraction.value = {
        id: docSnap.id,
        title: docSnap.data().title || 'Без названия',
        tag: docSnap.data().tag || 'Общее',
        photo: docSnap.data().photo || '/images/default-attraction.jpg',
        icons: docSnap.data().icons || '/images/default-attraction.jpg',
        time: docSnap.data().time || 'Без времени',
        map: docSnap.data().map || 'Без места',
        descriptions: docSnap.data().descriptions || 'Без описания',
      };
    } else {
      error.value = 'Достопримечательность не найдена';
    }
  } catch (err) {
    error.value = `Ошибка загрузки: ${err instanceof Error ? err.message : String(err)}`;
    console.error('Ошибка загрузки:', err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Header />
  <main class="attraction">
    <article class="attraction__layout">
      <div class="attraction__layout__home">

        <router-link to="/" class="attraction__layout__home__link">
          <h1>Главная</h1>
          <img src="../../../public/attaraction/right.svg" alt="">
        </router-link>

        <router-link to="/attraction" class="attraction__layout__home__link">
          <h1>Достопремичательности</h1>
          <img src="../../../public/attaraction/right.svg" alt="">
        </router-link>

        <div v-if="attraction" class="attraction__layout__home__link">
          <h1>{{ attraction.title }}</h1>
        </div>

      </div>

      <div v-if="isLoading" class="loading-state">
        Загрузка данных...
      </div>

      <div v-if="error" class="error-state">
        {{ error }}
      </div>

      <div v-if="attraction" class="attraction__layout__content">
        <div class="attraction__layout__content__descriptions">
          <div class="attraction__layout__content__descriptions__tag">
            <h1>{{ attraction.tag }}</h1>
          </div>
          <div class="attraction__layout__content__descriptions__title">
            <h1>{{ attraction.title }}</h1>
          </div>
          <div class="attraction__layout__content__descriptions__time">
            <img src="../../../public/attaraction/time.svg" alt="">
            <h1>{{ attraction.time }}</h1>
          </div>
          <div class="attraction__layout__content__descriptions__map">
            <img src="../../../public/attaraction/map.svg" alt="">
            <h1>{{ attraction.map }}</h1>
          </div>
        </div>
        <div class="attraction__layout__content__icons">
          <img
            :src="attraction.icons.startsWith('http') ? attraction.icons : `/imagesFirebase/attractions/${attraction.icons}`"
            :alt="attraction.title"
            @error="(e) => (e.target as HTMLImageElement).src = '/images/default-attraction.jpg'" class="main-image">
        </div>
      </div>

      <div v-if="attraction" class="attraction__layout__description">
        <h1>Описание местности</h1>
        <p>{{ attraction.descriptions }}</p>
      </div>
    </article>
  </main>
  <Footer />
</template>
<style scoped>
@import "./attractionDetail.scss";
</style>