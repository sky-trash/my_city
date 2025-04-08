<script setup lang="ts">
import Header from "../layout/header/header.vue"
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errMsg = ref()
const router = useRouter()

const login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Авторизация прошла успешно");

      console.log(auth.currentUser);

      router.push('/Profile');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Неправильный @email"
          break;
        case "auth/user-not-found":
          errMsg.value = "Не нашли аккаунт с таким email"
          break;
        case "auth/wrong-password":
          errMsg.value = "Неправильный пароль"
          break;
        default:
          errMsg.value = "Неправильный @email или пароль"
          break;
      }
    });
};

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
            <h1>Email</h1>
            <input type="email" v-model="email">
          </div>
          <div class="auth__content__form__input__password">
            <h1>Пароль</h1>
            <input type="password" v-model="password">
          </div>
          <div class="auth__content__form__input__text">
            <p>Используйте 6 или более символов, включая буквы, цифры и символы.</p>
          </div>
        </div>
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
        <div class="auth__content__form__button">
          <a href="/Register">
            <h1>Зарегистрироваться <br>в системе</h1>
          </a>
          <button @click="login">
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