<script>
export default {
  data() {
    return {
      userInput: ''
    };
  },
  methods: {
    validateInput() {
      // Простая валидация ввода для предотвращения очевидных атак
      this.userInput = this.userInput.replace(/[;&|$`'"\s]/g, ''); // Удаление потенциально опасных символов
    },
    executeCommand() {
      // Отправка запроса на сервер с обработанными данными
      // На сервере также необходимо применять дополнительные меры безопасности
    }
  }
};
</script>

<template>
  <div>
    <input v-model="userInput" placeholder="Введите команду" @input="validateInput">
    <button @click="executeCommand">Выполнить</button>
  </div>
</template>
