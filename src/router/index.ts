import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path: 'shops',
          name: 'shops',
          meta:{
            isShow:true,
            title:"商品管理"
          },
          component:()=>import('../views/ShopView.vue')
        },
        {
          path: 'users',
          name: 'users',
          meta:{
            isShow:true,
            title:"用户管理"
          },
          component:()=>import('../views/UserView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
