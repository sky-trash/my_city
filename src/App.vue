<script setup>
import RootLayout from "./components/layout/RootLayout/RootLayout.vue"
import { useRouter } from 'vue-router'

const router = useRouter()

router.onError((error) => {
  console.error('Navigation error:', error)
})
</script>

<template>
  <RootLayout />
</template>
