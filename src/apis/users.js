import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets(userId) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserReplies(userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLikes(userId) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserFollowers(userId) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserFollowings(userId) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  //// 以下為 新增 
  getAccountInfo() {
    return apiHelper.get('/users/setting', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  putAccountInfo({ data }) {
    console.log('inapi')
    console.log({ ...data })
    return apiHelper.put(`/users/setting`, { ...data }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getTopUsers() {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  addFollowing(followingId) {
    return apiHelper.post('/followships', { id: followingId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  cancelFollowing(id) {
    return apiHelper.delete(`followships/${id
      }`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }

}