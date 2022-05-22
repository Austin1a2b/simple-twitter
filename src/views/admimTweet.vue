<template>
  <div>
    <div>
      <adminNavbar />
    </div>
    <div class="list-wrapper">
      <div class="tweet-card font-size-24 font-weight-bolder">推文清單</div>
      <div
        style="height: 110px"
        v-for="tweet in tweets"
        :key="tweet.id"
        class="tweet-card row"
      >
        <div class="col-1">
          <img
            class="avatar"
            :src="tweet.User.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
            alt=""
          />
        </div>

        <div class="col-10 pl-5">
          <div class="row">
            <h5 class="user-name">{{ tweet.User.name }}</h5>
            <h6 class="account-time">
              @{{ tweet.User.account }} • {{ tweet.createdAt | fromNow }}
            </h6>
          </div>
          <div class="row">
            <p class="description">
              {{ tweet.description | wordsLimit }}
            </p>
          </div>
        </div>

        <div class="col-1" style="padding: 5px 0px">
          <div class="d-flex justify-content-end">
            <!-- Modal -->
            <img
              class="iconX mr-3 mt-1"
              src="https://i.postimg.cc/CxWv1xH2/X-button.png"
              alt=""
              data-toggle="modal"
              :data-target="'#deleteTweet' + tweet.id"
            />

            <!-- Modal -->
            <div
              class="modal fade"
              :id="'deleteTweet' + tweet.id"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">是否刪除該筆貼文</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="deleteTweet(tweet.id)"
                    >
                      確定刪除
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from "./../apis/admin.js";
import { fromNowFilter } from "./../utils/mixins";
import adminNavbar from "./../components/adminNavbar.vue";
import $ from "jquery";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      tweets: [],
      replyMessage: "",
      isLike: "",
    };
  },
  components: {
    adminNavbar,
  },
  mixins: [fromNowFilter],
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
        this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
        $(`#deleteTweet${tweetId}`).modal("hide");

        Toast.fire({
          icon: "success",
          title: "已成功刪除貼文",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  filters: {
    wordsLimit(description) {
      if (description.length < 50) {
        return description;
      } else {
        description = description.substr(0, 50) + "...";
        return description;
      }
    },
  },
};
</script>

<style scoped>
.list-wrapper {
  margin-left: 100px;
}

.tweet-card {
  border: solid 1px #e6ecf0;
  padding: 10px 0px 2px 10px;
  margin: 0px 300px;
}

.user-name:hover {
  cursor: pointer;
}
.user-name {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}

.account-time:hover {
  color: #808080;
  cursor: default;
}
.account-time {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #92929d;
  margin-left: 5px;
}

.iconX:hover {
  cursor: pointer;
}
.iconX {
  width: 15px;
  margin-right: 1px;
  background-blend-mode: lighten;
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