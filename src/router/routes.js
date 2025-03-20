import Home from "../pages/Index.vue"
import Auth from "../pages/Auth.vue"
import Register from "../pages/Register.vue"
import Profile from "../pages/Profile.vue"
import Poster from "../pages/Poster.vue"
import News from "../pages/News.vue"
import Directory from "../pages/Directory.vue"

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
  {
    path: "/Profile",
    component: Profile,
  },
  {
    path: "/Poster",
    component: Poster,
  },
  {
    path: "/News",
    component: News,
  },
  {
    path: "/Directory",
    component: Directory,
  },
]