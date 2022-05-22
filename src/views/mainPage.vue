<template>
  <div class="user-page d-flex">
    <!-- NavBar -->
    <NavBar @modal-sbmit="submitTweetMessageModal" />

    <!-- home twitter -->
    <section class="user-section">
      <div class="card col" style="z-index: 1">
        <div class="row card-header title">首頁</div>

        <div class="row">
          <div class="col-1">
            <img class="avatar mt-2" :src="currentUser.avatar" alt="" />
          </div>

          <div class="col-11">
            <form>
              <div class="d-flex pt-2">
                <textarea
                  class="mt-2"
                  required
                  cols="35"
                  rows="5"
                  placeholder="有什麼新鮮事？"
                  aria-label="With textarea"
                  v-model="tweetMessage"
                >
                </textarea>
              </div>
              <div class="d-flex justify-content-end align-items-center mb-3">
                <div class="mr-4">
                  <span class="error-notice" v-show="tweetMessage.length > 140">
                    字數不可超過140字
                  </span>
                  <span
                    class="error-notice"
                    v-show="blankContent && tweetMessage.length === 0"
                  >
                    內容不可空白
                  </span>
                </div>
                <button
                  type="submit"
                  class="tweet-btn"
                  @click.prevent.stop="submitTweetMessage"
                >
                  推文
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col" style="height: 10px; background: #f0f8ff"></div>

      <!-- 巢狀路由 -->
      <div class="col">
        <div v-for="tweet in tweets" :key="tweet.id" class="tweet-card row">
          <div class="col-1">
            <router-link
              class="avatar-container"
              :to="{
                name: 'user-tweets',
                params: { id: tweet.UserId },
              }"
            >
              <img class="avatar" :src="tweet.User.avatar" alt="" />
            </router-link>
          </div>

          <div class="col-11">
            <div
              @click="toReplyList(tweet.id)"
              style="cursor: pointer"
              class="row ml-1"
            >
              <h5 class="user-name text-center">{{ tweet.User.name }}</h5>
              <h6 class="account-time">
                @{{ tweet.User.account }} · {{ tweet.createdAt | fromNow }}
              </h6>
            </div>

            <div class="row ml-1" style="cursor: pointer">
              <p @click="toReplyList(tweet.id)" class="description">
                {{ tweet.description }}
              </p>
            </div>

            <div class="row">
              <div class="d-flex">
                <div class="icon-group mr-5">
                  <img
                    :id="tweet.id"
                    class="icon"
                    src="https://i.postimg.cc/3Rb08d24/message.png"
                    alt=""
                    data-toggle="modal"
                    :data-target="'#replyTweeterModal' + tweet.id"
                  />

                  <p class="font-size-14 m-0">{{ tweet.replyCount }}</p>
                </div>

                <div class="icon-group">
                  <img
                    v-if="!tweet.isLiked"
                    class="icon"
                    src="https://i.postimg.cc/YSdhRhnn/iconLike.png"
                    alt=""
                    @click.prevent.stop="addlike(tweet.id)"
                  />
                  <img
                    v-else
                    @click.prevent.stop="unlike(tweet.id)"
                    class="icon"
                    src="https://i.postimg.cc/DwdWWCqK/icon-Liked.png"
                    alt=""
                  />
                  <p class="font-size-14 m-0">{{ tweet.likeCount }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div>
            <div
              class="modal fade"
              :id="'replyTweeterModal' + tweet.id"
              tabindex="-1"
              role="dialog"
              aria-labelledby="replyTweeterModal"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <div>
                      <button
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>

                  <div class="row p-2">
                    <div class="col-1">
                      <div class="avatar-container pl-4">
                        <img class="avatar" :src="tweet.User.avatar" alt="" />
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
                            <span class="user-name">{{ tweet.User.name }}</span>
                            <span class="account-time"
                              >@{{ tweet.User.account }} ·
                              {{ tweet.createdAt | fromNow }}</span
                            >
                          </div>
                          <p class="description">
                            {{ tweet.description }}
                          </p>

                          <p class="account-time">
                            回覆給
                            <span
                              class="repliedAccount"
                              style="
                                color: #ff6600;
                                font-family: 'Roboto', sans-serif;
                                line-height: 22px;
                              "
                            >
                              @{{ tweet.User.account }}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="p-2 row">
                    <div class="col-1">
                      <div class="avatar-container pl-4">
                        <img class="avatar" :src="currentUser.avatar" alt="" />
                      </div>
                    </div>
                    <div class="col-11">
                      <div class="d-flex justify-content-center">
                        <form class="pl-3">
                          <textarea
                            cols="45"
                            rows="8"
                            v-model="replyMessage"
                            placeholder="推你的回覆"
                            required
                          ></textarea>

                          <div
                            class="
                              d-flex
                              justify-content-end
                              align-items-center
                              mb-3
                            "
                            style="width: 430px"
                          >
                            <div class="mr-3">
                              <span
                                class="error-notice"
                                v-show="replyMessage.length > 140"
                              >
                                字數不可超過140字
                              </span>
                              <span
                                class="error-notice"
                                v-show="
                                  blankContent && replyMessage.length === 0
                                "
                              >
                                內容不可空白
                              </span>
                            </div>
                            <button
                              type="button"
                              @click="postReplyHandler(tweet.id)"
                              class="replyBtn"
                            >
                              推文
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
import tweetsAPI from "./../apis/tweets.js";
import { fromNowFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import $ from "jquery";

export default {
  mixins: [fromNowFilter],
  components: {
    NavBar,
    PopularUsers,
  },
  data() {
    return {
      tweetMessage: "",
      tweets: [],
      replyMessage: "",
      isLike: "",
      blankContent: false,
    };
  },
  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await tweetsAPI.getAllTweet();
        const { data } = response;
        this.tweets = data;
      } catch (error) {
        console.log(error);
      }
    },
    async submitTweetMessage() {
      try {
        if (this.tweetMessage.trim().length === 0) {
          this.blankContent = true;
          return;
        } else if (this.tweetMessage.length > 140) {
          return;
        }
        const response = await tweetsAPI.postTweet(this.tweetMessage);
        const newTweet = response.data.newTweet;
        this.tweets.unshift({
          User: {
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
            name: this.currentUser.name,
          },
          UserId: newTweet.UserId,
          createdAt: newTweet.createdAt,
          description: newTweet.description,
          id: newTweet.id,
          isLiked: false,
          isReplied: false,
          likeCount: 0,
          replyCount: 0,
        });
        this.tweetMessage = "";
        this.blankContent = false;
      } catch (error) {
        console.log(error);
      }
    },
    async submitTweetMessageModal(modalMessage) {
      this.tweetMessage = modalMessage;
      try {
        const response = await tweetsAPI.postTweet(this.tweetMessage);
        const newTweet = response.data.newTweet;
        this.tweets.unshift({
          User: {
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
            name: this.currentUser.name,
          },
          UserId: newTweet.UserId,
          createdAt: newTweet.createdAt,
          description: newTweet.description,
          id: newTweet.id,
          isLiked: false,
          isReplied: false,
          likeCount: 0,
          replyCount: 0,
        });
        this.tweetMessage = "";
      } catch (error) {
        console.log(error);
      }
    },
    async addlike(tweetId) {
      try {
        const response = await tweetsAPI.likeTweet(tweetId);
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              likeCount: tweet.likeCount + 1,
              isLiked: !tweet.isLiked,
            };
          } else {
            return tweet;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async unlike(tweetId) {
      try {
        const response = await tweetsAPI.unlikeTweet(tweetId);
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              likeCount: tweet.likeCount - 1,
              isLiked: !tweet.isLiked,
            };
          } else {
            return tweet;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async postReplyHandler(tweetId) {
      try {
        if (this.replyMessage.trim().length === 0) {
          this.blankContent = true;
          return;
        } else if (this.replyMessage.length > 140) {
          return;
        }
        const response = await tweetsAPI.postTweetReply({
          tweetId: tweetId,
          comment: this.replyMessage,
        });
        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              replyCount: Number(tweet.replyCount) + 1,
            };
          } else {
            return tweet;
          }
        });
        this.replyMessage = "";
        this.blankContent = false;
        // 增加關閉 事件
        $(`#replyTweeterModal${tweetId}`).modal("hide");
      } catch (error) {
        console.log(error);
      }
    },
    toReplyList(tweetId) {
      this.$router.push(`/home/tweet/${tweetId}`);
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

.user-name:hover {
  cursor: pointer;
}
.user-name {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  line-height: 20px;
}

.title {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  background: white;
}

.popular-users {
  width: 22%;
}

/*照片 */

.avatar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.avatar:hover {
  cursor: pointer;
}
.avatar {
  width: 50px;
  height: 50px;
  align-self: center;
  border-radius: 50%;
}

/* 巢狀路由 */
.router-link-exact-active {
  color: #ff6600;
  border-bottom: solid 1px #ff6600;
}

.tweet-card {
  display: flex;
  border: solid 1px #e6ecf0;
  padding: 10px 10px;
}

.icon-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 38px;
}

.icon:hover {
  cursor: pointer;
}
.icon {
  width: 13px;
  height: 13px;
}

textarea {
  outline: none;
  resize: none;
  border-color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: black;
}
textarea::placeholder {
  font-family: "Roboto", sans-serif;
  color: #92929d;
  font-weight: 600;
  font-size: 16px;
}

.tweet-btn {
  width: 12%;
  height: 40px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

.account-time:hover {
  color: #808080;
  cursor: default;
}
.account-time {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #92929d;
  margin-left: 5px;
  line-height: 22px;
}

.description:hover {
  cursor: default;
}
.description {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}

/* modal */
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

.replyBtn {
  outline: none;
  width: 15%;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}
</style>