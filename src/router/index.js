import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Animals from '../views/Animals.vue'
import AnimalDetail from '../views/AnimalDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddAnimal from '../views/AddAnimal.vue'
import EditAnimal from '../views/EditAnimal.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/animals',
    name: 'Animals',
    component: Animals,
    meta: { requiresAuth: true }
  },
  {
    path: '/animals/:id',
    name: 'AnimalDetail',
    component: AnimalDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/add-animal',
    name: 'AddAnimal',
    component: AddAnimal,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-animal/:id',
    name: 'EditAnimal',
    component: EditAnimal,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
    