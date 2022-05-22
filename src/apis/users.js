import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser(userId) { // ClickedUser
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
  addUserFollowing(followerId) {
    return apiHelper.post(`/followships`, { id: followerId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteUserFollowing(followingId) {
    return apiHelper.delete(`/followships/${followingId
      }`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getCurrentUser() {
    return apiHelper.get(`/users/login_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getOriginalInfo() {
    return apiHelper.get(`/users/edit_page`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  editCurrentUserInfo(userId, formData) {
    return apiHelper.put(`/users/${userId
      }`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getAccountInfo() {
    return apiHelper.get('/users/setting', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  putAccountInfo({ data }) {
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