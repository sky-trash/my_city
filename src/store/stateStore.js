import {defineStore} from 'pinia';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {app, db} from '../firebase.js';
import {ref} from 'vue';
import {addDoc, collection, onSnapshot, query} from "firebase/firestore";

export const useStateStore = defineStore('stateStore', () => {
    const user = ref(null);
    const error = ref(null);
    const auth = getAuth(app); //Инициализация
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const surname = ref('');
    const news = ref([]);
    const poster = ref([]);


    const setEmail = (newEmail) => {
        email.value = newEmail;
    };
    const setPassword = (newPassword) => {
        password.value = newPassword;
    };
    const setName = (newName) => {
        name.value = newName;
    };
    const setSurName = (newSurName) => {
        name.value = newSurName;
    };
    const setNews = (newNews) => {
        name.value = setNews;
    };
    const setPosters = (newPosters) => {
        name.value = setPosters;
    };


    return {
      user,
      error,
      auth,
      email,
      password,
      name,
      surname,
      news,
      setEmail,
      setPassword,
      setName,
      setSurName,
      setNews,
      setPosters,
  };
});