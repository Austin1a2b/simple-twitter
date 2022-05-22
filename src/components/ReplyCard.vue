<template>
  <div>
    <div v-for="reply in replies" :key="reply.id" class="reply-card row">
      <div class="col-2">
        <router-link
          class="avatar-container mt-3"
          :to="{ name: 'user-tweets', params: { id: reply.Tweet.User.id } }"
        >
          <img
            class="avatar"
            :src="reply.Tweet.User.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
            alt=""
          />
        </router-link>
      </div>
      <div class="col-10">
        <!-- <router-link
        class="col-11"
        :to="{ name: 'tweetMessage', params: { id: reply.id } }"
      > -->
        <div class="row pl-2">
          <h5 class="user-name">{{ reply.User.name }}</h5>
          <h6 class="account-time">
            @{{ reply.User.account }} · {{ reply.createdAt | fromNow }}
          </h6>
        </div>
        <div class="row pl-2">
          <span class="account-time" style="margin-left: 0px">回覆</span>
          <span
            class="repliedAccount"
            style="
              color: #ff6600;
              font-family: 'Roboto', sans-serif;
              margin-left: 5px;
              line-height: 22px;
            "
            >@{{ reply.Tweet.User.account }}</span
          >
        </div>
        <div class="row pl-2">
          <p class="comment">{{ reply.comment }}</p>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { fromNowFilter } from "./../utils/mixins";
import { Toast } from "./../utils/helpers";
const dummyData = {
  replies: [
    {
      id: 1,
      createdAt: new Date(),
      comment: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      Tweet: {
        User: {
          id: 14,
          avatar: "https://loremflickr.com/280/280/admin",
          account: "limecorner",
        },
      },
      User: {
        name: "limecorner",
        account: "limecorner",
      },
    },
    {
      id: 2,
      createdAt: new Date(),
      comment: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      Tweet: {
        User: {
          id: 24,
          avatar: "https://loremflickr.com/280/280/admin",
          account: "limecorner",
        },
      },
      User: {
        name: "limecorner",
        account: "limecorner",
      },
    },
    {
      id: 3,
      createdAt: new Date(),
      comment: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      Tweet: {
        User: {
          id: 34,
          avatar: "https://loremflickr.com/280/280/admin",
          account: "limecorner",
        },
      },
      User: {
        name: "limecorner",
        account: "limecorner",
      },
    },
  ],
};

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      replies: [],
    };
  },
  created() {
    const repliedUserId = this.$route.params.id;
    // console.log("reply this.$route.params.id", repliedUserId);
    this.fetchReplies(repliedUserId);
  },
  methods: {
    async fetchReplies(userId) {
      try {
        const response = await usersAPI.getUserReplies(userId);
        // console.log("reply response", response);
        const { data } = response;

        if (data.status === "error") {
          this.replies = [];
          throw new Error(data.message);
        }

        this.replies = data;

        // this.replies = dummyData.replies;
        // console.log("replies", this.replies);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "沒有回覆過的推文",
        });
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
.reply-card {
  display: flex;
  border: solid 1px #e6ecf0;
  padding: 10px 10px;
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

.user-name:hover {
  /* cursor: pointer; */
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

.icon-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 38px;
}

.icon:hover {
  /* cursor: pointer; */
}
.icon {
  width: 13px;
  height: 13px;
}

.comment:hover {
  /* cursor: pointer; */
}
.comment {
  font-family: "Roboto", sans-serif;
}

.repliedAccount:hover {
  /* cursor: pointer; */
}
</style>