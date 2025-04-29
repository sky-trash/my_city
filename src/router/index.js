import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../pages/Index.vue"),
      alias: ["/home", "/main"] // Добавляем алиасы для главной
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../pages/Auth.vue"),
      meta: {
        requiresUnauth: true,
        title: "Авторизация" // Мета-данные для заголовка
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/Register.vue"),
      meta: {
        requiresUnauth: true,
        title: "Регистрация"
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../pages/Profile.vue"),
      meta: {
        requiresAuth: true,
        title: "Профиль"
      }
    },
    {
      path: "/profile/edit/:id",
      name: "profileEdit",
      component: () => import("../pages/ProfileEdit.vue"),
      meta: {
        requiresAuth: true,
        title: "Редактировать профиль"
      },
      props: true  // Передаем параметр маршрута как props
    },
    {
      path: "/Posters",
      name: "posters",
      component: () => import("../pages/Poster.vue"),
      meta: {
        title: "Афиша"
      }
    },
    {
      path: "/posters/:id",
      name: "PosterDetail",
      component: () => import("../pages/PosterDetail.vue"),
      meta: {
        title: "Детальные мероприятия"
      },
      props: true  // Передаем параметр маршрута как props
    },
    {
      path: "/News",
      name: "news",
      component: () => import("../pages/News.vue"),
      meta: {
        title: "Новости"
      }
    },
    {
      path: "/news/:id",
      name: "NewDetail",
      component: () => import("../pages/NewDetail.vue"),
      meta: {
        title: "Детальные новости"
      },
      props: true  // Передаем параметр маршрута как props
    },
    {
      path: "/ticket/:id",
      name: "ticket",
      component: () => import("../pages/Ticket.vue"),
      meta: {
        title: "Билет"
      },
      props: true  // Передаем параметр маршрута как props
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../pages/Admin.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
        title: 'Админ-панель'
      }
    },
    {
      path: "/attraction",
      name: "attraction",
      component: () => import("../pages/Attraction.vue"),
      meta: {
        title: "Достопремичательности"
      }
    },
    {
      path: "/attraction/:id",
      name: "AttractionDetail",
      component: () => import("../pages/AttaractionDetail.vue"),
      meta: {
        title: "Детальные достопремичательности"
      },
      props: true,
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../pages/Contact.vue"),
      meta: {
        title: "Контакты"
      }
    },
    {
      path: "/directory",
      name: "directory",
      component: () => import("../pages/Directory.vue"),
      meta: {
        title: "Справочник"
      }
    },
    {
      path: "/reasons",
      name: "reasons",
      component: () => import("../pages/Reasons.vue"),
      meta: {
        title: "5 причин"
      }
    },
    {
      path: "/:pathMatch(.*)*", // Более надежный обработчик 404
      name: "not-found",
      component: () => import("../pages/NotFound.vue"),
      meta: {
        title: "Страница не найдена"
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Типизированная версия функции проверки пользователя
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      (error) => {
        removeListener()
        reject(error)
      }
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  if (requiresAuth || requiresAdmin) {
    const user = await getCurrentUser()
    if (!user) {
      return next('/auth?redirect=' + to.path)
    }

    if (requiresAdmin) {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists() || userDoc.data().role !== true) {
        console.log('Admin access denied')
        return next('/')
      }
    }
  }
  
  next()
})

export default router
