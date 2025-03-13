<script>
export default {
  data() {
    return {
      imageErrors: []
    };
  },
  methods: {
    validateImage(event) {
      this.imageErrors = [];
      const file = event.target.files[0];
      if (!file) {
        this.imageErrors.push('Файл не выбран');
      } else {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const minSize = 1024; // 1 KB
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!allowedExtensions.includes(fileExtension)) {
          this.imageErrors.push('Неподдерживаемое расширение файла');
        }
        if (file.size < minSize) {
          this.imageErrors.push('Размер файла должен быть не менее 1 KB');
        }
        if (file.size > maxSize) {
          this.imageErrors.push('Размер файла должен быть не более 5 MB');
        }
      }
    }
  }
};
</script>

<template>
  <form>
    <input type="file" @change="validateImage">
    <p v-if="imageErrors.length">{{ imageErrors[0] }}</p>
  </form>
</template>