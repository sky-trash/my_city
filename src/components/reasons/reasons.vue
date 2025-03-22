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
      <div class="reasons__events__one">
        <div class="reasons__events__one__text">
          <h1>1. Благоприятное географическое местоположение</h1>
        </div>
        <div class="reasons__events__one__content">
          <div class="reasons__events__one__content__description">
            <img src="../../../public/reasons/events1/events1.svg" alt="">
            <div class="reasons__events__one__content__description__up">
              <h1>Центр пересечения 4 областей</h1>
              <p>Борисоглебск расположен на востоке Центрального Федерального округа, на пересечении четырёх областей:
                Воронежской, Саратовской, Тамбовской и Волгоградской. Удобна географическая удалённость Борисоглебска
                от областных центров.</p>
            </div>
            <div class="reasons__events__one__content__description__button">
              <h1>Высокая значимость для регионов</h1>
              <p>Через город проходят крупные сухопутные и железнодорожные транспортные артерий, такие
                как «Воронеж-Саратов», «Москва-Волгоград», железная дорога (участок ЮВЖД «Москва-Волгоград»).
                Это обуславливает особую значимость Борисоглебска для прилегающих территорий.</p>
            </div>
          </div>
          <div class="reasons__events__one__content__icons">
            <div class="reasons__events__one__content__icons__line">
              <img src="../../../public/reasons/line.svg" alt="">
              <p>1370,91 км2</p>
            </div>
            <div class="reasons__events__one__content__icons__map">
              <img src="../../../public/reasons/events1/map.svg" alt="">
            </div>
            <div class="reasons__events__one__content__icons__plochad">
              <p>Площадь территории округа</p>
            </div>
          </div>
        </div>
      </div>
      <div class="reasons__events__two">
        <div class="reasons__events__two__text">
          <h1>2. Богатая история и культурное наследие</h1>
        </div>
        <div class="reasons__events__two__content">
          <div class="reasons__events__two__content__description">
            <div class="reasons__events__two__content__description__flex">
              <img src="../../../public/reasons/events2/events2-1.svg" alt="">
              <img src="../../../public/reasons/events2/events2-2.svg" alt="">
            </div>
            <div class="reasons__events__two__content__description__up">
              <h1>Бесконечный лес</h1>
              <p>Борисоглебск расположен на левобережье реки Ворона, в местах её впадения в Хопёр – одной из самых
                чистых рек Европы, на краю Теллермановского леса. Этот мощный массив ещё в древности называли
                «бесконечным лесом».</p>
            </div>
            <div class="reasons__events__two__content__description__button">
              <h1>Борисоглебск имеет богатую историю</h1>
              <p>Город является членом Союза исторических городов России со значительным историко-архитектурным
                наследием. Археологические находки свидетельствуют о том, что борисоглебская земля была обжита людьми
                ещё в ХII-Х в. до н.э.</p>
            </div>
          </div>
          <div class="reasons__events__two__content__icons">
            <div class="reasons__events__two__content__icons__up">
              <img src="../../../public/reasons/line.svg" alt="">
              <div class="reasons__events__two__content__icons__up__img">
                <h1>1698</h1>
                <img src="../../../public/reasons/events2/calendar.svg" alt="">
              </div>
              <div class="reasons__events__two__content__icons__up__text">
                <p>Дата снования города</p>
              </div>
            </div>
            <div class="reasons__events__two__content__icons__button">
              <img src="../../../public/reasons/line.svg" alt="">
              <div class="reasons__events__two__content__icons__button__img">
                <h1>138</h1>
                <img src="../../../public/reasons/events2/monument.svg" alt="">
              </div>
              <div class="reasons__events__two__content__icons__button__text">
                <p>Количество памятников культуры и архитектуры</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reasons__events__three">

      </div>
      <div class="reasons__events__four">

      </div>
      <div class="reasons__events__five">

      </div>
    </article>
  </main>
</template>
<style scoped>
@import "./reasons.scss";
</style>