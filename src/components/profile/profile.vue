<script setup>
import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';
</script>
<template>
  <Header />
  <main class="profile">
    <article class="profile__icons">
      <img src="../../../public/profile/profile.svg" alt="">
      <div class="profile__icons__human">
        <img src="../../../public/profile/Pic.svg" alt="">
      </div>
    </article>
    <article class="profile__description">
      <div class="profile__description__data">
        <div class="profile__description__data__name">
          <h1>Евгений M.</h1>
        </div>
        <div class="profile__description__data__login">
          <p>qwerty</p>
        </div>
        <div class="profile__description__data__email">
          <p>qwerty123@gmail.com</p>
        </div>
      </div>
      <div class="profile__description__change">
        <button>
          <h1>Изменить</h1>
        </button>
      </div>
    </article>
    <div class="profile__line">
      <img src="../../../public/profile/Line.svg" alt="">
    </div>
    <article class="profile__history">
      <div>

      </div>
    </article>
  </main>
  <Footer />
</template>
<style scoped>
@import "./profile.scss";
</style>