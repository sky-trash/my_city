import Home from "../pages/Index.vue"
import Auth from "../pages/Auth.vue"
import Register from "../pages/Register.vue"

export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Auth",
    component: Auth,
  },
  {
    path: "/Register",
    component: Register,
  },
]