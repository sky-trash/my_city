import '../src/assets/main.css'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createApp } from "vue"
import { createPinia } from "pinia"
import { getAuth } from 'firebase/auth';

import App from "./App.vue"
import router from "./router"

const firebaseConfig = {
  apiKey: "AIzaSyDF6Ci9IaDwqljMDdlvBHosjxCCIx6KOHA",
  authDomain: "borisoglebsk.firebaseapp.com",
  projectId: "borisoglebsk",
  storageBucket: "borisoglebsk.appspot.com",
  messagingSenderId: "1085154576276",
  appId: "1:1085154576276:web:43fbeb5faab620acd9f181"
};


const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount("#app")