import '../src/assets/main.css'

import { initializeApp } from "firebase/app";
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF6Ci9IaDwqljMDdlvBHosjxCCIx6KOHA",
  authDomain: "borisoglebsk.firebaseapp.com",
  projectId: "borisoglebsk",
  storageBucket: "borisoglebsk.firebasestorage.app",
  messagingSenderId: "1085154576276",
  appId: "1:1085154576276:web:43fbeb5faab620acd9f181"
};

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router).mount("#app")