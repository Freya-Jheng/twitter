import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import AdminSignin from '../views/AdminSignin.vue'
import store from './../store'

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
    component: () => import('../views/AdminHome.vue'),
    children: [
      {
        path: '/admin/tweets',
        name: 'admin-tweets',
        component: () => import('../components/AdminTweets.vue'),
      },
      {
        path: '/admin/users',
        name: 'admin-users',
        component: () => import('../components/AdminUsers.vue'),
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
    path: '/profile/tweets/:id/',
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
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated

  // ????????? token?????? token ????????????????????????????????????
  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathWithoutAuthentication = ['sign-in', 'sign-up', 'adminSignin']

  const adminWithAuthentication = [
    'admin',
    'admin-home',
    'admin-tweets',
    'admin-users',
  ]

  // ???????????????????????????????????? sign-in ??????
  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }

  // ?????? user ??????????????????????????? home ??????
  if (
    isAuthenticated &&
    pathWithoutAuthentication.includes(to.name) &&
    store.state.currentUser.role === 'user'
  ) {
    next('/home')
    return
  }

  // ????????? user ????????? admin ????????????????????? home ??????
  if (
    isAuthenticated &&
    adminWithAuthentication.includes(to.name) &&
    store.state.currentUser.role === 'user'
  ) {
    next('/home')
    return
  }

  // ?????? admin ??????????????????????????? admin-tweets ??????
  if (
    isAuthenticated &&
    pathWithoutAuthentication.includes(to.name) &&
    store.state.currentUser.role === 'admin'
  ) {
    next('/admin/tweets')
    return
  }

  // ????????? admin ????????? user ????????????????????? admin-tweets ??????
  if (
    isAuthenticated &&
    !adminWithAuthentication.includes(to.name) &&
    store.state.currentUser.role === 'admin'
  ) {
    next('/admin/tweets')
    return
  }

  next()
})

export default router
