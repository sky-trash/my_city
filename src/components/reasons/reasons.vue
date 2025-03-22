<script setup>
import Header from '../layout/header/header.vue';
</script>
<template>
  <Header />
  <main class="reasons">
    <article class="reasons__layout">
      <div class="reasons__layout__home">
        <a href="/">
          <h1>Главная</h1>
          <img src="../../../public/reasons/right.svg" alt="">
        </a>
      </div>
      <div class="reasons__layout__text">
        <h1>5 Причин переехать в борисоглбеск</h1>
      </div>
    </article>
    <article class="reasons__home">
      <img src="../../../public/reasons/home.svg" alt="">
      <p>Если вы задумались о переезде и ищете идеальное место для проживания, обратите внимание на небольшой уютный
        город Борисоглебск в Воронежской области. Город и 24 сельских населённых пункта составляют единое муниципальное
        образование – Борисоглебский городской округ. В Борисоглебске проживает около 65 тысяч человек, все ключевые
        элементы инфраструктуры находятся в пешей доступности. Жизнь в Борисоглебске даёт множество преимуществ по
        сравнению с городами-миллионниками.</p>
    </article>
    <article class="reasons__events">
      <div class="reasons__events__card">
        <div class="reasons__events__card__text">
          <h1>1. Благоприятное географическое местоположение</h1>
        </div>
        <div class="reasons__events__card__content">
          <div class="reasons__events__card__content__description">
            <img src="../../../public/reasons/events1/events1.svg" alt="">
            <div class="reasons__events__card__content__description__up">
              <h1>Центр пересечения 4 областей</h1>
              <p>Борисоглебск расположен на востоке Центрального Федерального округа, на пересечении четырёх областей: Воронежской, Саратовской, Тамбовской и Волгоградской. Удобна географическая удалённость Борисоглебска от областных центров.</p>
            </div>
            <div class="reasons__events__card__content__description__button">
              <h1>Высокая значимость для регионов</h1>
              <p>Через город проходят крупные сухопутные и железнодорожные транспортные артерий, такие как «Воронеж-Саратов», «Москва-Волгоград», железная дорога (участок ЮВЖД «Москва-Волгоград»). Это обуславливает особую значимость Борисоглебска для прилегающих территорий.</p>
            </div>
          </div>
          <div class="reasons__events__card__content__icons">
            <div class="reasons__events__card__content__icons__line">
              <img src="../../../public/reasons/line.svg" alt="">
              <p>1370,91 км2</p>
            </div>
            <div class="reasons__events__card__content__icons__map">
              <img src="../../../public/reasons/events1/map.svg" alt="">
            </div>
            <div class="reasons__events__card__content__icons__plochad">
              <p>Площадь территории округа</p>
            </div>
          </div>
        </div>
      </div>
      <div class="reasons__events__card">

      </div>
      <div class="reasons__events__card">

      </div>
      <div class="reasons__events__card">

      </div>
      <div class="reasons__events__card">

      </div>
    </article>
  </main>
</template>
<style scoped>
@import "./reasons.scss";
</style>