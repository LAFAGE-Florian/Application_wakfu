import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import ItemList  from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'
import ItemDrop from '../views/ItemDrop.vue'
import ItemRecipe from '../views/ItemRecipe.vue'

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
    {
      path: '/items/:id/drop',
      component: ItemDrop,
      props: true,
    },
    {
      path: '/items/:id/recipe',
      component: ItemRecipe,
      props: true,
    },
       
 ]
 
 const router = createRouter({
    history: createWebHistory('/'),
    routes
 })
 
 export default router