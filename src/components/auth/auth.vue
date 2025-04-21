<script setup lang="ts">
import Header from "../layout/header/header.vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const isLoading = ref(false);
const router = useRouter();
const auth = getAuth();

const validateForm = (): boolean => {
  if (!email.value || !password.value) {
    errMsg.value = "Все поля обязательны для заполнения";
    return false;
  }

  return true;
};

const login = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errMsg.value = "";

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("Авторизация прошла успешно", auth.currentUser);
    router.push('/Profile');
  } catch (error: any) {
    console.error("Ошибка авторизации:", error);

    switch (error.code) {
      case "auth/invalid-email":
        errMsg.value = "Некорректный email";
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
      default:
        errMsg.value = "Неверный email или пароль";
        break;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <Header />
  <main class="auth">
    <div class="auth__content">
      <div class="auth__content__form">
        <div class="auth__content__form__create">
          <h1>Войдите в свой аккаунт</h1>
          <p>Еще нет аккаунта?<router-link to="/Register">Зарегистрироваться</router-link></p>
        </div>
        <div class="auth__content__form__input">
          <div class="auth__content__form__input__login">
            <h1>Email</h1>
            <input
              type="email"
              v-model="email"
              required
              placeholder="example@mail.com"
            >
          </div>
          <div class="auth__content__form__input__password">
            <h1>Пароль</h1>
            <input
              type="password"
              v-model="password"
              required
              minlength="6"
              placeholder="Не менее 6 символов"
            >
          </div>
          <div class="auth__content__form__input__text">
            <p>Используйте 6 или более символов, включая буквы, цифры и символы.</p>
          </div>
        </div>
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
        <div class="auth__content__form__button">
          <router-link to="/Register">
            <h1>Зарегистрироваться <br>в системе</h1>
          </router-link>
          <button
            @click="login"
            :disabled="isLoading"
          >
            <p v-if="!isLoading">Войти в аккаунт</p>
            <p v-else>Вход...</p>
          </button>
        </div>
      </div>
      <div class="auth__content__icons">
        <img src="../../../public/auth-register/Illustration.svg" alt="Иллюстрация входа">
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "./auth.scss";
</style>
