import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import ShopView from '@/views/ShopView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import CartView from '@/views/CartView.vue'
import AddProductView from '@/views/AddProductView.vue'
import EditProductView from '@/views/EditProductView.vue'
import MyOrdersView from '@/views/MyOrdersView.vue'
import CheckoutTransactionView from '@/views/CheckoutTransactionView.vue'

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
      path: '/product-view/:id',
      name: 'product-view',
      component: ProductView,
    },
    {
      path: '/cart/:id',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true },
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
      path: '/add-product',
      name: 'add product',
      component: AddProductView,
      meta: { requiresAuth: true, requiredRole: 'employee' },
    },
    {
      path: '/edit-product/:id',
      name: 'edit product',
      component: EditProductView,
      meta: { requiresAuth: true, requiredRole: 'employee' },
    },
    {
      path: '/edit-product/:id',
      name: 'edit product',
      component: EditProductView,
      meta: { requiresAuth: true, requiredRole: 'employee' },
    },
    {
      path: '/orders',
      name: 'orders',
      component: MyOrdersView,
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutTransactionView,
      meta: { requiresAuth: true, requiredRole: 'employee' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userID = localStorage.getItem('userID')
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth) {
    if (!userID) {
      // Not logged in
      next('/login')
    } else if (to.meta.requiredRole && role !== to.meta.requiredRole) {
      // Logged in but wrong role
      next('/')
    } else {
      next() // Logged in and correct role
    }
  } else {
    next() // No auth required
  }
})

export default router
