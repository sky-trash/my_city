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
        <a href="/Directory">
          <h1>Работа в Борисоглебске</h1>
        </a>
        <a href="/Directory">
          <h1>Жилье в Борисоглебске</h1>
        </a>
        <a href="/Contact">
          <h1>Наши контакты</h1>
        </a>
      </div>
      <div class="header__up__site">
        <a href="/Directory">
          <div class="header__up__site__searth">
            <img src="../../../../public/header/search.svg" alt="">
            <h1>Поиск по сайту</h1>
          </div>
        </a>
        <a href="/Auth" v-if="isAuth">
          <div class="header__up__site__auth">
            <img src="../../../../public/header/login.svg" alt="">
            <h1>Вход</h1>
          </div>
        </a>
        <a href="/Profile" v-if="isLoggenIn">
          <div class="header__up__site__profile">
            <img src="../../../../public/header/login.svg" alt="">
            <h1>Профиль</h1>
          </div>
        </a>
        <a @click="handleSignOut" v-if="isLoggenIn">
          <div class="header__up__site__out">
            <img src="../../../../public/header/login.svg" alt="">
            <h1>Выход</h1>
          </div>
        </a>
      </div>
    </article>
    <a href="/">
      <article class="header__logo">
        <img src="../../../../public/header/logo.svg" alt="">
      </article>
    </a>
    <article class="header__navbar">
      <div class="header__navbar__menu">
        <a href="/">
          <img src="../../../../public/header/burger.svg" alt="">
          <h1>Меню</h1>
        </a>
      </div>
      <div class="header__navbar__navigation">
        <a href="/News">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Городские новости</h1>
        </a>
        <a href="/Posters">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Афиша</h1>
        </a>
        <!-- <a href="/City">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Родной город</h1>
        </a> -->
        <a href="/Directory">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Справочник</h1>
        </a>
        <a href="/Attraction">
          <img src="../../../../public/header/active-elip.svg" alt="">
          <h1>Достопремичательности</h1>
        </a>
      </div>
    </article>
  </header>
</template>
<style lang="scss" scoped>
@import "./header.scss";
</style>