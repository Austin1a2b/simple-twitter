<template>
  <div>
    <div v-for="like in likes" :key="like.TweetId" class="like-card row">
      <div class="col-2">
        <router-link
          class="avatar-container mt-3"
          :to="{ name: 'user-tweets', params: { id: like.Tweet.User.id } }"
        >
          <img
            class="avatar mr-2"
            :src="like.Tweet.User.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
            alt=""
          />
        </router-link>
      </div>

      <div class="col-10">
        <router-link
          class="row"
          style="text-decoration: none; cursor: pointer; color: #44444f"
          :to="{ name: 'tweetMessage', params: { id: like.TweetId } }"
        >
          <h5 class="user-name text-center">{{ like.Tweet.User.name }}</h5>
          <h6 class="account-time">
            @{{ like.Tweet.User.account }} · {{ like.createdAt | fromNow }}
          </h6>
        </router-link>
        <router-link
          class="row"
          style="text-decoration: none; cursor: pointer; color: #44444f"
          :to="{ name: 'tweetMessage', params: { id: like.TweetId } }"
        >
          <p>{{ like.Tweet.description }}</p>
        </router-link>
        <div class="row">
          <div class="icon-group mr-5">
            <img
              class="icon"
              src="https://i.postimg.cc/3Rb08d24/message.png"
              alt=""
              :id="like.TweetId"
              data-toggle="modal"
              :data-target="'#replyTwitterModal' + like.TweetId"
            />
            <p class="font-size-14 m-0">{{ like.replyCount }}</p>
          </div>
          <div class="icon-group">
            <img
              v-if="like.isLiked"
              @click.prevent.stop="addlike(like.TweetId)"
              class="icon"
              src="https://i.postimg.cc/YSdhRhnn/iconLike.png"
              alt=""
            />
            <img
              v-else
              @click.prevent.stop="unlike(like.TweetId)"
              class="icon"
              src="https://i.postimg.cc/DwdWWCqK/icon-Liked.png"
              alt=""
            />
            <p class="font-size-14 m-0">{{ like.likeCount }}</p>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div>
        <div
          class="modal fade"
          :id="'replyTwitterModal' + like.TweetId"
          tabindex="-1"
          role="dialog"
          aria-labelledby="replyTwitterModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
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
                    <img class="avatar" :src="like.Tweet.User.avatar" alt="" />
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
                        <span class="user-name">{{
                          like.Tweet.User.name
                        }}</span>
                        <span class="account-time"
                          >@{{ like.Tweet.User.account }} ·
                          {{ like.createdAt | fromNow }}
                        </span>
                      </div>
                      <p class="description">
                        {{ like.Tweet.description }}
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
                          @{{ like.Tweet.User.account }}
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
                        class="d-flex justify-content-end"
                        style="width: 430px"
                      >
                        <span
                          class="error-message"
                          v-show="replyMessage.length > 140"
                          >錯誤提示文字:字數不可超過140字
                        </span>
                        <span
                          class="error-message"
                          v-show="blankContent && replyMessage.length === 0"
                        >
                          錯誤提示文字:內容不可空白
                        </span>

                        <button
                          type="button"
                          @click.prevent.stop="postReplyHandler(like.TweetId)"
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
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { fromNowFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
import tweetsAPI from "./../apis/tweets.js";
import { mapState } from "vuex";

const dummyData = {
  likes: [
    {
      TweetId: 1,
      createdAt: new Date(),
      replyCount: 1,
      likeCount: 1,
      isLiked: true,
      Tweet: {
        description: "Nulla Lorem mollit cupidatat irure. Laborum magna",
        User: {
          id: 14,
          avatar: "https://loremflickr.com/280/280/admin",
          name: "Austin",
          account: "Austin",
        },
      },
    },
    {
      TweetId: 2,
      createdAt: new Date(),
      replyCount: 2,
      likeCount: 2,
      isLiked: true,
      Tweet: {
        description: "Nulla Lorem mollit cupidatat irure. Laborum magna",
        User: {
          id: 24,
          avatar: "https://loremflickr.com/280/280/admin",
          name: "Austin",
          account: "Austin",
        },
      },
    },
    {
      TweetId: 3,
      createdAt: new Date(),
      replyCount: 3,
      likeCount: 3,
      isLiked: true,
      Tweet: {
        description: "Nulla Lorem mollit cupidatat irure. Laborum magna",
        User: {
          id: 34,
          avatar: "https://loremflickr.com/280/280/admin",
          name: "Austin",
          account: "Austin",
        },
      },
    },
  ],
};

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      likes: [],
      replyMessage: "",
      isLike: "",
      blankContent: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const likedUserId = this.$route.params.id;
    // console.log("like this.$route.params.id", this.$route.params.id);
    this.fetchLikes(likedUserId);
  },
  methods: {
    async fetchLikes(userId) {
      try {
        const response = await usersAPI.getUserLikes(userId);
        // console.log("like response", response);
        const { data } = response;

        if (data.status === "error") {
          this.likes = [];
          throw new Error(data.message);
        }

        this.likes = data;

        // this.likes = dummyData.likes;
        // console.log("likes", this.likes);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "沒有喜歡的推文",
        });
        console.log(error);
      }
    },
    async addlike(tweetId) {
      try {
        const response = await tweetsAPI.likeTweet(tweetId);
        // console.log("addLike response", response);
        this.likes = this.likes.map((like) => {
          if (like.TweetId === tweetId) {
            return {
              ...like,
              likeCount: like.likeCount + 1,
              isLiked: true,
            };
          } else {
            return like;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async unlike(tweetId) {
      try {
        const response = await tweetsAPI.unlikeTweet(tweetId);
        // console.log("unlike response", response);
        this.likes = this.likes.map((like) => {
          if (like.TweetId === tweetId) {
            return {
              ...like,
              likeCount: like.likeCount - 1,
              isLiked: false,
            };
          } else {
            return like;
          }
        });
        this.likes = this.likes.filter((like) => like.TweetId !== tweetId);
      } catch (error) {
        console.log(error);
      }
    },
    async postReplyHandler(tweetId) {
      try {
        if (this.replyMessage.trim().length === 0) {
          this.blankContent = true;
          return;
        }
        if (this.replyMessage.length > 140) return;
        const response = await tweetsAPI.postTweetReply({
          tweetId: tweetId,
          comment: this.replyMessage,
        });
        this.likes = this.likes.map((like) => {
          if (like.id === tweetId) {
            return {
              ...like,
              replyCount: Number(like.replyCount) + 1,
            };
          } else {
            return like;
          }
        });
        this.replyMessage = "";
        this.blankContent = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.like-card {
  display: flex;
  border: solid 1px #e6ecf0;
  padding: 10px 20px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.avatar {
  max-width: 60px;
  align-self: center;
  border-radius: 50%;
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

.user-name:hover {
  cursor: pointer;
}
.user-name {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  line-height: 20px;
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

.avatar:hover {
  cursor: pointer;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.description:hover {
  cursor: pointer;
}
.description {
  font-family: "Roboto", sans-serif;
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

.modal-content {
  width: 500px;
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
.error-message {
  color: red;
}
</style>