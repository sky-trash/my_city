<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggenIn = ref(false);
const isAuth = ref(true);

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuth.value = false;
    } else {
      isAuth.value = true;
    }
  });
});

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggenIn.value = true;
    } else {
      isLoggenIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
<template>
  <header class="header">
    <article class="header__up">
      <div class="header__up__city">
        <router-link to="/Directory">
          <h1>Работа в Борисоглебске</h1>
        </router-link>
        <router-link to="/Directory">
          <h1>Жилье в Борисоглебске</h1>
        </router-link>
        <router-link to="/Contact">
          <h1>Наши контакты</h1>
        </router-link>
      </div>
      <div class="header__up__site">
        <router-link to="/Directory">
          <div class="header__up__site__searth">
            <img src="../../../../public/header/search.svg" alt="">
            <h1>Поиск по сайту</h1>
          </div>
        </router-link>
        <router-link to="/Auth" v-if="isAuth">
          <div class="header__up__site__auth">
            <img src="../../../../public/header/login.svg" alt="">
            <h1>Вход</h1>
          </div>
        </router-link>
        <router-link to="/Profile" v-if="isLoggenIn">
          <div class="header__up__site__profile">
            <img src="../../../../public/header/login.svg" alt="">
            <h1>Профиль</h1>
          </div>
        </router-link>
        <a @click="handleSignOut" v-if="isLoggenIn">
          <div class="header__up__site__out">
            <img src="../../../../public/header/login.svg" alt="">
            <h1>Выход</h1>
          </div>
        </a>
      </div>
    </article>
    <router-link to="/">
      <article class="header__logo">
        <img src="../../../../public/header/logo.svg" alt="">
      </article>
    </router-link>
    <article class="header__navbar">
      <div class="header__navbar__menu">
        <router-link to="/">
          <img src="../../../../public/header/burger.svg" alt="">
          <h1>Меню</h1>
        </router-link>
      </div>
      <div class="header__navbar__navigation">
        <router-link to="/News">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Городские новости</h1>
        </router-link>
        <router-link to="/Posters">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Афиша</h1>
        </router-link>
        <!-- <router-link to="/City">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Родной город</h1>
        </router-link> -->
        <router-link to="/Directory">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Справочник</h1>
        </router-link>
        <router-link to="/Attraction">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Достопремичательности</h1>
        </router-link>
      </div>
    </article>
  </header>
</template>
<style lang="scss" scoped>
@import "./header.scss";
</style>
