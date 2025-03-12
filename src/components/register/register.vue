<script setup>
import Header from '../layout/header/header.vue';
</script>
<template>
  <Header/>
  <main class="register">
    <div class="register__content">
      <div class="register__content__form">
        <div class="register__content__form__create">
          <h1>Создайте свой аккаунт</h1>
          <p>Уже есть аккаунт?<a href="/Auth">Войти</a></p>
        </div>
        <div class="register__content__form__input">
          <div class="register__content__form__input__name-login">
            <div class="register__content__form__input__name-login__login">
              <h1>Login</h1>
              <input 
              type="text"
              name="login"
              >
            </div>
            <div class="register__content__form__input__name-login__name">
              <h1>Имя</h1>
              <input 
              type="text"
              name="name"
              >
            </div>
          </div>
          <div class="register__content__form__input__email">
            <h1>Email</h1>
            <input
            type="email"
            name="email"
            >
          </div>
          <div class="register__content__form__input__passwords">
            <div class="register__content__form__input__passwords__password">
              <h1>Пароль</h1>
              <input 
              type="password"
              name="password"
              >
            </div>
            <div class="register__content__form__input__passwords__repassword">
              <h1>Повторите пароль</h1>
              <input 
              type="password"
              name="repassword"
              >
            </div>
          </div>
          <div class="register__content__form__input__text">
            <p>Используйте 8 или более символов, включая буквы, цифры и символы.</p>
          </div>
        </div>
        <div class="register__content__form__button">
          <a href="/Auth">
            <h1>Войти в систему</h1>
          </a>
          <button>
            <p>Создать аккаунт</p>
          </button>
        </div>
      </div>
      <div class="register__content__icons">
        <img src="../../../public/auth-register/Illustration.svg" alt="">
      </div>
    </div>
  </main>
</template>
<style scoped>
  @import "./register.scss";
</style>