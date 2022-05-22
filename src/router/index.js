import Vue from 'vue'
import VueRouter from 'vue-router'
import UserPage from './../views/UserPage'
import TweetCard from '@/components/TweetCard'
import ReplyCard from '@/components/ReplyCard'
import LikeCard from '@/components/LikeCard'
import NotFound from './../views/NotFound'
import login from "./../views/loginPage"
import UserFollowShip from "./../views/UserFollowShip"
import UserFollowers from "./../components/UserFollowers"
import UserFollowings from "./../components/UserFollowings"
import store from './../store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/users/',
    // name: 'user-page',
    component: UserPage,
    children: [
      {
        path: ':id/tweets',
        name: 'user-tweets',
        component: TweetCard
      },
      {
        path: ':id/replies',
        name: 'user-replies',
        component: ReplyCard
      },
      {
        path: ':id/likes',
        name: 'user-likes',
        component: LikeCard
      },
    ]
  },
  {
    path: '/users/',
    // name: 'user-page',
    component: UserFollowShip,
    children: [
      {
        path: ':id/followers',
        name: 'user-followers',
        component: UserFollowers
      },
      {
        path: ':id/followings',
        name: 'user-followings',
        component: UserFollowings
      },
    ]
  },
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('./../views/registPage'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('./../views/settingPage'),
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('./../views/adminLogin')
  },
  {
    path: '/home/tweet/:id',
    name: 'tweetMessage',
    component: () => import('./../views/replyPage')
  },
  {
    path: "/admin/tweet",
    name: "admimTweet",
    component: () => import('./../views/admimTweet')

  },
  {
    path: "/admin/user",
    name: "admimUser",
    component: () => import('./../views/admimUser')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('./../views/mainPage')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  let isAuthenticated = false

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (token) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['regist', 'login', 'adminLogin',]

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  // 拿掉!isAuthenticated &&
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }

  next()
})

export default router