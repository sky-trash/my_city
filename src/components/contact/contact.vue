<script setup>
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header />
  <main class="contact">
    <article class="contact__layout">
      <a href="/">
        <h1>Главная</h1>
        <img src="../../../public/contact/right.svg" alt="">
      </a>
    </article>
    <article class="contact__content">
      <div class="contact__content__text">
        <div class="contact__content__text__word">
          <p>Слово редактора</p>
        </div>
        <div class="contact__content__text__reader">
          <h1>Уважаемые читатели!</h1>
          <h1>Мы рады приветствовать вас на страницах нашего издания — СМИ «Мой Борисоглебск». Ваше доверие и поддержка
            значат для нас многое.</h1>
          <h2>В наше время информации мы понимаем, насколько важно иметь доступ к достоверной и качественной информации.
            Мы обязуемся продолжать работать на благо нашего сообщества, предоставляя вам актуальные новости
            и интересный контент.</h2>
          <h2>Мы стремимся к высоким стандартам журналистики, подлинности и объективности в нашей работе.
            Мы также всегда готовы к обратной связи от вас, наших читателей. Ваши мнения, предложения и замечания
            помогают нам становиться лучше.</h2>
          <h2>Спасибо за вашу поддержку и веру в нас. Мы гордимся тем, что служим вам, нашим читателям, и с нетерпением
            ждём вашей обратной связи и предложений.</h2>
        </div>
        <div class="contact__content__text__icons">
          <img src="../../../public/contact/signature.svg" alt="">
        </div>
      </div>
      <div class="contact__content__icons">
        <img src="../../../public/contact/me.jpeg" alt="">
      </div>
    </article>
    <article class="contact__teams">
      <div class="contact__teams__text">
        <h1>Наша команда</h1>
      </div>
      <div class="contact__teams__card">
        <div class="contact__teams__card__icons">
          <img src="../../../public/contact/teams.jpeg" alt="">
        </div>
        <div class="contact__teams__card__name">
          <h1>Матвеев Е.И.</h1>
        </div>
        <div class="contact__teams__card__description">
          <h1>Главный редактор и разработчик</h1>
          <p>СМИ «Мой Борисоглебск»</p>
        </div>
        <div class="contact__teams__card__email">
          <a>
            <p>bskone@gmail.com</p>
          </a>
        </div>
      </div>
    </article>
  </main>
  <Application />
  <Footer />
</template>
<style scoped>
@import "./contact.scss";
</style>