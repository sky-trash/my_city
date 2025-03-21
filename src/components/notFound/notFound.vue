<script setup>
import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header />
  <main class="notFound">
    <div class="notFound__error">
      <div class="notFound__error__404">
        <p>Ошибка 404</p>
      </div>
      <div class="notFound__error__text">
        <p>Такая страница не найдена</p>
      </div>
      <div class="notFound__error__button">
        <a href="/">
          <button>
            <p>На главную</p>
          </button>
        </a>
      </div>
    </div>
  </main>
  <Footer />
</template>
<style scoped>
@import "./notFound.scss";
</style>