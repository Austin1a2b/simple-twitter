<template>
  <div>
    <div v-for="reply in replies" :key="reply.id" class="reply-card">
      <img
        class="avatar mr-2"
        src="https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2020/07/04/20200704-125106_U5965_M622512_2945.png?itok=jD_-1XjG"
        alt=""
      />
      <div>
        <div class="d-flex">
          <h4>{{ reply.name }}</h4>
          <p>{{ reply.account }} {{ reply.createdAt | fromNow }}</p>
        </div>
        <p>回復 {{ reply.repliedAccount }}</p>
        <p>
          {{ reply.repliedText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { fromNowFilter } from "./../utils/mixins";
const dummyData = {
  replies: [
    {
      id: 1,
      account: "limecorner",
      name: "limecorner",
      repliedAccount: "apple",
      avatar: "https://loremflickr.com/280/280/admin",
      createdAt: new Date(),
      repliedText: "Nulla Lorem mollit cupidatat irure. Laborum magna",
    },
    {
      id: 2,
      account: "limecorner",
      name: "limecorner",
      repliedAccount: "apple",
      avatar: "https://loremflickr.com/280/280/admin",
      createdAt: new Date(),
      repliedText: "Nulla Lorem mollit cupidatat irure. Laborum magna",
    },
    {
      id: 3,
      account: "limecorner",
      name: "limecorner",
      repliedAccount: "apple",
      avatar: "https://loremflickr.com/280/280/admin",
      createdAt: new Date(),
      repliedText: "Nulla Lorem mollit cupidatat irure. Laborum magna",
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
    const userId = this.$route.params.id;
    console.log("id reply", userId);
    this.fetchReplies(userId);
  },
  methods: {
    async fetchReplies(userId) {
      try {
        // const response = await usersAPI.getUserReply(userId);
        // console.log("response", response);
        // const { data } = response;
        // this.replies = data.replies;
        // 改名;
        this.replies = dummyData.replies;
        console.log(this.replies);
      } catch (error) {
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