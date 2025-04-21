<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../main";

const router = useRouter();
const name = ref("");
const phone = ref("");
const title = ref("");
const isLoading = ref(false);
const errMsg = ref("");
const successMsg = ref("");

// Валидация телефона
const validatePhone = (phone) => {
  const regex = /^[\d\s()+ -]{10,15}$/;
  return regex.test(phone);
};

const submitApplication = async () => {
  // Сброс сообщений
  errMsg.value = "";
  successMsg.value = "";

  // Валидация
  if (!name.value.trim()) {
    errMsg.value = "Пожалуйста, введите ваше имя";
    return;
  }

  if (!phone.value.trim()) {
    errMsg.value = "Пожалуйста, введите ваш телефон";
    return;
  }

  if (!validatePhone(phone.value)) {
    errMsg.value = "Пожалуйста, введите корректный номер телефона";
    return;
  }

  if (!title.value.trim()) {
    errMsg.value = "Пожалуйста, введите сообщение";
    return;
  }

  isLoading.value = true;

  try {
    await addDoc(collection(db, 'applications'), {
      name: name.value.trim(),
      phone: phone.value.trim(),
      title: title.value.trim(),
      createdAt: new Date()
    });

    successMsg.value = "Заявка успешно отправлена!";

    // Очистка формы
    name.value = "";
    phone.value = "";
    title.value = "";

    // Перенаправление через 2 секунды
    setTimeout(() => {
      router.push('/');
    }, 2000);

  } catch (error) {
    console.error("Ошибка при отправке заявки:", error);
    errMsg.value = "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.";
  } finally {
    isLoading.value = false;
  }
};
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
              :disabled="isLoading"
            >
          </div>

          <div class="main__application__form__input__block__card">
            <h1>Телефон</h1>
            <input
              type="tel"
              placeholder="7 999 999 99 99"
              v-model="phone"
              :disabled="isLoading"
              @input="phone = phone.replace(/[^0-9]/g, '')"
            >
          </div>

          <div class="main__application__form__input__block__card">
            <h1>Сообщение</h1>
            <input
              type="text"
              placeholder="Введите сообщение..."
              v-model="title"
              :disabled="isLoading"
              rows="3"
            ></input>
          </div>

          <div class="main__application__form__input__block__button">
            <button
              @click="submitApplication"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Отправить</span>
              <span v-else>Отправка...</span>
            </button>
          </div>
        </div>

        <!-- Сообщения об ошибках и успехе -->
        <div v-if="errMsg" class="message error">
          {{ errMsg }}
        </div>
        <div v-if="successMsg" class="message success">
          {{ successMsg }}
        </div>

        <div class="main__application__form__input__text">
          <h1>Нажимая кнопку «Отправить», вы соглашаетесь с условиями политики конфиденциальности</h1>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
@import "./application.scss";

/* Дополнительные стили */
.message {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}
</style>
