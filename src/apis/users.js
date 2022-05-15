import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserReply(userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLike(userId) {
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


  // 跟對方要程式碼 避免覆蓋對方檔案 

}