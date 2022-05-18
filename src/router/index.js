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
    component: () => import('./../views/replyList')
  },
  {
    path: "/admin/tweet",
    name: "admimTweet",
    component: () => import('./../views/admimTweet')

  },

  // 以下為新增
  {
    path: "/admin/user",
    name: "admimUser",
    component: () => import('./../views/admimUser')

  },
  //以上為新增
  {
    path: '/home/:id',
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

export default router