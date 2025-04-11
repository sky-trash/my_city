<script setup>

import { useRouter } from "vue-router";
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { apps, db } from "../../main"

const errMsg = ref()
const router = useRouter()
const name = ref("")
const phone = ref("")
const title = ref("")

const applications = async () => {

  await addDoc(collection(db, 'applications'), {
    name: name.value,
    phone: phone.value,
    title: title.value,
  })
  .then((data) => {
    errMsg.value = "Заявка отправлена"
    router.push('/')
  })
}
</script>
<template>
  <main class="main__application">
    <article class="main__application__text">
      <h1>Есть чем поделиться? <br>Пишите!</h1>
    </article>
    <article class="main__application__form">
      <div class="main__application__form__input">
        <div class="main__application__form__input__block">
          <div class="main__application__form__input__block__card">
            <h1>Ваше имя</h1>
            <input 
            type="text"
            placeholder="Введите имя"
            v-model="name"
            >
          </div>
          <div class="main__application__form__input__block__card">
            <h1>Телефон</h1>
            <input
            type="number"
            placeholder="7 999 999 99 99"
            v-model="phone"
            >
          </div>
          <div class="main__application__form__input__block__card">
            <h1>Сообщение</h1>
            <input
            type="text"
            placeholder="Введите сообщение..."
            v-model="title"
            >
          </div>
          <div class="main__application__form__input__block__buuton">
            <button
            name="submit"
            @click="applications"
            >
              <h1>Отправить</h1>
            </button>
          </div>
        </div>
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
        <div class="main__application__form__input__text">
          <h1>Нажимая кнопку «Отправить», вы соглашаетесь с условиями политики конфиденциальности</h1>
        </div>
      </div>
    </article>
  </main>
</template>
<style scoped>
@import "./application.scss";
</style>