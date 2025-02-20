import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import ItemList  from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'

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
      path: '/items',
      component: ItemList,
    },
    {
      path: '/items/:id',
      component: ItemDetail,
      props: true
    },
       
 ]
 
 const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router