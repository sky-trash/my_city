<script>
export default {
  data() {
    return {
      phoneNumber: '',
      phoneErrors: []
    };
  },
  methods: {
    validatePhoneNumber() {
      this.phoneErrors = [];
      if (!this.phoneNumber) {
        this.phoneErrors.push('Номер телефона не должен быть пустым');
      }
      // Проверка кода страны и формата номера
    }
  }
};
</script>

<template>
  <form>
    <input type="text" v-model="phoneNumber" @blur="validatePhoneNumber">
    <p v-if="phoneErrors.length">{{ phoneErrors[0] }}</p>
  </form>
</template>