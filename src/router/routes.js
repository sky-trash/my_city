import Home from "../pages/Index.vue"
import Auth from "../pages/Auth.vue"
import Register from "../pages/Register.vue"
import Profile from "../pages/Profile.vue"
import Poster from "../pages/Poster.vue"
import News from "../pages/News.vue"
import Directory from "../pages/Directory.vue"
import Contact from "../pages/Contact.vue"
import Attraction from "../pages/Attraction.vue"
import NotFound from "../pages/NotFound.vue"

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
  {
    path: "/Contact",
    component: Contact,
  },
  {
    path: "/:notFound",
    component: NotFound,
  },
  {
    path: "/Attraction",
    component: Attraction,
  },
]