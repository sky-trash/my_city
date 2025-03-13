<script>
export default {
  data() {
    return {
      birthDate: '',
      birthDateErrors: []
    };
  },
  methods: {
    validateBirthDate() {
      this.birthDateErrors = [];
      if (!this.birthDate) {
        this.birthDateErrors.push('Дата рождения не должна быть пустой');
      } else {
        const birthDate = new Date(this.birthDate);
        const currentDate = new Date();
        if (birthDate > currentDate) {
          this.birthDateErrors.push('Дата рождения не может быть в будущем');
        } else {
          const age = currentDate.getFullYear() - birthDate.getFullYear();
          if (currentDate.getMonth() < birthDate.getMonth() || 
              (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age > 111) {
            this.birthDateErrors.push('Возраст не может быть больше 111 лет');
          }
        }
      }
    }
  }
};
</script>

<template>
  <form>
    <input type="date" v-model="birthDate" @blur="validateBirthDate">
    <p v-if="birthDateErrors.length">{{ birthDateErrors[0] }}</p>
  </form>
</template>