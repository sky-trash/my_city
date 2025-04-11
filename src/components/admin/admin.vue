<script setup>
import Header from '../layout/header/header.vue';

import { ref } from 'vue'
import { addDoc, collection, onSnapshot, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import 'firebase/auth';
import { apps, db } from "../../main"

const users = ref([]);
const applications = ref([]);
const news = ref([]);
const posters = ref([]);

function withdrawalUsers() {
  const UsersQuery = query(collection(db, 'users'));
  onSnapshot(UsersQuery, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      surname: doc.data().surname,
      role: doc.data().role,
      email: doc.data().email,
    }));
  });
}

function withdrawalApplications() {
  const ApplicationsQuery = query(collection(db, 'applications'));
  onSnapshot(ApplicationsQuery, (snapshot) => {
    applications.value = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      phone: doc.data().phone,
      title: doc.data().title,
    }));
  });
}

function withdrawalNews() {
  const NewsQuery = query(collection(db, 'news'));
  onSnapshot(NewsQuery, (snapshot) => {
    news.value = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      tag: doc.data().tag,
      date: doc.data().date,
      photo: doc.data().photo || [],
    }));
  });
}

function withdrawalPosters() {
  const PostersQuery = query(collection(db, 'posters'));
  onSnapshot(PostersQuery, (snapshot) => {
    posters.value = snapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      address: doc.data().address,
      price: doc.data().price,
      tag: doc.data().tag,
      date: doc.data().date,
      photo: doc.data().photo || [],
    }));
  });
}

withdrawalUsers();
withdrawalApplications();
withdrawalNews();
withdrawalPosters();

</script>
<template>
  <Header />
  <main class="admin">
    <div class="admin__text">
      <h1>Админ панель</h1>
    </div>
    <div class="admin__content">
      <div class="admin__content__menu">
        <div class="admin__content__menu__users" @click="movingPage('users')" :class="{ 'page_active': page === 'users' }">
          Вывод пользователей
        </div>
        <div class="admin__content__menu__users" @click="movingPage('newUsers')" :class="{ 'page_active': page === 'newUsers' }">
          Добавление пользователей
        </div>
        <div class="admin__content__menu__applications" @click="movingPage('applications')" :class="{ 'page_active': page === 'applications' }">
          Вывод заявок
        </div>
        <div class="admin__content__menu__news" @click="movingPage('news')" :class="{ 'page_active': page === 'news' }">
          Вывод новостей
        </div>
        <div class="admin__content__menu__news" @click="movingPage('newNews')" :class="{ 'page_active': page === 'newNews' }">
          Добавление новостей
        </div>
        <div class="admin__content__menu__posters" @click="movingPage('posters')" :class="{ 'page_active': page === 'posters' }">
          Вывод афиши
        </div>
        <div class="admin__content__menu__news" @click="movingPage('newPosters')" :class="{ 'page_active': page === 'newPosters' }">
          Добовление афиши
        </div>
      </div>
      <div class="admin__content__info">
        <div class="admin__content__info__users" v-if="page === 'users'">
          <tr  
          v-for="user in users"
          :key="user.id"
          >
            <th>{{ user.name }}</th>
            <th>{{ user.surname }}</th>
            <th>{{ user.email }}</th>
          </tr>
        </div>
        <div class="admin__content__info__new-users" v-if="page === 'newUsers'">

        </div>
        <div class="admin__content__info__applications" v-if="page === 'applications'">
          <tr  
          v-for="application in applications"
          :key="application.id"
          >
            <th>{{ application.name }}</th>
            <th>{{ application.phone }}</th>
            <th>{{ application.title }}</th>
          </tr>
        </div>
        <div class="admin__content__info__news" v-if="page === 'news'">
          <tr  
          v-for="newsis in news"
          :key="newsis.id"
          >
            <th>{{ newsis.photo }}</th>
            <th>{{ newsis.tag }}</th>
            <th>{{ newsis.title }}</th>
            <th>{{ newsis.date }}</th>
          </tr>
        </div>
        <div class="admin__content__info__new-news" v-if="page === 'newNews'">

        </div>
        <div class="admin__content__info__posters" v-if="page === 'posters'">
          <tr  
          v-for="poster in posters"
          :key="poster.id"
          >
            <th>{{ poster.photo }}</th>
            <th>{{ poster.tag }}</th>
            <th>{{ poster.price }}</th>
            <th>{{ poster.title }}</th>
            <th>{{ poster.date }}</th>
            <th>{{ poster.address }}</th>
          </tr>
        </div>
        <div class="admin__content__info__new-posters" v-if="page === 'newPosters'">

        </div>
      </div>
    </div>
  </main>
</template>
<style>
@import "./admin.scss";
</style>