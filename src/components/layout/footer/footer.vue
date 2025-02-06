<script setup>
// document.getElementById("copyLink").addEventListener("click", function() {
//   // Получаем ссылку
//   var link = document.getElementById("http://localhost:5173/").href;

//   // Копируем ссылку в буфер обмена
//   if (window.clipboardData && window.clipboardData.setData) {
//     // Для IE
//     window.clipboardData.setData("Text", link);
//   } else if (navigator.clipboard && navigator.clipboard.write) {
//     // Для других браузеров
//     navigator.clipboard.writeText(link);
//   }
// });
</script>
<template>
  <footer class="footer">
    <article class="footer__logo">
      <div class="gooter__logo__icons">
        <a href="/">
          <img src="../../../../public/footer/logo.svg" alt="">
        </a>
      </div>
      <div class="footer__logo__navbar">
        <a href="/Aattractions">
          <h1>Достопремичательности</h1>
        </a>
        <a href="/Poster">
          <h1>Афиша</h1>
        </a>
        <a href="/News">
          <h1>Родной город</h1>
        </a>
        <a href="/Live">
          <h1>Жильё</h1>
        </a>
        <a href="/Work">
          <h1>Работа</h1>
        </a>
        <a href="/Directory">
          <h1>Справочник</h1>
        </a>
      </div>
    </article>
    <article class="footer__contact">
      <div class="footer__contact__text-logo">
        <h1>Контакты редакции</h1>
      </div>
      <div class="footer__contact__text-social">
        <div class="footer__contact__text-social_text">
          <div class="footer__contact__text-social_text_left">
            <p>Телефон: <a href="#">+7 958 709-12-70</a></p>
            <p>Email: <a href="#">bsk@gmail.com</a></p>
            <p>Адрес: <a href="#">г. Борисоглебск, ул. Матросовская, д. 127</a></p>
          </div>
          <div class="footer__contact__text-social_text_right">
            <p>Гл. редактор: <a href="#">Хвастунова А.А.</a></p>
            <p>Журналист:<a href="#">Козякова Г.С., КрюковаС.Н.</a></p>
          </div>
        </div>
        <div class="footer__contact__text-social_social">
          <a href="https://web.telegram.org/a/">
            <img src="../../../../public/footer/Telegram.svg" alt="">
          </a>
          <a href="https://vk.com/">
            <img src="../../../../public/footer/VK.svg" alt="">
          </a>
          <a href="https://ok.ru/">
            <img src="../../../../public/footer/Odnoklasniki.svg" alt="">
          </a>
          <a href="#">
            <img src="../../../../public/footer/link.svg" alt="">
          </a>
        </div>
      </div>
    </article>
    <article class="footer__text">
      <h1>Сетевое издание «Мой Борисоглебск»</h1>
      <h1 id="text-padding">Зарегистрировано Федеральной службой по надзору в сфере связи, информационных технологий и массовых коммуникаций. <br>Регистрационный номер: ЭЛ № ФС77 80278 от 25.01.2021, учредитель — Хвастунов П.А.</h1>
      <h1>Использование материалов сайта возможно только с письменного разрешения редакции. Рубрики, а также материалы и статьи, помеченные «на правах рекламы», являются рекламно-<br>информационными материалами портала.</h1>
    </article>
  </footer>
</template>
<style scoped>
  @import "./footer.scss";
</style>