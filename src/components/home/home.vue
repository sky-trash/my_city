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
    <article class="main__photo">
      <img src="../../../public/home/photo/1651878592_12-celes-club-p-gorod-borisoglebsk-voronezhskoi-oblasti-kr-13.svg" alt="">
      <img src="../../../public/home/photo/1651878585_28-celes-club-p-gorod-borisoglebsk-voronezhskoi-oblasti-kr-31 (1).svg" alt="">
      <img id="photo3" src="../../../public/home/photo/pamyatnik-ushedshim-pokoleniyam.svg" alt="">
      <img src="../../../public/home/photo/borisoglebsk.svg" alt="">
      <button>
        <img src="../../../public/home/photo/camera-02.svg" alt="">
        <h1>Подделиться фото</h1>
      </button>
      <img src="../../../public/home/photo/408783.svg" alt="">
      <img src="../../../public/home/photo/caption.svg" alt="">
      <img src="../../../public/home/photo/1651878599_7-celes-club-p-gorod-borisoglebsk-voronezhskoi-oblasti-kr-8.svg" alt="">
      <img src="../../../public/home/photo/v0rpwo9balc.svg" alt="">
      <img src="../../../public/home/photo/1651878623_31-celes-club-p-gorod-borisoglebsk-voronezhskoi-oblasti-kr-34 (1).svg" alt="">
      <img src="../../../public/home/photo/1651878662_34-celes-club-p-gorod-borisoglebsk-voronezhskoi-oblasti-kr-37.svg" alt="">
    </article>
  </main>
  <Application />
</template>
<style scoped>
@import "./home.scss";
</style>