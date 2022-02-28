import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import AdminSignin from '../views/AdminSignin.vue'
import AdminHome from '../views/AdminHome.vue'

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
    path: '/admin',
    name: 'admin-home',
    component: AdminHome,
    children: [
      {
        path: '/admin/tweets/:id',
        component: () => import('../views/AdminTweets.vue'),
        name: 'admin-tweets',
      },
      {
        path: '/admin/users/:id',
        component: () => import('../views/AdminUsers.vue'),
        name: 'admin-users',
      },
    ],
  },
  {
    path: '/admin/signin',
    name: 'adminSignin',
    component: AdminSignin,
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
    path: '/user/:id/followers/',
    name: 'user-follower',
    component: () => import('../views/Followers.vue'),
    children: [
      {
        path: '/user/:id/followers/',
        name: 'user-followers',
        component: () => import('../components/UserFollowers.vue'),
      },
      {
        path: '/user/:id/followings/',
        name: 'user-followings',
        component: () => import('../components/UserFollowings.vue'),
      },
    ],
  },
  {
    path: '/profile/tweets/:id',
    name: 'sub-profile',
    component: () => import('../views/SubProfile.vue'),
    children: [
      {
        path: '/profile/tweets/:id',
        component: () => import('../views/SubProfileTweets.vue'),
        name: 'sub-profile-tweets',
      },
      {
        path: '/profile/responses/:id',
        component: () => import('../views/SubProfileResponses.vue'),
        name: 'sub-profile-responses',
      },
      {
        path: '/profile/liked/:id',
        component: () => import('../views/SubProfileLiked.vue'),
        name: 'sub-profile-liked',
      },
    ],
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
})

export default router
