import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteView from '../views/RouteView.vue'
import Home from '../views/Home.vue'
import Single from '../views/Single.vue'
import WebSafe from '../views/WebSafe.vue'
import Palettes from '../views/Palettes.vue'
import Random from '../views/Random.vue'
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
    path: "/single",
    name: "Single Color",
    component: RouteView,
    beforeEnter: (to, from, next) => {
      next();
    },
    children: [
      {
        path: "websafe",
        name: "WebSafe",
        component: WebSafe,
        meta: { title: "216 Web Safe" }
      },
      {
        path: "random",
        name: "Random",
        component: Random,
        meta: { title: "Random" }
      },
      {
        path: "palettes",
        name: "Palettes",
        component: Palettes,
        meta: { title: "Palettes" }
      },
      {
        path: ":key",
        name: "Single",
        component: Single,
        meta: { title: "Single Colors" }
      },
    ],
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

router.beforeEach((to, from, next) => {
  next();
})
router.afterEach((to, from) => {
  console.log(to);
  console.log(from);
})

export default router
