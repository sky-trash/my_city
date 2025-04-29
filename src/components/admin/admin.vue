<script setup>
import Header from '../layout/header/header.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore'
import { db } from '../../main'

const router = useRouter()

// Список категорий
const categories = [
  { id: 'users', name: 'Пользователи' },
  { id: 'applications', name: 'Заявки' },
  { id: 'posters', name: 'Афиша' },
  { id: 'news', name: 'Новости' },
  { id: 'attractions', name: 'Достопримечательности' },
]

// Данные для каждой категории
const categoryData = ref({
  users: [],
  applications: [],
  posters: [],
  news: [],
  attractions: []
})

const selectedCategory = ref(null)
const isLoading = ref(false)
const error = ref(null)
const showAddForm = ref(false)
const newItem = ref({
  title: '',
  name: '',
  email: '',
  phone: '',
  // добавьте другие поля по необходимости
})

// Функция загрузки данных из Firestore
const loadData = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    for (const category of categories) {
      const querySnapshot = await getDocs(collection(db, category.id))
      categoryData.value[category.id] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
    
  } catch (err) {
    console.error('Ошибка загрузки данных:', err)
    error.value = 'Не удалось загрузить данные'
  } finally {
    isLoading.value = false
  }
}

// Функция удаления элемента
const deleteItem = async (category, itemId) => {
  if (!confirm('Вы уверены, что хотите удалить этот элемент?')) return
  
  try {
    await deleteDoc(doc(db, category, itemId))
    // Обновляем данные после удаления
    categoryData.value[category] = categoryData.value[category].filter(
      item => item.id !== itemId
    )
  } catch (err) {
    console.error('Ошибка удаления:', err)
    alert('Не удалось удалить элемент')
  }
}

// Функция добавления элемента
const addItem = async () => {
  try {
    if (!selectedCategory.value) return
    
    // Добавляем документ в выбранную категорию
    const docRef = await addDoc(collection(db, selectedCategory.value), newItem.value)
    
    // Добавляем новый элемент в локальное состояние
    categoryData.value[selectedCategory.value].push({
      id: docRef.id,
      ...newItem.value
    })
    
    // Сбрасываем форму
    newItem.value = {
      title: '',
      name: '',
      email: '',
      phone: '',
      // сбросьте другие поля
    }
    showAddForm.value = false
    
  } catch (err) {
    console.error('Ошибка добавления:', err)
    alert('Не удалось добавить элемент')
  }
}

// Функция выбора категории
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
  showAddForm.value = false
}

// Загружаем данные при монтировании компонента
onMounted(() => {
  loadData()
})
</script>

<template>
  <Header />
  <main class="admin">
    <article class="admin__layout">
      <router-link to="/">
        <div class="admin__layout__home">
          <h1>Главная</h1>
          <img src="../../../public/admin/right.svg" alt="">
        </div>
      </router-link>
      <div class="admin__layout__text">
        <h1>Админ панель</h1>
      </div>
    </article>
    
    <div v-if="isLoading" class="loading">
      Загрузка данных...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="loadData">Повторить попытку</button>
    </div>
    
    <article v-else class="admin__content">
      <div class="admin__content__enterprises">
        <div 
          v-for="category in categories" 
          :key="category.id" 
          class="admin__content__enterprises__text"
          :class="{ active: selectedCategory === category.id }" 
          @click="selectCategory(category.id)"
        >
          <p>{{ category.name }}</p>
          <img src="../../../public/directory/enterprises/right.svg" alt="">
        </div>
      </div>
      
      <div class="admin__content__events">
        <div v-if="selectedCategory" class="category-content">
          <div class="category-header">
            <h2>{{ categories.find(c => c.id === selectedCategory)?.name }}</h2>
            <button @click="showAddForm = !showAddForm" class="add-btn">
              {{ showAddForm ? 'Отмена' : 'Добавить' }}
            </button>
          </div>
          
          <!-- Форма добавления -->
          <div v-if="showAddForm" class="add-form">
            <h3>Добавить новый элемент</h3>
            <div class="form-group">
              <label>Название:</label>
              <input v-model="newItem.title" type="text">
            </div>
            <div class="form-group">
              <label>Имя:</label>
              <input v-model="newItem.name" type="text">
            </div>
            <div class="form-group">
              <label>Фамилия:</label>
              <input v-model="newItem.surname" type="text">
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input v-model="newItem.email" type="email">
            </div>
            <div class="form-group">
              <label>Телефон:</label>
              <input v-model="newItem.phone" type="tel">
            </div>
            <div class="form-group">
              <label>Адрес:</label>
              <input v-model="newItem.address" type="tel">
            </div>
            <div class="form-group">
              <label>Возраст:</label>
              <input v-model="newItem.age" type="tel">
            </div>
            <div class="form-group">
              <label>Дата:</label>
              <input v-model="newItem.date" type="tel">
            </div>
            <div class="form-group">
              <label>Описание-s:</label>
              <input v-model="newItem.descriptions" type="tel">
            </div>
            <div class="form-group">
              <label>Описание:</label>
              <input v-model="newItem.description" type="tel">
            </div>
            <div class="form-group">
              <label>Продолжительность:</label>
              <input v-model="newItem.duration" type="tel">
            </div>
            <div class="form-group">
              <label>Здание:</label>
              <input v-model="newItem.home" type="tel">
            </div>
            <div class="form-group">
              <label>Цена:</label>
              <input v-model="newItem.price" type="tel">
            </div>
            <div class="form-group">
              <label>Тэг:</label>
              <input v-model="newItem.tag" type="tel">
            </div>
            <div class="form-group">
              <label>Время:</label>
              <input v-model="newItem.time" type="tel">
            </div>
            <div class="form-group">
              <label>Фото2:</label>
              <input v-model="newItem.icons" type="tel">
            </div>
            <div class="form-group">
              <label>Место:</label>
              <input v-model="newItem.map" type="tel">
            </div>
            <!-- Добавьте другие поля по необходимости -->
            <button @click="addItem" class="submit-btn">Сохранить</button>
          </div>

          <div v-if="categoryData[selectedCategory]?.length > 0" class="items-list">
            <div 
              v-for="item in categoryData[selectedCategory]" 
              :key="item.id"
              class="admin-item"
            >
              <p v-if="item.email"><strong>Email:</strong> {{ item.email }}</p>
              <p v-if="item.title"><strong>Название:</strong> {{ item.title }}</p>
              <p v-if="item.photo"><strong>Фото1:</strong> {{ item.photo }}</p>
              <p v-if="item.phone"><strong>Телефон:</strong> {{ item.phone }}</p>
              <p v-if="item.name"><strong>Имя:</strong> {{ item.name }}</p>
              <p v-if="item.surname"><strong>Фамилия:</strong> {{ item.surname }}</p>
              <p v-if="item.address"><strong>Адрес:</strong> {{ item.address }}</p>
              <p v-if="item.age"><strong>Возраст:</strong> {{ item.age }}</p>
              <p v-if="item.date"><strong>Дата:</strong> {{ item.date }}</p>
              <p v-if="item.descriptions"><strong>Описание:</strong> {{ item.descriptions }}</p>
              <p v-if="item.description"><strong>Описание:</strong> {{ item.description }}</p>
              <p v-if="item.duration"><strong>Продолжительность:</strong> {{ item.duration }}</p>
              <p v-if="item.home"><strong>Здание:</strong> {{ item.home }}</p>
              <p v-if="item.price"><strong>Цена:</strong> {{ item.price }}</p>
              <p v-if="item.tag"><strong>Тэг:</strong> {{ item.tag }}</p>
              <p v-if="item.time"><strong>Время:</strong> {{ item.time }}</p>
              <p v-if="item.icons"><strong>Фото2:</strong> {{ item.icons }}</p>
              <p v-if="item.map"><strong>Место:</strong> {{ item.map }}</p>
              
              <button 
                class="delete-btn"
                @click="deleteItem(selectedCategory, item.id)"
              >
                Удалить
              </button>
            </div>
          </div>
          
          <div v-else class="no-data">
            Нет данных для этой категории
          </div>
        </div>
        
        <div v-else class="select-category">
          <p>Выберите категорию из списка слева</p>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
@import "./admin.scss";

.loading, .error {
  padding: 20px;
  text-align: center;
  font-size: 18px;
}

.error {
  color: red;
}

.error button {
  margin-top: 10px;
  padding: 5px 10px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
}

.items-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.admin-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  background: #f9f9f9;
  position: relative;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #cc0000;
}

.add-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
}

.add-btn:hover {
  background: #45a049;
}

.add-form {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  background: #f5f5f5;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  background: #2196F3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #0b7dda;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

input {
  color: black;
}
</style>