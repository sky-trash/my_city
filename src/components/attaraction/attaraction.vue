<script setup>
  import Header from '../layout/header/header.vue';
  import Application from '../application/application.vue';
  import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header/>
  <main class="attaraction">
    <article class="attaraction__layout">
      <div class="attaraction__layout__home">
        <a href="/">
          <h1>Главная</h1>
          <img src="../../../public/attaraction/right.svg" alt="">
        </a>
      </div>
      <div class="attaraction__layout__text">
        <h1>Достопремичательности</h1>
      </div>
    </article>
    <article class="attaraction__events">
      <div class="attaraction__events__all">
        <h1>Все достопремичательности</h1>
      </div>
      <div class="attaraction__events__content">
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events1.svg" alt="">
          <p>Городской парк культуры и отдыха</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events2.svg" alt="">
          <p>Знаменский кафедральный собор</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events3.svg" alt="">
          <p>Церковь Бориса и Глеба</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events4.svg" alt="">
          <p>Храм Казанской иконы Божией Матери</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events5.svg" alt="">
          <p>Хоперский заповедник</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events6.svg" alt="">
          <p>Храм Казанской иконы Божией Матери</p>
        </div>
        <!-- <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events1.svg" alt="">
          <p>Городской парк культуры и отдыха</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events2.svg" alt="">
          <p>Знаменский кафедральный собор</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events3.svg" alt="">
          <p>Церковь Бориса и Глеба</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events4.svg" alt="">
          <p>Храм Казанской иконы Божией Матери</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events5.svg" alt="">
          <p>Хоперский заповедник</p>
        </div>
        <div class="attaraction__events__content__card">
          <img src="../../../public/attaraction/events6.svg" alt="">
          <p>Храм Казанской иконы Божией Матери</p>
        </div> -->
      </div>
    </article>
  </main>
  <Application/>
  <Footer/>
</template>
<style scoped>
  @import "./attaraction.scss";
</style>
