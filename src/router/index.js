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
    path: '/profile/tweets/:id',
    name: 'sub-profile',
    component: () => import('../views/SubProfile.vue'),
    children: [
      {
        path: '/profile/tweets/:id',
        component: ()=> import('../views/SubProfileTweets.vue'),
        name: 'sub-profile-tweets'
      },
      { 
        path: '/profile/responses/:id', component: () => import('../views/SubProfileResponses.vue'),
        name: 'sub-profile-responses'
      },
      {
        path: '/profile/liked/:id', component: () => import('../views/SubProfileLiked.vue'),
        name: 'sub-profile-liked'
      }
    ]
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
