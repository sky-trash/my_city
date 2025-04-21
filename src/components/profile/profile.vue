<script setup lang="ts">
defineOptions({
  name: 'UserProfile'
})

import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../main";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

interface UserData {
  id: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  role?: string;
}

const auth = getAuth();
const currentUser = ref<User | null>(null);
const userData = ref<UserData | null>(null);
const authReady = ref(false);
const isLoading = ref(false);
const unsubscribeSnapshot = ref<() => void>();
const unsubscribeAuth = ref<() => void>();

// Отслеживаем состояние авторизации
onMounted(() => {
  unsubscribeAuth.value = onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    authReady.value = true;

    if (user) {
      await loadUserData(user.uid);
    } else {
      // Очищаем данные при выходе
      userData.value = null;
    }
  });
});

// Загрузка данных пользователя
async function loadUserData(uid: string) {
  isLoading.value = true;

  try {
    // Отписываемся от предыдущей подписки, если есть
    if (unsubscribeSnapshot.value) {
      unsubscribeSnapshot.value();
    }

    const userQuery = query(
      collection(db, 'users'),
      where('userId', '==', uid)
    );

    unsubscribeSnapshot.value = onSnapshot(userQuery, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserData[];

      if (docs.length > 0) {
        userData.value = docs[0];
      } else {
        console.warn('Данные пользователя не найдены');
        userData.value = null;
      }

      isLoading.value = false;
    });
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    isLoading.value = false;
  }
}

// Очистка подписок
onUnmounted(() => {
  if (unsubscribeSnapshot.value) {
    unsubscribeSnapshot.value();
  }
  if (unsubscribeAuth.value) {
    unsubscribeAuth.value();
  }
});
</script>

<template>
  <Header />
  <main class="profile">
    <!-- Состояние загрузки -->
    <template v-if="!authReady">
      <div class="loading-state">
        <p>Проверка авторизации...</p>
      </div>
    </template>

    <!-- Не авторизован -->
    <template v-else-if="!currentUser">
      <div class="auth-required">
        <p>Для просмотра профиля необходимо авторизоваться</p>
        <router-link to="/auth">Войти</router-link>
      </div>
    </template>

    <!-- Основной контент -->
    <template v-else>
      <!-- Загрузка данных -->
      <template v-if="isLoading">
        <div class="loading-state">
          <p>Загрузка данных профиля...</p>
        </div>
      </template>

      <!-- Данные профиля -->
      <template v-else>
        <article class="profile__icons">
          <img src="../../../public/profile/profile.svg" alt="Фон профиля">
          <div class="profile__icons__human">
            <img
              src="../../../public/profile/Pic.svg"
              alt="Аватар пользователя"
              v-if="userData"
            >
          </div>
        </article>

        <article class="profile__description">
          <template v-if="userData">
            <div class="profile__description__data">
              <div class="profile__description__data__name">
                <h1>{{ userData.name }} {{ userData.surname }}</h1>
              </div>
              <div class="profile__description__data__email">
                <p>{{ userData.email }}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="data-missing">
              <p>Данные профиля не найдены</p>
            </div>
          </template>

          <div class="profile__description__change">
            <router-link to="/Profile/edit">
              <button>
                <h1>Изменить</h1>
              </button>
            </router-link>
          </div>
        </article>

        <article class="profile__history">
          <div class="profile__history__content">
            <div class="profile__history__content__text">
              <img src="../../../public/profile/Ticket.svg" alt="Иконка билета">
              <h1>История</h1>
            </div>
            <div class="profile__history__content__display">
              <template v-if="false"> <!-- Замените на реальные данные -->
                <div
                  v-for="(item, index) in 5"
                  :key="index"
                  class="profile__history__content__display__card"
                >
                  <!-- Карточка истории -->
                </div>
              </template>
              <div v-else class="empty-history">
                <p>История пуста</p>
              </div>
            </div>
          </div>
        </article>
      </template>
    </template>
  </main>
  <Footer />
</template>

<style scoped>
@import "./profile.scss";

.loading-state,
.auth-required,
.data-missing,
.empty-history {
  text-align: center;
  padding: 2rem;
  color: var(--font-family);
}

.auth-required a {
  color: var(--font-family);
  text-decoration: underline;
}
</style>
