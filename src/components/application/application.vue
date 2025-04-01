<script setup>

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
            name="name"
            placeholder="Введите имя"
            >
          </div>
          <div class="main__application__form__input__block__card">
            <h1>Телефон</h1>
            <input
            type="number"
            name="phone"
            placeholder="7 999 999 99 99"
            >
          </div>
          <div class="main__application__form__input__block__card">
            <h1>Сообщение</h1>
            <input
            type="text"
            name="text"
            placeholder="Введите сообщение..."
            >
          </div>
          <div class="main__application__form__input__block__buuton">
            <button
            name="submit"
            >
              <h1>Отправить</h1>
            </button>
          </div>
        </div>
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