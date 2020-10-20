import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteView from '../views/RouteView.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: "Home" }
  },
  {
    path: '/user',
    name: 'User',
    component: RouteView,
    meta: { title: "User" },
    children: [
      {
        path: "sign-in",
        name: "Sign In",
        component: () => import('@/views/user/sign-in.vue'),
        meta: { title: "Sign In" }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next();
})
// router.afterEach((to, from) => {
//   console.log(to);
//   console.log(from);
// })

export default router
