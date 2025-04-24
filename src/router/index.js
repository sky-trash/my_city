import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
      path: "/admin",
      name: "admin",
      component: () => import("../pages/Admin.vue"),
      meta: {
        title: "Админ"
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
      return { el: to.hash, behavior: 'smooth' };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 }; // Обязательно возвращаем объект
  }
})

// Типизированная версия функции проверки пользователя
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      (error) => {
        removeListener();
        reject(error);
      }
    );
  });
};

router.beforeEach(async (to, from, next) => {
  try {
    const currentUser = await getCurrentUser();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth);

    if (to.meta.title) {
      document.title = `${to.meta.title} | Мой Борисоглебск`;
    }

    if (requiresAuth && !currentUser) {
      next({ name: 'auth', query: { redirect: to.fullPath } });
      return; // Важно: return после next()
    }

    if (requiresUnauth && currentUser) {
      next({ name: 'profile' });
      return;
    }

    next(); // Корректный вызов
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error);
    next('/error');
  }
});

export default router
