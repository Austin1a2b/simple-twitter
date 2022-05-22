<template>
  <div class="user-page d-flex justify-content-between">
    <!-- NavBar -->
    <NavBar />

    <!-- 顯示 詳細推文  -->
    <section class="col ml-2 center-area">
      <div class="title card-header row">
        <span class="arrow mr-2" style="cursor: pointer" @click="$router.back()"
          >←</span
        >推文
      </div>
      <div class="row pl-3 pt-2">
        <div class="d-flex flex-row justify-content-around">
          <router-link
            class="avatar-container"
            :to="{ name: 'user-tweets', params: { id: UserId } }"
          >
            <img class="avatar mr-2" :src="user.avatar" alt="" />
          </router-link>
          <div class="d-flex flex-column justify-content-around">
            <div class="user-name">{{ user.name }}</div>
            <div class="account-time">@{{ user.account }}</div>
          </div>
        </div>
      </div>

      <div class="description row pl-3">
        <p>{{ tweet.description }}</p>
      </div>

      <span class="row pl-3 mb-1 time">
        <!-- {{ tweet.createdAt }} -->
        {{ timeAt }}
      </span>
      <hr />
      <div class="row pl-3 pt-2 pb-2 d-flex">
        <span>{{ tweet.replyCount }} <span class="reply-like">回覆</span></span>
        <span class="ml-5"
          >{{ tweet.likeCount }} <span class="reply-like">喜歡次數</span></span
        >
      </div>
      <hr />
      <div class="card-header row d-flex justify-content-start">
        <img
          class="icon mr-5"
          src="https://i.postimg.cc/3Rb08d24/message.png"
          alt=""
          data-toggle="modal"
          data-target="#replyTweeterModal"
        />
        <img
          v-if="!tweet.isLiked"
          class="icon ml-5"
          src="https://i.postimg.cc/YSdhRhnn/iconLike.png"
          alt=""
          @click.prevent.stop="addlike(tweet.id)"
        />
        <img
          v-else
          @click.prevent.stop="unlike(tweet.id)"
          class="icon ml-5"
          src="https://i.postimg.cc/DwdWWCqK/icon-Liked.png"
          alt=""
        />
      </div>
      <!-- Modal -->
      <div>
        <div
          class="modal fade"
          id="replyTweeterModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="replyTweeterModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content pl-1">
              <div class="modal-header">
                <div>
                  <button class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>

              <div class="row p-2">
                <div class="col-1">
                  <div class="avatar-container pl-4">
                    <img class="avatar" :src="user.avatar" alt="" />
                  </div>
                  <div
                    class="ml-4 mt-3"
                    style="border-left: 2px solid #92929d; height: 45%"
                  ></div>
                </div>

                <div class="col-11">
                  <div class="row pl-4">
                    <div>
                      <div>
                        <span class="user-name pl-2">{{ user.name }}</span>
                        <span class="account-time pl-2"
                          >@{{ user.account }} ·
                          {{ tweet.createdAt | fromNow }}</span
                        >
                      </div>

                      <p class="description pl-2">
                        {{ tweet.description }}
                      </p>

                      <p class="account-time pl-2">
                        回覆給
                        <span
                          class="repliedAccount"
                          style="
                            color: #ff6600;
                            font-family: 'Roboto', sans-serif;
                            line-height: 22px;
                          "
                        >
                          @{{ user.account }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-2 row mt-2">
                <div class="col-1">
                  <div class="avatar-container pl-4">
                    <img class="avatar" :src="currentUser.avatar" alt="" />
                  </div>
                </div>
                <div class="col-11">
                  <div class="d-flex justify-content-center">
                    <form class="pl-4">
                      <textarea
                        cols="45"
                        rows="8"
                        v-model="replyMessage"
                        placeholder="推你的回覆"
                        required
                      ></textarea>
                      <div
                        class="d-flex justify-content-end"
                        style="width: 410px"
                      >
                        <span
                          class="error-notice"
                          v-show="replyMessage.length > 140"
                          >字數不可超過140字
                        </span>
                        <span
                          class="error-notice"
                          v-show="blankContent && replyMessage.length === 0"
                        >
                          內容不可空白
                        </span>

                        <button
                          type="button"
                          @click.prevent.stop="postReplyHandler()"
                          class="replyBtn"
                        >
                          回覆
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->

      <!-- 巢狀路由 -->
      <div>
        <div v-for="reply in replies" :key="reply.id" class="tweet-card row">
          <div class="col-1">
            <router-link
              class="avatar-container"
              :to="{
                name: 'user-tweets',
                params: { id: reply.UserId },
              }"
            >
              <img class="avatar" :src="reply.User.avatar" alt="" />
            </router-link>
          </div>

          <div class="col-11 pl-4">
            <div class="row">
              <h5 class="user-name font-size-16">{{ reply.User.name }}</h5>
              <h6 class="account-time ml-2">
                @{{ reply.User.account }} {{ reply.createdAt | fromNow }}
              </h6>
            </div>

            <div class="row d-flex align-items-center">
              <span class="time">回覆</span>
              <span
                class="reply-like ml-1"
                style="color: #ff6600; font-weight: 400"
              >
                @{{ user.account }}</span
              >
            </div>
            <div class="row">
              <p class="description">
                {{ reply.comment }}
              </p>
            </div>
            <div class="row">
              <div class="icon-group mr-5">
                <img
                  class="icon"
                  style="width: 15px; height: 15px"
                  src="https://i.postimg.cc/3Rb08d24/message.png"
                  alt=""
                />
                <p class="font-size-14 m-0">13</p>
              </div>

              <div class="icon-group">
                <img
                  class="icon"
                  style="width: 15px; height: 15px"
                  src="https://i.postimg.cc/YSdhRhnn/iconLike.png"
                  alt=""
                />
                <img
                  v-if="false"
                  class="icon"
                  style="width: 15px; height: 15px"
                  src="https://i.postimg.cc/DwdWWCqK/icon-Liked.png"
                  alt=""
                />
                <p class="font-size-14 m-0">76</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 巢狀路由 -->
    </section>
    <!-- PopularUsers -->
    <PopularUsers class="popular-users" />
  </div>
</template>

<script>
import NavBar from "./../components/NavBar.vue";
import PopularUsers from "./../components/PopularUsers.vue";
import { mapState } from "vuex";
import { fromNowFilter } from "./../utils/mixins";
import $ from "jquery";
import tweetsAPI from "./../apis/tweets.js";
import moment from "moment";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  components: {
    NavBar,
    PopularUsers,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      tweetId: "",
      tweet: {},
      replyMessage: "",
      user: {
        account: "",
        avatar: "",
        name: "",
      },
      UserId: "",
      replies: [],
      blankContent: false,
      timeAt: "",
    };
  },
  methods: {
    async fetchTweetData(tweetId) {
      try {
        const response = await tweetsAPI.getTweetDetail(tweetId);
        const { data } = response;
        this.tweet = data;
        this.user = {
          account: data.User.account,
          avatar: data.User.avatar,
          name: data.User.name,
        };
        this.UserId = data.UserId;
        //  時間格式調整
        const time = moment(this.tweet.createdAt).format(
          "YYYY MM D, hh:mm:ss a"
        );
        const year = time.substr(0, 4);
        const month = time.substr(5, 2);
        const date = time.substr(8, 2);
        const hour = Number(time.substr(12, 2));
        const min = time.substr(15, 2);
        let AMPM = time.substr(-2, 2);
        if (AMPM === "pm") {
          AMPM = "下午";
        } else {
          AMPM = "上午";
        }
        const timeAt = `${AMPM}${hour}:${min}分・${year}年${month}月${date}日`;
        this.timeAt = timeAt;
      } catch (error) {
        console.log(error);
      }
    },
    async postReplyHandler() {
      try {
        if (this.replyMessage.trim().length === 0) {
          this.blankContent = true;
          return;
        } else if (this.replyMessage.length > 140) {
          return;
        }
        const response = await tweetsAPI.postTweetReply({
          tweetId: this.tweetId,
          comment: this.replyMessage,
        });

        if (response.statusText !== "OK") {
          return;
        }
        this.replies.unshift({
          TweetId: this.tweetId,
          User: {
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
            name: this.currentUser.name,
          },
          UserId: this.currentUser.id,
          comment: this.replyMessage,
          createdAt: new Date(),
        });
        this.tweet.replyCount = this.tweet.replyCount + 1;
        this.replyMessage = "";
        this.blankContent = false;
        $("#replyTweeterModal").modal("hide");
      } catch (error) {
        console.log(error);
      }
    },
    async addlike(tweetId) {
      try {
        const response = await tweetsAPI.likeTweet(tweetId);
        if (response.statusText === "OK") {
          this.tweet.likeCount = this.tweet.likeCount + 1;
        }
        this.tweet.isLiked = true;
      } catch (error) {
        console.log(error);
      }
    },
    async unlike(tweetId) {
      try {
        const response = await tweetsAPI.unlikeTweet(tweetId);
        if (response.statusText === "OK") {
          this.tweet.likeCount = this.tweet.likeCount - 1;
        }
        this.tweet.isLiked = false;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTweetReplies(tweetId) {
      try {
        const response = await tweetsAPI.getTweetreplies(tweetId);
        this.replies = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.tweetId = this.$route.params.id;
    this.fetchTweetData(this.tweetId);
    this.fetchTweetReplies(this.tweetId);
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
.popular-users {
  width: 22%;
}

.center-area {
  border: solid #e6ecf0 1px;
  border-top: 0px;
}

.title {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  background: white;
  border: solid #e6ecf0 1px;
  border-top: 0px;
}

.arrow:hover {
  cursor: pointer;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.avatar:hover {
  cursor: pointer;
}
.avatar {
  width: 60px;
  height: 60px;
  align-self: center;
  border-radius: 50%;
}

.icon:hover {
  cursor: pointer;
}
.icon {
  width: 30px;
  height: 30px;
}

.user-name:hover {
  cursor: pointer;
}
.user-name {
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
}

.account-time:hover {
  color: #808080;
  cursor: default;
}
.account-time {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #92929d;
  line-height: 22px;
}
.time {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #92929d;
}
.reply-like {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #86868b;
}

.description:hover {
  cursor: default;
}
.description {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

/* 巢狀路由 */
.router-link-exact-active {
  color: #ff6600;
  border-bottom: solid 1px #ff6600;
}

.icon-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 38px;
}
.tweet-card {
  display: flex;
  border-bottom: solid 1px #e6ecf0;
  padding: 10px 20px;
}

.card-header {
  background: white;
}

.replyBtn {
  outline: none;
  width: 15%;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

textarea {
  margin-top: 10px;
  outline: none;
  resize: none;
  border-color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #92929d;
}
textarea::placeholder {
  font-family: "Roboto", sans-serif;
  color: #92929d;
  font-weight: 400;
  font-size: 14px;
}

.close {
  color: orangered;
  font-size: 45px;
  line-height: 18px;
  padding-left: 5px;
}
.modal-header {
  height: 50px;
  padding-left: 0px;
}

.modal-content {
  width: 500px;
}
</style>