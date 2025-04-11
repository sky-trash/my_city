<script setup>
import Header from '../layout/header/header.vue';
import Footer from '../layout/footer/footer.vue';

import { collection, onSnapshot, query } from "firebase/firestore";
import { apps, db } from "../../main"
import { ref } from "vue"
import { getAuth } from 'firebase/auth';

const auth = getAuth()
const user = ref([])

function withdrawalUser() {
  const userQuery = query(collection(db, 'users'))
  onSnapshot(userQuery, (snapshot) => {
    user.value = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name,
        surname: doc.data().surname,
        email: doc.data().email,
      }
    })
  })
}

function filteredUser() {
  return user.value.filter(user => user.uid === auth.lastNotifiedUid)
}

withdrawalUser();
</script>
<template>
  <Header />
  <main class="profile">
    <article class="profile__icons">
      <img src="../../../public/profile/profile.svg" alt="">
      <div class="profile__icons__human">
        <img src="../../../public/profile/Pic.svg" alt="">
      </div>
    </article>
    <article class="profile__description">
      <div 
      class="profile__description__data"         
      v-for="users in filteredUser" 
      :key="users.id"
      >
        <div class="profile__description__data__name">
          <h1>{{ users.name }} {{ users.surname }}</h1>
        </div>
        <!-- <div class="profile__description__data__login">
          <p>qwerty</p>
        </div> -->
        <div class="profile__description__data__email">
          <p>
            {{ users.email }}
          </p>
        </div>
      </div>
      <div class="profile__description__change">
        <button>
          <h1>Изменить</h1>
        </button>
      </div>
    </article>
    <!-- <div class="profile__line">
      <img src="../../../public/profile/Line.svg" alt="">
    </div> -->
    <article class="profile__history">
      <div class="profile__history__content">
        <div class="profile__history__content__text">
          <img src="../../../public/profile/Ticket.svg" alt="">
          <h1>История</h1>
        </div>
        <div class="profile__history__content__display">
          <div class="profile__history__content__display__card">

          </div>
          <div class="profile__history__content__display__card">

          </div>
          <div class="profile__history__content__display__card">

          </div>
          <div class="profile__history__content__display__card">

          </div>
          <div class="profile__history__content__display__card">

          </div>
        </div>
      </div>
    </article>
  </main>
  <Footer />
</template>
<style scoped>
@import "./profile.scss";
</style>