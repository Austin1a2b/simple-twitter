import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')


export default {
  adminGetTweets() {
    return apiHelper.get('/admin/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteTweets(tweetId) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  adminGetUsersList() {
    return apiHelper.get('admin/users', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}