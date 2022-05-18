<template>
  <div>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet-card">
      <img class="avatar mr-2" :src="tweet.User.avatar" alt="" />
      <div>
        <div @click="toReplyList(tweet.id)" class="d-flex">
          <h4>{{ tweet.User.name }}</h4>
          <p>@{{ tweet.User.account }} {{ tweet.createdAt | fromNow }}</p>
        </div>
        <p @click="toReplyList(tweet.id)">
          {{ tweet.description }}
        </p>
        <div class="d-flex">
          <div class="icon-group mr-5">
            <!-- 這邊 user_id 後續 可以用來 連結 到 該使用者 首頁  -->
            <img
              :id="tweet.user_id"
              class="icon"
              src="https://i.postimg.cc/3Rb08d24/message.png"
              alt=""
              data-toggle="modal"
              data-target="#replyTwitterModal"
            />
            <p class="font-size-14 m-0">{{ tweet.replyCount }}</p>
          </div>
          .
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

      <!-- Modal -->
      <div>
        <div
          class="modal fade"
          id="replyTwitterModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="replyTwitterModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  後續 不需要文字 且 將關閉"X"符號 往左邊移動
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div>
                <div class="d-flex">
                  <div>
                    <img class="avatar" :src="tweet.User.avatar" alt="" />
                  </div>
                  <div>
                    <div>
                      <span>{{ tweet.User.name }}</span>
                      <span> @{{ tweet.User.account }} </span>
                      <span>
                        {{ tweet.createdAt | fromNow }}
                      </span>
                    </div>
                    <p>{{ tweet.description }}</p>
                    <p>回覆給@{{ tweet.User.account }}</p>
                  </div>
                </div>
              </div>

              <form action="">
                <div>
                  <p>這邊要放當前使用者頭像</p>
                  <textarea
                    cols="40"
                    rows="5"
                    v-model="replyMessage"
                    placeholder="推你的回覆"
                    required
                  ></textarea>
                </div>
                <button
                  type="button"
                  @click.prevent.stop="postReplyHandler(tweet.id)"
                  class="btn btn-info btn-w64"
                >
                  推文
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
    </div>
  </div>
</template>

<script>
import tweetsAPI from "./../apis/tweets.js";
import { fromNowFilter } from "./../utils/mixins";

export default {
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
        const response = await tweetsAPI.getAllTweet();
        const { data } = response;
        this.tweets = data;
        console.log(this.tweets);
      } catch (error) {
        console.log(error);
      }
    },
    async addlike(tweetId) {
      try {
        const response = await tweetsAPI.likeTweet(tweetId);
        console.log(response);
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
        console.log(response);
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
        const response = await tweetsAPI.postTweetReply({
          tweetId: tweetId,
          description: this.replyMessage,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    toReplyList(tweetId) {
      console.log("toda");
      this.$router.push(`/home/tweet/${tweetId}`);
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