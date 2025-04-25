<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '../../main'
import Header from '../layout/header/header.vue'

interface User {
  id: string
  email: string
  name: string
  surname: string
  role: string
}

interface Application {
  id: string
  userId: string
  eventId: string
  status: string
  createdAt: Date
}

interface Poster {
  id: string
  title: string
  date: string
  location: string
  description: string
  imageUrl: string
}

interface News {
  id: string
  title: string
  content: string
  createdAt: Date
  imageUrl: string
}

const router = useRouter()
const auth = getAuth()
const currentUser = ref<User | null>(null)
const isLoading = ref(true)

const users = ref<User[]>([])
const applications = ref<Application[]>([])
const posters = ref<Poster[]>([])
const news = ref<News[]>([])

const activeTab = ref('users')

onMounted(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.push('/Profile')
      return
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const userData = userDoc.data() as User

    if (!userData || userData.role !== "2") {
      router.push('/')
      return
    }

    currentUser.value = { id: user.uid, ...userData }
    await loadAllData()
    isLoading.value = false
  })
})

const loadAllData = async () => {
  await Promise.all([
    loadUsers(),
    loadApplications(),
    loadPosters(),
    loadNews()
  ])
}

const loadUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'))
  users.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as User[]
}

const loadApplications = async () => {
  const querySnapshot = await getDocs(collection(db, 'applications'))
  applications.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate()
  })) as Application[]
}

const loadPosters = async () => {
  const querySnapshot = await getDocs(collection(db, 'posters'))
  posters.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Poster[]
}

const loadNews = async () => {
  const querySnapshot = await getDocs(collection(db, 'news'))
  news.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate()
  })) as News[]
}

const deleteItem = async (collectionName: string, id: string) => {
  if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
    await deleteDoc(doc(db, collectionName, id))
    await loadAllData()
  }
}
</script>

<template>
  <Header />
  <main class="admin">
    <div v-if="isLoading" class="loading">Загрузка...</div>
    
    <div v-else class="admin-container">
      <div class="admin-tabs">
        <button 
          @click="activeTab = 'users'" 
          :class="{ active: activeTab === 'users' }"
        >
          Пользователи ({{ users.length }})
        </button>
        <button 
          @click="activeTab = 'applications'" 
          :class="{ active: activeTab === 'applications' }"
        >
          Заявки ({{ applications.length }})
        </button>
        <button 
          @click="activeTab = 'posters'" 
          :class="{ active: activeTab === 'posters' }"
        >
          Афиша ({{ posters.length }})
        </button>
        <button 
          @click="activeTab = 'news'" 
          :class="{ active: activeTab === 'news' }"
        >
          Новости ({{ news.length }})
        </button>
      </div>

      <div class="admin-content">
        <!-- Users Tab -->
        <div v-if="activeTab === 'users'" class="tab-content">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.surname }}</td>
                <td>{{ user.role === 2 ? 'Админ' : 'Пользователь' }}</td>
                <td>
                  <button 
                    class="delete-btn"
                    @click="deleteItem('users', user.id)" 
                    :disabled="user.id === currentUser?.id"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Applications Tab -->
        <div v-if="activeTab === 'applications'" class="tab-content">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID пользователя</th>
                <th>ID мероприятия</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in applications" :key="app.id">
                <td>{{ app.id }}</td>
                <td>{{ app.userId }}</td>
                <td>{{ app.eventId }}</td>
                <td>{{ app.status }}</td>
                <td>{{ app.createdAt.toLocaleString() }}</td>
                <td>
                  <button class="delete-btn" @click="deleteItem('applications', app.id)">
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Posters Tab -->
        <div v-if="activeTab === 'posters'" class="tab-content">
          <div class="cards-grid">
            <div v-for="poster in posters" :key="poster.id" class="card">
              <img :src="poster.imageUrl" :alt="poster.title" class="card-image">
              <div class="card-content">
                <h3 class="card-title">{{ poster.title }}</h3>
                <p class="card-meta">{{ poster.date }} - {{ poster.location }}</p>
                <p class="card-description">{{ poster.description }}</p>
              </div>
              <div class="card-actions">
                <button class="delete-btn" @click="deleteItem('posters', poster.id)">Удалить</button>
              </div>
            </div>
          </div>
        </div>

        <!-- News Tab -->
        <div v-if="activeTab === 'news'" class="tab-content">
          <div class="cards-grid">
            <div v-for="item in news" :key="item.id" class="card">
              <img :src="item.imageUrl" :alt="item.title" class="card-image">
              <div class="card-content">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-meta">{{ item.createdAt.toLocaleDateString() }}</p>
                <p class="card-description">{{ item.content.substring(0, 100) }}...</p>
              </div>
              <div class="card-actions">
                <button class="delete-btn" @click="deleteItem('news', item.id)">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  @import "./admin.scss";
</style>