<script setup>
  import Header from '../layout/header/header.vue';
  import Application from '../application/application.vue';
  import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header/>
  <main class="news">
    <article class="news__layout">
      <a href="/">
        <div class="news__layout__home">
          <h1>Главная</h1>
          <img src="../../../public/news/right.svg" alt="">
        </div>
      </a>
      <div class="news__layout__text">
        <h1>Городские новости</h1>
      </div>
    </article>
    <article class="news__events">

    </article>
  </main>
  <Application/>
  <Footer/>
</template>
<style>
  @import "./news.scss";
</style>