<script setup>
import Header from '../layout/header/header.vue';
import Application from '../application/application.vue';
import Footer from '../layout/footer/footer.vue';

import { ref } from 'vue'

// Список категорий
const categories = [
  { id: 'state', name: 'Государственные учреждения' },
  { id: 'schools', name: 'Школы' },
  { id: 'kindergartens', name: 'Детские сады' },
  { id: 'health', name: 'Здоровье' },
  { id: 'sports', name: 'Спорткомплексы' },
  { id: 'factories', name: 'Заводы и предприятия' },
  { id: 'malls', name: 'Торговые центры' },
  { id: 'housing', name: 'Предприятия ЖКХ' },
  { id: 'recreation', name: 'Отдых' }
]

// Данные для каждой категории
const categoryData = {
  state: [
    { name: 'Администрация города', address: 'ул. Центральная, 1', phone: '123-456' },
    { name: 'Налоговая инспекция', address: 'ул. Налоговая, 5', phone: '456-789' }
  ],
  schools: [
    { name: 'Школа №1', address: 'ул. Школьная, 5', phone: '111-111' },
    { name: 'Гимназия №2', address: 'ул. Гимназическая, 10', phone: '222-222' }
  ],
  kindergartens: [
    { name: 'Детский сад №1', address: 'ул. Детская, 7', phone: '111-222' },
    { name: 'Детский сад №2', address: 'ул. Гимназическая, 15', phone: '222-111' }
  ],
  health: [
    { name: 'Детская больница №1', address: 'ул. Детская, 20', phone: '333-333' },
    { name: 'Детская больница №2', address: 'ул. Гимназическая, 46', phone: '222-333' },
    { name: 'Детская больница №3', address: 'ул. Советская, 52', phone: '333-222' },
    { name: 'Поликлиника, терапевтическая больница №1', address: 'ул. Советская, 86', phone: '232-323' },
    { name: 'Поликлиника, терапевтическая больница №2', address: 'ул. Пушкинская, 1', phone: '323-232' },
  ],
  sports: [
    { name: 'Волейбольная школа', address: 'ул. Школьная, 5', phone: '111-112' },
    { name: 'Спортивная арена', address: 'ул. Центральная, 5', phone: '89962123150' },
    { name: 'Зенит', address: 'ул. Зенитная, 7', phone: '123-123' },
  ],
  factories: [
    { name: 'Концерт Калашникова', address: 'ул. Промышленая, 1', phone: 'отсутствует' },
    { name: 'Металообработка', address: 'ул. Промышленая, 10', phone: '999-888' },
    { name: 'Бумашш', address: 'ул. Бумашшевская, 1', phone: '888-999' },
  ],
  malls: [
    { name: 'Мир-молл', address: 'ул. Центральная, 9', phone: 'отсутствует' },
    { name: 'Матрица', address: 'ул. Центральная, 90', phone: '89975634276' },
    { name: 'Труд', address: 'ул. Труда, 7', phone: 'отсутствует' },
  ],
  housing: [
    { name: 'ЖКХ Борисоглебск', address: 'ул. Промышленая, 3', phone: '111-111, 398750005764' },
  ],
  recreation: [
    { name: 'Городской парк кульруы и отдыха', address: 'ул. Проспект Ленина, 5', phone: '777-877' },
    { name: 'Хоперский заповедник', address: 'ул. Лесная, 61', phone: '565-980, 89975437654' }
  ],
}

const selectedCategory = ref(null)

// Функция выбора категории
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}
</script>

<template>
  <Header />
  <main class="directory">
    <article class="directory__layout">
      <router-link to="/">
        <div class="directory__layout__home">
          <h1>Главная</h1>
          <img src="../../../public/directory/right.svg" alt="">
        </div>
      </router-link>
      <div class="directory__layout__text">
        <h1>Справочник</h1>
      </div>
    </article>
    
    <article class="directory__content">
      <div class="directory__content__enterprises">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="directory__content__enterprises__text"
          :class="{ active: selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          <p>{{ category.name }}</p>
          <img src="../../../public/directory/enterprises/right.svg" alt="">
        </div>
      </div>
      
      <div class="directory__content__events">
        <div v-if="selectedCategory" class="category-content">
          <h2>{{ categories.find(c => c.id === selectedCategory)?.name }}</h2>
          
          <div v-if="categoryData[selectedCategory]?.length > 0" class="items-list">
            <div 
              v-for="(item, index) in categoryData[selectedCategory]" 
              :key="index"
              class="directory-item"
            >
              <h3>{{ item.name }}</h3>
              <p><strong>Адрес:</strong> {{ item.address }}</p>
              <p><strong>Телефон:</strong> {{ item.phone }}</p>
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
  <Application />
  <Footer />
</template>
<style scoped>
@import "./directory.scss";


.directory__content {
  display: flex;
  gap: 30px;
}

.directory__content__enterprises {
  flex: 1;
  max-width: 300px;
}

.directory__content__events {
  flex: 2;
}

.directory__content__enterprises__text {
  cursor: pointer;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.directory__content__enterprises__text:hover {
  background-color: #f5f5f5;
}

.directory__content__enterprises__text.active {
  background-color: #e0e0e0;
  font-weight: bold;
}

.category-content {
  padding: 20px;
}

.directory-item {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.no-data, .select-category {
  padding: 20px;
  text-align: center;
  color: #666;
}

</style>