<script setup>

const copyUrlFallback = () => {
  const url = window.location.href;
  const textarea = document.createElement('textarea');
  textarea.value = url;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    alert(successful ? 'URL скопирован!' : 'Не удалось скопировать');
  } catch (err) {
    alert('Ошибка: ' + err);
  }

  document.body.removeChild(textarea);
};

</script>
<template>
  <footer class="footer">
    <article class="footer__logo">
      <div class="gooter__logo__icons">
        <router-link to="/">
          <img src="../../../../public/footer/logo.svg" alt="">
        </router-link>
      </div>
      <div class="footer__logo__navbar">
        <router-link to="/Attraction">
          <h1>Достопремичательности</h1>
        </router-link>
        <router-link to="/Poster">
          <h1>Афиша</h1>
        </router-link>
        <router-link to="/News">
          <h1>Родной город</h1>
        </router-link>
        <router-link to="/Directory">
          <h1>Жильё</h1>
        </router-link>
        <router-link to="/Directory">
          <h1>Работа</h1>
        </router-link>
        <router-link to="/Directory">
          <h1>Справочник</h1>
        </router-link>
      </div>
    </article>
    <article class="footer__contact">
      <div class="footer__contact__text-logo">
        <h1>Контакты редакции</h1>
      </div>
      <div class="footer__contact__text-social">
        <div class="footer__contact__text-social_text">
          <div class="footer__contact__text-social_text_left">
            <p>Телефон: <router-link to="/Contact">+7 996 216-21-47</router-link></p>
            <p>Email: <router-link to="/Contact">bskone@gmail.com</router-link></p>
            <p>Адрес: <router-link to="/Contact">г. Борисоглебск, ул. Матросовская, д. 127</router-link></p>
          </div>
          <div class="footer__contact__text-social_text_right">
            <p>Гл. редактор: <router-link to="/Contact">Матвеев Е.И.</router-link></p>
            <p>Разработчик:<router-link to="/Contact">Матвеев Е.И.</router-link></p>
          </div>
        </div>
        <div class="footer__contact__text-social_social">
          <router-link to="https://web.telegram.org/a/">
            <img src="../../../../public/footer/Telegram.svg" alt="">
          </router-link>
          <router-link to="https://vk.com/">
            <img src="../../../../public/footer/VK.svg" alt="">
          </router-link>
          <router-link to="https://ok.ru/">
            <img src="../../../../public/footer/Odnoklasniki.svg" alt="">
          </router-link>
          <a href="#" @click.prevent="copyUrlFallback">
            <img src="../../../../public/footer/link.svg" alt="">
          </a>
        </div>
      </div>
    </article>
    <article class="footer__text">
      <h1>Сетевое издание «Мой Борисоглебск»</h1>
      <h1 id="text-padding">Зарегистрировано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций. <br>Регистрационный номер: ЭЛ № ФС77 80278 от 25.01.2021, учредитель — Матвеев Е.И.</h1>
      <h1>Использование материалов сайта возможно только с письменного разрешения редакции. Рубрики, а также материалы и статьи, помеченные «на правах рекламы», являются рекламно-<br>информационными материалами портала.</h1>
    </article>
  </footer>
</template>
<style scoped>
  @import "./footer.scss";
</style>
