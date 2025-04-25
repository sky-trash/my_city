<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../main";
import { collection, addDoc } from "firebase/firestore";
import Header from "../layout/header/header.vue";
import Footer from "../layout/footer/footer.vue";

// маска для телефона
const formatPhone = (phone: string) => {
  return phone.replace(/\D/g, "");
  // .replace(/^(\d)/, '+7 (9')
  // .replace(/^(\+\d{1})(\d)/, '$0 $9')
  // .replace(/(\d{3})(\d)/, '$0) $0')
  // .replace(/(\d{3})(\d)/, '$0-$9')
  // .replace(/(-\d{2})(\d)/, '$0-$9')
  // .replace(/(-\d{2})\d+?$/, '$9');
};

const buyerPhone = ref("");

watch(buyerPhone, (newVal) => {
  buyerPhone.value = formatPhone(newVal);
});

interface NewDetail {
  id: string;
  date: string;
  photo: string;
  tag: string;
  title: string;
  description: string;
}

const route = useRoute();
const newItem = ref<NewDetail | null>(null);
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
    if (!route.params.id || typeof route.params.id !== "string") {
      throw new Error("Неверный ID мероприятия");
    }

    const docRef = doc(db, "news", route.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      newItem.value = {
        id: docSnap.id,
        date: data?.date || "Без названия",
        tag: data?.tag || "Другое",
        title: data?.title || "Название не указано",
        description: data?.description || "Текст не указан",
        photo: data?.photo || "default.jpg",
      };
    } else {
      throw new Error("Новость не найдена");
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Произошла неизвестная ошибка";
    console.error("Ошибка загрузки:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <Header />
  <main class="new">
    <div v-if="isLoading" class="loading">
      <h2>Загрузка мероприятия...</h2>
    </div>

    <div v-else-if="error" class="error">
      <h2>{{ error }}</h2>
      <router-link to="/posters" class="back-link"> ← Вернуться к афише </router-link>
    </div>

    <div v-else-if="newItem" class="new__container">
      <div class="new__container__header">
        <router-link to="/" class="back-link">
          <h1>Главная</h1>
          <img src="../../../public/news/right.svg" alt="" />
        </router-link>
        <router-link to="/news" class="back-link">
          <h1>Новости</h1>
          <img src="../../../public/news/right.svg" alt="" />
        </router-link>
        <h1>{{ newItem.title }}</h1>
      </div>
      <div class="new__container__content">
        <img :src="`/imagesFirebase/news/${newItem.photo}`" alt="" />

        <div class="info-tag">
          <p>{{ newItem.tag }}</p>
        </div>

        <div class="info-title">
          <p>{{ newItem.title }}</p>
        </div>

        <div class="info-date">
          <img src="../../../public/news/date.svg" alt="" />
          <p>{{ newItem.date }}</p>
        </div>
      </div>
      <div class="new__container__description">
        <h1>О событии</h1>
        <p>{{ newItem.description }}</p>
      </div>
    </div>
  </main>
  <Footer />
</template>
<style scoped>
@import "./newDetail.scss";
</style>
