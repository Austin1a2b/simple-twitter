import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      introduction: '',
      avatar: '',
      cover_image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    // 新增 token 屬性
    token: ''
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const response = await usersAPI.getCurrentUser()
        // console.log('fetchCurrentUser', response)

        const { account, avatar, cover_image, folloingCount, followerCount, id, introduction, name, tweetCount } = response.data.user

        commit('setCurrentUser', {
          account, avatar, cover_image, folloingCount, followerCount, id, introduction, name, tweetCount
        })
        return true
      } catch (error) {
        console.log('can not fetch current user information, if you are an admin, it is ok')
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        // commit('revokeAuthentication')
        // return false
        return true
      }
    }

  },

  modules: {
  }
})
