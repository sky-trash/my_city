<script setup>
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header />
  <main class="directory">
    <article class="directory__layout">
      <router-link to="/">
        <div class="directory__layout__home">
          <h1>Главная</h1>
          <img src="../../../public/directory/right.svg" alt="">
        </div>
      </router-link>
      <div class="directory__layout__text">
        <h1>Справочник</h1>
      </div>
    </article>
    <article class="directory__content">
      <div class="directory__content__enterprises">
        <a href="" id="state">
          <div class="directory__content__enterprises__text">
            <p>Государственные учереждения</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Школы</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Детские сады</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Здоровье</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Споркомплексы</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Заводы и предприятия</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Торговые центры</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Предприятия ЖКХ</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
        <a href="#">
          <div class="directory__content__enterprises__text">
            <p>Отдых</p>
            <img src="../../../public/directory/enterprises/right.svg" alt="">
          </div>
        </a>
      </div>
      <div class="directory__content__events">

      </div>
    </article>
  </main>
  <Application />
  <Footer />
</template>
<style scoped>
@import "./directory.scss";
</style>
