<template>
  <div>
    <div v-for="like in likes" :key="like.id" class="like-card">
      <img
        class="avatar mr-2"
        src="https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2020/07/04/20200704-125106_U5965_M622512_2945.png?itok=jD_-1XjG"
        alt=""
      />
      <div>
        <div class="d-flex">
          <h4>{{ like.name }}</h4>
          <p>{{ like.account }} {{ like.createdAt | fromNow }}</p>
        </div>
        <p>
          {{ like.tweetText }}
        </p>
        <div class="d-flex">
          <div class="icon-group mr-5">
            <img
              class="icon"
              src="https://i.postimg.cc/3Rb08d24/message.png"
              alt=""
            />
            <p class="font-size-14 m-0">{{ like.replyCount }}</p>
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
            <p class="font-size-14 m-0">{{ like.likeCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { fromNowFilter } from "./../utils/mixins";
const dummyData = {
  likes: [
    {
      id: 1,
      account: "limecorner",
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      createdAt: new Date(),
      tweetText: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      replyCount: 1,
      likeCount: 11,
    },
    {
      id: 2,
      account: "limecorner",
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      createdAt: new Date(),
      tweetText: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      replyCount: 2,
      likeCount: 22,
    },
    {
      id: 3,
      account: "limecorner",
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      createdAt: new Date(),
      tweetText: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      replyCount: 3,
      likeCount: 33,
    },
  ],
};

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      likes: [],
    };
  },
  created() {
    const userId = this.$route.params.id;
    console.log("id like", userId);
    this.fetchLikes(userId);
  },
  methods: {
    async fetchLikes(userId) {
      try {
        // const response = await usersAPI.getUserLike(userId);
        // console.log("response", response);
        // const { data } = response;
        // this.tweets = data.tweets;
        // 改名;
        this.likes = dummyData.likes;
        console.log(this.likes);
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