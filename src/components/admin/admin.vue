<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  console.log('Admin mounted')
})
</script>

<template>
  <div>
    <h1>Админ-панель</h1>
    <!-- Контент админки -->
  </div>
</template>