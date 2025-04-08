<script setup lang="ts">
import Header from '../layout/header/header.vue';

import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const errMsg = ref()
const email = ref("");
const password = ref("");
const name = ref("");
const surname = ref("");
const router = useRouter()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
    console.log("Регистрация прошла успешно")
    router.push('/Profile')
  })
  .catch((error) => {
    console.log(error.code);
    switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Неправильный @email"
          break;
        case "auth/user-not-found":
          errMsg.value = "Аккаунт с таким @email уже существует"
          break;
        case "auth/wrong-password":
          errMsg.value = "В пароле должно использоваться 6 символов"
          break;
        default:
          errMsg.value = "Аккаунт с таким @email уже существует"
          break;
      }
  })
};
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
              <h1>Email</h1>
              <input 
              type="email"
              v-model="email"
              >
            </div>
            <div class="register__content__form__input__name-login__name">
              <h1>Имя</h1>
              <input 
              type="text"
              v-model="name"
              >
            </div>
          </div>
          <div class="register__content__form__input__email">
            <h1>Фамилия</h1>
            <input
            type="text"
            v-model="surname"
            >
          </div>
          <div class="register__content__form__input__passwords">
            <div class="register__content__form__input__passwords__password">
              <h1>Пароль</h1>
              <input 
              type="password"
              v-model="password"
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
            <p>Используйте 6 или более символов, включая буквы, цифры и символы.</p>
          </div>
        </div>
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
        <div class="register__content__form__button">
          <a href="/Auth">
            <h1>Войти в систему</h1>
          </a>
          <button
          @click="register"
          >
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