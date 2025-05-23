<script setup lang="ts">
import Header from '../layout/header/header.vue'
// import Footer from '../layout/footer/footer.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../main'
import { getAuth } from 'firebase/auth'
import { updateEmail } from 'firebase/auth'

defineOptions({
  name: 'profileEdit'
})

interface UserData {
  id: string
  userId: string
  name: string
  surname: string
  phone: string
  email: string
  role?: string
}

const route = useRoute()
const router = useRouter()
const auth = getAuth()

const userData = ref<UserData>({
  id: '',
  userId: '',
  name: '',
  surname: '',
  phone: '',
  email: '',
  role: ''
})

const isLoading = ref(false)
const isUpdating = ref(false)
const error = ref('')

// Загружаем данные профиля
onMounted(async () => {
  isLoading.value = true
  try {
    const docRef = doc(db, 'users', route.params.id as string)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      userData.value = {
        id: docSnap.id,
        ...docSnap.data()
      } as UserData
    } else {
      error.value = 'Профиль не найден'
    }
  } catch (err) {
    error.value = 'Ошибка загрузки профиля'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
// Валидация
const validateForm = () => {
  if (!userData.value.name.trim() || !userData.value.surname.trim()) {
    error.value = 'Имя и фамилия обязательны'
    return false
  }
  return true
}
// Изменение email
const updateUserEmail = async (newEmail: string) => {
  try {
    if (auth.currentUser) {
      await updateEmail(auth.currentUser, newEmail)
      // Обновляем email в Firestore
      await updateDoc(doc(db, 'users', userData.value.id), {
        email: newEmail
      })
    }
  } catch (err) {
    console.error('Ошибка смены email:', err)
  }
}

// Обновляем данные профиля
const updateProfile = async () => {
  if (!validateForm()) return
  // if (!updateUserEmail()) return
  if (!userData.value) return
  
  isUpdating.value = true
  try {
    const docRef = doc(db, 'users', userData.value.id)
    await updateDoc(docRef, {
      name: userData.value.name,
      surname: userData.value.surname,
      phone: userData.value.phone,
      // email обычно не обновляется здесь, так как он привязан к аутентификации
    })
    router.push({ name: 'profile' }) // Перенаправляем после успешного обновления
  } catch (err) {
    error.value = 'Ошибка при обновлении профиля'
    console.error(err)
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <Header />
  <main class="edit">
    <template v-if="isLoading">
      <div class="loading">Загрузка данных профиля...</div>
    </template>
    
    <template v-else-if="error">
      <div class="error">{{ error }}</div>
    </template>
    
    <div class="edit__profile" v-else>
      <h1>Редактирование профиля</h1>
      
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Имя:</label>
          <input
            id="name"
            v-model="userData.name"
            type="text"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="surname">Фамилия:</label>
          <input
            id="surname"
            v-model="userData.surname"
            type="text"
            required
          >
        </div>

        <div class="form-group">
          <label for="surname">Телефон:</label>
          <input
            id="phone"
            v-model="userData.phone"
            type="number"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="userData.email"
            type="email"
            disabled
          >
          <small>Email изменить нельзя</small>
        </div>
        
        <div class="actions">
          <button
            type="submit"
            :disabled="isUpdating"
          >
            {{ isUpdating ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
          
          <router-link
            :to="{ name: 'profile' }"
            class="cancel-btn"
          >
            Отмена
          </router-link>
        </div>
      </form>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
@import "./profileEdit.scss";
</style>