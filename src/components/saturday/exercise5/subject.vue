<script>
export default {
  data() {
    return {
      userInput: ''
    };
  },
  methods: {
    executeCommand() {
      // Здесь должен быть код для выполнения команды на сервере
      // Например, отправка запроса на сервер с userInput
      // Это место уязвимо для OS Injection, если данные не обрабатываются должным образом на сервере
    }
  }
};
</script>
<template>
  <div>
    <input v-model="userInput" placeholder="Введите команду">
    <button @click="executeCommand">Выполнить</button>
  </div>
</template>