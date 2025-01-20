import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Items  from '../views/Items.vue'

const routes = [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path : '/items',
      component: Items,

    }
 ]
 
 const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router