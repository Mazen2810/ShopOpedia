import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import ContactUs from '@/views/home/ContactUs.vue'
import ProductList from '@/views/product/ProductList.vue'
import ProductUpsert from '@/views/product/ProductUpsert.vue'
import AccessDenied from '@/views/auth/AccessDenied.vue'
import NotFound from '@/views/auth/NotFound.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import { ROUTE_NAMES } from '@/constants/App-Routes-Names.js'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.HOME,
      component: Home,
    },
    {
      path: '/contact-us',
      name: ROUTE_NAMES.CONTACT_US,
      component: ContactUs,
    },
    {
      path: '/product-list',
      name: ROUTE_NAMES.PRODUCT_LIST,
      component: ProductList,
      beforeEnter: [isAdmin],
    },
    {
      path: '/create-product',
      name: ROUTE_NAMES.PRODUCT_CREATE,
      component: ProductUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/update-product/:id',
      name: ROUTE_NAMES.PRODUCT_UPDATE,
      component: ProductUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/access-denied',
      name: ROUTE_NAMES.ACCESS_DENIED,
      component: AccessDenied,
    },
    {
      path: '/not-found',
      name: ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
    {
      path: '/sign-in',
      name: ROUTE_NAMES.SIGN_IN,
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: ROUTE_NAMES.SIGN_UP,
      component: SignUp,
    },
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  try {
    if (!authStore.initialized) {
      await authStore.initializedAuth()
    }
  } catch (err) {
    console.error('Auth initialization failed', err)
  }
})

function isAdmin() {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return true
    } else {
      console.log(authStore.isAdmin)
      return { name: ROUTE_NAMES.ACCESS_DENIED }
    }
  } else {
    return { name: ROUTE_NAMES.SIGN_IN }
  }
}

export default router
