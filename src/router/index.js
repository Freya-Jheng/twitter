import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin',
  },

  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue'),
  },
  {

    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/tweets/:tweet_id',
    name: 'individual-tweet',
    component: () => import('../views/IndividualTweet'),
  },
  {
    path: '/setting/:id',
    name: 'setting',
    component: () => import('../views/Setting.vue'),
  },
  {
    path: '/profile/:id',
    name: 'sub-profile',
    component: () => import('../views/SubProfile.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

export default router
