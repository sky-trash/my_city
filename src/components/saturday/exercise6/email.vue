<script>
export default {
  data() {
    return {
      email: '',
      emailErrors: []
    };
  },
  methods: {
    validateEmail() {
      this.emailErrors = [];
      if (!this.email) {
        this.emailErrors.push('Email не должен быть пустым');
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
        this.emailErrors.push('Некорректный формат email');
      }
    }
  }
};


</script>
<template>
  <form>
    <input type="email" v-model="email" @blur="validateEmail">
    <p v-if="emailErrors.length">{{ emailErrors[0] }}</p>
  </form>
</template>