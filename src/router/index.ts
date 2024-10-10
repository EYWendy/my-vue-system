import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: "categories",// 设置重定向
    children: [
      {
        path: 'categories',
        name: 'categories',
        meta: {
          isShow: true,
          title: "分类管理"
        },

        component: () => import('../views/CategoriesView.vue')
      },
      {
        path: 'shops',
        name: 'shops',
        meta: {
          isShow: true,
          title: "商品管理"
        },
        component: () => import('../views/ShopView.vue')
      },
      {
        path: 'users',
        name: 'users',
        meta: {
          isShow: true,
          title: "用户管理"
        },
        component: () => import('../views/UserView.vue')
      },
      {
        path: 'abouts',
        name: 'abouts',
        meta: {
          isShow: true,
          title: "关于我"
        },
        component: () => import('../views/AboutView.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token');
  if (!token && to.path !== '/login') {
    next('/login')
  }
  else {
    next()
  }
})

export default router
