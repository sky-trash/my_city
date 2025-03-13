<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    getUser() {
      // Отправка запроса на сервер с безопасным параметром
      this.$http.get(`/api/users`, { params: { username: this.username } })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <div>
    <input v-model="username" placeholder="Username">
    <button @click="getUser">Get User</button>
  </div>
</template>