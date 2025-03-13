<script>
export default {
  data() {
    return {
      username: '',
      usernameErrors: []
    };
  },
  methods: {
    validateUsername() {
      this.usernameErrors = [];
      if (!this.username) {
        this.usernameErrors.push('Username не должен быть пустым');
      } else if (/\d/.test(this.username)) {
        this.usernameErrors.push('Username не должен содержать цифр');
      } else {
        // Проверка уникальности username в базе данных
        // ...
      }
    }
  }
};
</script>

<template>
  <form>
    <input type="text" v-model="username" @blur="validateUsername">
    <p v-if="usernameErrors.length">{{ usernameErrors[0] }}</p>
  </form>
</template>