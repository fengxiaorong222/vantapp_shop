import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Category = () => import('../views/Category')
const tabBtn = () => import('../components/tabBtn')
const CategoryList = () => import('../views/categoryList')
const Product = () => import('../views/Product')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/',
    redirect:'/home'
  }
  ,
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/categoryList/:id',
    name: 'CategoryList',
    component: CategoryList,
    props:true
  },
  {
    path: '/tabbtn',
    name: 'tabbtn',
    component: tabBtn
  }
  ,
  {
    path: '/product/:id',
    name: 'product',
    component: Product,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
