<script setup>
import Header from "../layout/header/header.vue"
</script>
<template>
  <Header />
  <main class="auth">
    <div class="auth__content">
      <div class="auth__content__form">
        <div class="auth__content__form__create">
          <h1>Войдите в свой аккаунт</h1>
          <p>Еще нет аккаунта?<a href="/Register">Зарегистрироваться</a></p>
        </div>
        <div class="auth__content__form__input">
          <div class="auth__content__form__input__login">
            <h1>Login</h1>
            <input 
            type="text" 
            name="login"
            >
          </div>
          <div class="auth__content__form__input__password">
            <h1>Пароль</h1>
            <input 
            type="password" 
            name="password"
            >
          </div>
          <div class="auth__content__form__input__text">
            <p>Используйте 8 или более символов, включая буквы, цифры и символы.</p>
          </div>
        </div>
        <div class="auth__content__form__button">
          <a href="/Register">
            <h1>Зарегистрироваться <br>в системе</h1>
          </a>
          <button>
            <p>Войти в аккаунт</p>
          </button>
        </div>
      </div>
      <div class="auth__content__icons">
        <img src="../../../public/auth-register/Illustration.svg" alt="">
      </div>
    </div>
  </main>
</template>
<style scoped>
@import "./auth.scss";
</style>