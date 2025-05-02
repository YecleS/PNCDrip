import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import ShopView from '@/views/ShopView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import CartView from '@/views/CartView.vue'
import AddProductView from '@/views/AddProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/product-view',
      name: 'product view',
      component: ProductView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'sign up',
      component: SignUpView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },

    {
      path: '/add-product',
      name: 'add product',
      component: AddProductView,
    },
  ],
})

export default router
