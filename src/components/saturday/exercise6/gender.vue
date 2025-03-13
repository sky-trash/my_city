<script>
export default {
  data() {
    return {
      gender: '',
      genderErrors: []
    };
  },
  methods: {
    validateGender() {
      this.genderErrors = [];
      if (!this.gender) {
        this.genderErrors.push('Гендер не должен быть пустым');
      }
    }
  }
};
</script>

<template>
  <form>
    <select v-model="gender" @change="validateGender">
      <option value="М">Мужчина</option>
      <option value="Ж">Женщина</option>
      <option value="мальчик">Мальчик</option>
      <option value="девочка">Девочка</option>
    </select>
    <p v-if="genderErrors.length">{{ genderErrors[0] }}</p>
  </form>
</template>