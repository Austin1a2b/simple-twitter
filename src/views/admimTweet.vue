<template>
  <div>
    <div>
      <adminNavbar />
    </div>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet-card">
      <img class="avatar mr-2" :src="tweet.User.avatar" alt="" />
      <div>
        <div class="d-flex">
          <h4>{{ tweet.User.name }}</h4>
          <p>@{{ tweet.User.account }} {{ tweet.createdAt | fromNow }}</p>
        </div>
        <p>
          {{ tweet.description }}
        </p>
        <span @click.prevent.stop="deleteTweet(tweet.id)">
          刪除 該貼文功能 (後續要改為 "X" 圖示)
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from "./../apis/admin.js";
import { fromNowFilter } from "./../utils/mixins";
import adminNavbar from "./../components/adminNavbar.vue";

export default {
  components: {
    adminNavbar,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      tweets: [],
      replyMessage: "",
      isLike: "",
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.adminGetTweets();
        const { data } = response;
        this.tweets = data.tweets;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTweet(tweetId) {
      try {
        const response = await adminAPI.deleteTweets(tweetId);
        console.log(response);
        // 要再補上 刷新頁面的方法
        // const { data } = response;
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.tweet-card {
  display: flex;
  border: solid 1px #e6ecf0;
  padding: 10px 20px;
  margin: 0px 300px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.icon-group {
  outline: solid 1px green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 38px;
}

.icon {
  width: 13px;
  height: 13px;
}
</style>