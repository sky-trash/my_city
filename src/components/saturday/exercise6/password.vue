<script>
export default {
  data() {
    return {
      password: '',
      passwordErrors: []
    };
  },
  methods: {
    validatePassword() {
      this.passwordErrors = [];
      if (this.password.length < 8) {
        this.passwordErrors.push('Пароль должен быть не менее 8 символов');
      }
      // Другие проверки пароля
    }
  }
};
</script>
<template>
  <form>
    <input type="password" v-model="password" @blur="validatePassword">
    <p v-if="passwordErrors.length">{{ passwordErrors[0] }}</p>
  </form>
</template>