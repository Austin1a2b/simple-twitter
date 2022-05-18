<template>
  <div>
    <div>
      <adminNavbar />
    </div>
    <div class="userlist">
      <div v-for="user in users" :key="user.id">
        <div><img class="avatar" :src="user.avatar" alt="" /> avatar 頭貼</div>
        <div>{{ user.name }}</div>
        <div>@{{ user.account }}</div>

        <div>
          <img src="https://i.postimg.cc/Y93L2z3G/icon.png" alt="" />
          <span> 發文數量{{ user.tweetCount }} </span>
        </div>

        <div>
          <img src="https://i.postimg.cc/YSdhRhnn/iconLike.png" alt="" />
          <span> liked 數量 {{ user.likeCount }} </span>
        </div>
        <div>
          <span>{{ user.followingCount }} 個跟隨中</span>
          <span>{{ user.followerCount }} 個跟隨中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from "./../apis/admin.js";
import { fromNowFilter } from "./../utils/mixins";
import adminNavbar from "./../components/adminNavbar.vue";

export default {
  components: {
    adminNavbar,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.adminGetUsersList();
        const { data } = response;
        this.users = data;
        console.log(this.users);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.userlist {
  /* 後續要再調整  */
  margin-left: 300px;
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