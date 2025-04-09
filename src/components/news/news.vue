<script setup lang="ts">
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';

import { collection, onSnapshot, query } from "firebase/firestore";
import { apps, db } from "../../main"
import { ref } from "vue"


const news = ref([]);

function withdrawalNews() {
  const NewsQuery = query(collection(db, 'news'));
  onSnapshot(NewsQuery, (snapshot) => {
    news.value = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      tag: doc.data().tag,
      date: doc.data().date,
      photo: doc.data().photo || [],
    }));
  });
}

withdrawalNews();

// export default {

// data() {
//   return {
//     news: [],
//   };
// },
// methods: {
//   withdrawalNews: function () {
//     const NewsQuery = query(collection(db, "news"));

//     onSnapshot(NewsQuery, (snapshot) => {
//       this.news = snapshot.docs.map(doc => {
//         return {
//           id: doc.id,
//           title: doc.data().title,
//           tag: doc.data().tag,
//           image: doc.data().image || "",
//         }
//       })
//     })
//   },
// },
// mounted() {
//   this.withdrawalNews()
// },
// }

</script>
<template>
  <Header />
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
      <div class="news__events__text">
        <h1>Все события</h1>
      </div>
      <div class="news__events__content">
        <a 
        href="#"           
        v-for="newsis in news"
        :key="newsis.id"
        >
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img :src="`/imagesFirebase/news/${newsis.photo}`" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>{{ newsis.tag }}</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>{{ newsis.title }}</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>{{ newsis.date }}</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <!-- <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events2.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>История одного города</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>История Теллермаовского леса. Часть 1</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events2.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>История одного города</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>История Теллермаовского леса. Часть 2</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events3.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>Спорт</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>Борисоглебские спортсменки в финале </h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events4.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>Спорт</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>Нападающий ФК «Кристал-МЭ3» о матче с главными соперниками</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events5.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>Общество</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>С Днём войск гражданской бороны МЧС России!</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events6.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>Культура</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>Борисоглебский кадет выступит в Москвена гала - концерте</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events7.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>Общество</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>Дошколята побывали гостях у пожарных!</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a>
        <a href="#">
          <div class="news__events__content__card">
            <div class="news__events__content__card__icons">
              <img src="../../../public/news/events/events8.svg" alt="">
            </div>
            <div class="news__events__content__card__info">
              <div class="news__events__content__card__info__tag">
                <h1>Общество</h1>
              </div>
              <div class="news__events__content__card__info__text">
                <h1>Подборка мероприятий на выходные</h1>
              </div>
              <div class="news__events__content__card__info__time">
                <p>Вчера, 23:56</p>
                <img src="../../../public/news/ear.svg" alt="">
                <p>546</p>
              </div>
            </div>
          </div>
        </a> -->
      </div>
      <!-- <div class="news__events__button">
        <button>
          <h1>Показать еще</h1>
        </button>
      </div> -->
    </article>
  </main>
  <Application />
  <Footer />
</template>
<style>
@import "./news.scss";
</style>