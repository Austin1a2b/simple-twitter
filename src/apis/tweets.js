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
    console.log('add , tweetId', tweetId)
    return apiHelper.post(`/tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  unlikeTweet(tweetId) {
    console.log('tweetId', tweetId)
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweetReply({ tweetId, comment }) {
    console.log(`comment`, comment)
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweet(description) {
    return apiHelper.post('/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },


}

