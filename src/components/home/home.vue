<script setup>
import Application from '../application/application.vue';
</script>
<template>
  <main class="main">
    <article class="main__news">
      <div class="main__news__navbar">
        <div class="main__news__navbar__all">
          <h1>Все новости</h1>
        </div>
        <div class="main__news__navbar__more">
          <a href="/News">
            <h1>Подробнее</h1>
            <img src="../../../public/home/right.svg" alt="">
          </a>
        </div>
      </div>
      <div class="main__news__content">
        <div>

        </div>
      </div>
    </article>
    <article class="main__cause">
      <img id="image-cause" src="../../../public/home/cause.svg" alt="">
      <div class="main__cause__content">
        <div class="main__cause__content__text">
          <h1>5 весомых причин<br> переехать в Борисоглебск</h1>
        </div>
        <div class="main__cause__content__five">
          <div class="main__cause__content__five__cause">
            <img src="../../../public/home/story.svg" alt="">
            <h1>Историчесий город</h1>
          </div>
          <div class="main__cause__content__five__cause">
            <img src="../../../public/home/work.svg" alt="">
            <h1>Возможность трудоустройства</h1>
          </div>
          <div class="main__cause__content__five__cause">
            <img src="../../../public/home/life.svg" alt="">
            <h1>Жилье</h1>
          </div>
          <div class="main__cause__content__five__cause">
            <img src="../../../public/home/rest.svg" alt="">
            <h1>Возможность для отдыха</h1>
          </div>
          <div class="main__cause__content__five__cause">
            <img src="../../../public/home/children.svg" alt="">
            <h1>Объекты для детей</h1>
          </div>
        </div>
        <div class="main__cause__content__button">
          <button>
            <h1>Подробнее</h1>
            <img src="../../../public/home/right-cause.svg" alt="">
          </button>
        </div>
      </div>
    </article>
    <article class="main__map">

    </article>
    <article class="main__numbers">
      <div class="main__numbers__text">
        <h1>Борисоглебск в цифрах</h1>
      </div>
      <div class="main__numbers__content">
        <div class="main__numbers__content__card">
          <h1>60 687</h1>
          <p>человек численность населения</p>
        </div>
        <div class="main__numbers__content__card">
          <h1>113</h1>
          <p>памятников культуры и архитектуры</p>
        </div>
        <div class="main__numbers__content__card">
          <h1>25</h1>
          <p>количество ВУЗов и СУЗов</p>
        </div>
      </div>
    </article>
  </main>
  <Application />
</template>
<style scoped>
@import "./home.scss";
</style>