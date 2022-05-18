<template>
  <div>
    <div v-for="reply in replies" :key="reply.id" class="tweet-card">
      <img class="avatar mr-2" :src="reply.User.avatar" alt="" />
      <div>
        <div class="d-flex">
          <h4>{{ reply.User.name }}</h4>
          <p>@{{ reply.User.account }} {{ reply.createdAt | fromNow }}</p>
        </div>

        <div>
          <p>回覆@{{ postTweetAccount }}</p>
        </div>

        <div>
          <p>
            {{ reply.comment }}
          </p>
        </div>

        <div class="d-flex">
          <div class="icon-group mr-5">
            <img
              class="icon"
              src="https://i.postimg.cc/3Rb08d24/message.png"
              alt=""
            />
            <p class="font-size-14 m-0">13</p>
          </div>

          <div class="icon-group">
            <img
              class="icon"
              src="https://i.postimg.cc/YSdhRhnn/iconLike.png"
              alt=""
            />
            <img
              class="icon"
              src="https://i.postimg.cc/DwdWWCqK/icon-Liked.png"
              alt=""
            />
            <p class="font-size-14 m-0">76</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tweetsAPI from "./../apis/tweets.js";
import { fromNowFilter } from "../utils/mixins";

export default {
  props: {
    postTweetAccount: {
      type: String,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  data() {
    return {
      replies: [],
    };
  },
  created() {
    const tweetId = this.$route.params.id;
    this.fetchTweetReplies(tweetId);
  },
  methods: {
    async fetchTweetReplies(tweetId) {
      try {
        const response = await tweetsAPI.getTweetreplies(tweetId);
        // 後續 資料 會再更動
        const data = response.data;
        this.replies = data;
        console.log(this.replies);
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