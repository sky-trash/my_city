<script setup>
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header />
  <main class="poster">
    <article class="poster__layout">
      <a href="/">
        <div class="poster__layout__home">
          <h1>Главная</h1>
          <img src="../../../public/poster/right.svg" alt="">
        </div>
      </a>
      <div class="poster__layout__text">
        <h1>Афиша</h1>
      </div>
    </article>
    <article class="poster__events">

    </article>
    <article class="poster__calendar">

    </article>
  </main>
  <Application />
  <Footer />
</template>
<style scoped>
@import "./poster.scss";
</style>
