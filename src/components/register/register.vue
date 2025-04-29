<script setup lang="ts">
import Header from '../layout/header/header.vue';
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../main";

const errMsg = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const name = ref<string>("");
const surname = ref<string>("");
const router = useRouter();
const auth = getAuth();
const isLoading = ref<boolean>(false);

// Список email-адресов администраторов
const ADMIN_EMAILS = ['admin@example.com', 'superuser@example.com'];

const validateForm = (): boolean => {
  if (!email.value || !password.value || !name.value || !surname.value) {
    errMsg.value = "Все поля обязательны для заполнения";
    return false;
  }

  if (password.value.length < 6) {
    errMsg.value = "Пароль должен содержать минимум 6 символов";
    return false;
  }

  return true;
};

const register = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errMsg.value = "";

  try {
    // 1. Создаем пользователя в Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // 2. Проверяем, является ли email администраторским
    const isAdmin = ADMIN_EMAILS.includes(email.value);

    // 3. Создаем документ пользователя в Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: name.value,
      surname: surname.value,
      email: email.value,
      role: isAdmin, // true для админов, false для обычных пользователей
      phone: '',
      userId: user.uid,
      createdAt: new Date(),
      lastLogin: new Date()
    });

    // 4. Перенаправляем на соответствующую страницу
    router.push(isAdmin ? '/admin' : '/profile');
    
  } catch (error: any) {
    console.error("Ошибка регистрации:", error);
    handleRegistrationError(error);
  } finally {
    isLoading.value = false;
  }
};

const handleRegistrationError = (error: any) => {
  switch (error.code) {
    case "auth/invalid-email":
      errMsg.value = "Некоректный email";
      break;
    case "auth/email-already-in-use":
      errMsg.value = "Аккаунт с таким email уже существует";
      break;
    case "auth/weak-password":
      errMsg.value = "Пароль должен содержать минимум 6 символов";
      break;
    default:
      errMsg.value = "Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.";
      break;
  }
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
            <div class="register__content__form__input__name-login__name">
              <h1>Имя</h1>
              <input
                type="text"
                v-model="name"
                required
                placeholder="Имя"
              >
            </div>
            <div class="register__content__form__input__name-login__login">
              <h1>Фамилия</h1>
              <input
                type="text"
                v-model="surname"
                required
                placeholder="Фамилия"
              >
            </div>
          </div>

          <div class="register__content__form__input__email">
            <h1>Email</h1>
            <input
              type="email"
              v-model="email"
              required
              placeholder="example@mail.com"
            >
          </div>

          <div class="register__content__form__input__passwords">
            <div class="register__content__form__input__passwords__password">
              <h1>Пароль</h1>
              <input
                type="password"
                v-model="password"
                required
                minlength="6"
                placeholder="Не менее 6 символов"
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
            :disabled="isLoading"
          >
            <p v-if="!isLoading">Создать аккаунт</p>
            <p v-else>Создание...</p>
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
