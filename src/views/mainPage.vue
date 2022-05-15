<template>
  <div class="user-page d-flex justify-content-between border border-secondary">
    <!-- NavBar -->
    <NavBar />

    <!-- home twitter -->
    <section class="user-section">
      <div class="home-title">首頁</div>
      <div class="d-flex">
        <img
          class="avatar mr-1"
          src="https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2020/07/04/20200704-125106_U5965_M622512_2945.png?itok=jD_-1XjG"
          alt=""
        />
        <form>
          <textarea
            required
            cols="40"
            rows="3"
            class="form-control"
            placeholder="有什麼新鮮事？"
            aria-label="With textarea"
            v-model="twitterMessage"
          >
          </textarea>
          <button
            type="submit"
            class="btn btn-info btn-w88"
            :disabled="!twitterMessage.length || activeTwitterMessageBotton"
            @click.prevent.stop="submittwitterMessage"
          >
            {{ activeTwitterMessageBotton ? "處理中" : "推文" }}
          </button>
        </form>
      </div>
      <!-- 巢狀路由 -->

      <TweetCardAll />
    </section>

    <!-- PopularUsers -->
    <PopularUsers class="popular-users" />
  </div>
</template>

<script>
import NavBar from "./../components/NavBar.vue";
import PopularUsers from "./../components/PopularUsers.vue";
import TweetCardAll from "./../components/TweetCardAll.vue";
import tweetsAPI from "./../apis/tweets.js";

export default {
  components: {
    NavBar,
    PopularUsers,
    TweetCardAll,
  },
  data() {
    return {
      twitterMessage: "",
      activeTwitterMessageBotton: false,
    };
  },
  methods: {
    async submittwitterMessage() {
      this.activeTwitterMessageBotton = true;
      console.log(this.twitterMessage);
      /// 以下程式碼 設定 將資料 傳給伺服器
      const response = await tweetsAPI.postTweet(this.twitterMessage);
      console.log(response);
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .user-page {
    max-width: 960px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1200px) {
  .user-page {
    max-width: 1140px;
  }
}

/* 大區塊 */
.user-page {
  border: solid 1px;
}

.popular-users {
  width: 25%;
}

/*照片 */

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

/* 巢狀路由 */
.router-link-exact-active {
  color: #ff6600;
  border-bottom: solid 1px #ff6600;
}
</style>