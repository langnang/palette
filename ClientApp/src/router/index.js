import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WebSafe from '../views/WebSafe.vue'
import Palettes from '../views/Palettes.vue'
import Random from '../views/Random.vue'
import Chinese from '../views/Chinese.vue'
import Gradients from '../views/Gradients.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: "Home" }
  },
  {
    path: "/web-safe",
    name: "WebSafe",
    component: WebSafe,
    meta: { title: "216 Web Safe" }
  },
  {
    path: "/palettes",
    name: "Palettes",
    component: Palettes,
    meta: { title: "Palettes" }
  },
  {
    path: "/random",
    name: "Random",
    component: Random,
    meta: { title: "Random" }
  },
  {
    path: "/chinese",
    name: "Chinese",
    component: Chinese,
    meta: { title: "Chinese" }
  },
  {
    path: "/gradients",
    name: "Gradients",
    component: Gradients,
    meta: { title: "Gradients" }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
