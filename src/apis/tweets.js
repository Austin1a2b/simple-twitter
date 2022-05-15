import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')


export default {

  getAllTweet() {
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },


  getTweetDetail(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweetreplies(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },


  likeTweet(tweetId) {
    console.log('tweetId', tweetId)
    return apiHelper.post(`/tweets/${tweetId}/like`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  unlikeTweet(tweetId) {
    console.log('tweetId', tweetId)
    return apiHelper.post(`/tweets/${tweetId}/unlike`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweetReply({ tweetId, description }) {
    console.log('tweetId', tweetId)
    console.log(`description`, description)
    return apiHelper.post(`/tweets/${tweetId}/replies`, description, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweet(description) {
    return apiHelper.post('/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },


}

