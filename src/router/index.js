import { createRouter, createWebHistory } from "vue-router"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../pages/Index.vue") },
    {
      path: "/Auth",
      component: () => import("../pages/Auth.vue"),
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: "/Register",
      component: () => import("../pages/Register.vue"),
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: "/Profile",
      component: () => import("../pages/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/Poster", component: () => import("../pages/Poster.vue") },
    { path: "/News", component: () => import("../pages/News.vue") },
    { path: "/Directory", component: () => import("../pages/Directory.vue") },
    { path: "/Contact", component: () => import("../pages/Contact.vue") },
    { path: "/Attraction", component: () => import("../pages/Attraction.vue") },
    { path: "/Reasons", component: () => import("../pages/Reasons.vue") },
    {
      path: "/Admin",
      component: () => import("../pages/Admin.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/:notFound", component: () => import("../pages/NotFound.vue") },
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await getCurrentUser();

  // Проверка для защищенных маршрутов (требует авторизации)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      alert("У вас нет доступа");
      next("/");
    } else {
      next();
    }
  }
  // Проверка для маршрутов, доступных только неавторизованным
  else if (to.matched.some(record => record.meta.requiresUnauth)) {
    if (isAuthenticated) {
      alert("Вы уже авторизованы");
      next("/");
    } else {
      next();
    }
  }
  // Все остальные маршруты
  else {
    next();
  }
});

export default router
