<script setup>
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';

import { collection, onSnapshot, query } from "firebase/firestore";
import { apps, db } from "../../main"
import { ref } from "vue"


const posters = ref([]);

function withdrawalPosters() {
  const PostersQuery = query(collection(db, 'posters'));
  onSnapshot(PostersQuery, (snapshot) => {
    posters.value = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      tag: doc.data().tag,
      price: doc.data().price,
      date: doc.data().date,
      address: doc.data().address,
      photo: doc.data().photo || [],
    }));
  });
}

withdrawalPosters();

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
      <div class="poster__events__text">
        <h1>Все события</h1>
      </div>
      <div class="poster__events__content">
        <a href="#"           
        v-for="poster in posters"
        :key="poster.id">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img :src="`/imagesFirebase/posters/${poster.photo}`" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>{{ poster.tag }}</h1>
                <h2>от {{ poster.price }} ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>{{ poster.title }}</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>{{ poster.date }}, {{  poster.address }}</p>
              </div>
            </div>
          </div>
        </a>
        <!-- <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events2.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Кино</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Оппенгеймер</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events3.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Кино</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Повелитель ветра</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events4.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Театр</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Шедевры мировой оперы и рок-оперы.</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events5.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Концерты</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Северный флот</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events6.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Концерты</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Расул Чабдаров</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events7.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Театр</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Герой ашего времени</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events8.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Театр</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Бременские музыканты</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="poster__events__content__card">
            <div class="poster__events__content__card__icons">
              <img src="../../../public/poster/events/events9.svg" alt="">
            </div>
            <div class="poster__events__content__card__info">
              <div class="poster__events__content__card__info__tag">
                <h1>Кино</h1>
                <h2>от 400 ₽</h2>
              </div>
              <div class="poster__events__content__card__info__text">
                <h1>Неудержимые 4</h1>
              </div>
              <div class="poster__events__content__card__info__time">
                <p>4 октября К2, Советская ул., 80</p>
              </div>
            </div>
          </div>
        </a> -->
      </div>
      <!-- <div class="poster__events__button">
        <button>
          <h1>Показать еще</h1>
        </button>
      </div> -->
    </article>
    <!-- <article class="poster__calendar">

    </article> -->
  </main>
  <Application />
  <Footer />
</template>
<style scoped>
@import "./poster.scss";
</style>
