<template>
  <div>
    <div v-for="following in followings" :key="following.id" class="d-flex">
      <img class="avatar" :src="following.avatar" alt="" />
      <div>
        <div class="d-flex justify-content-between">
          <p>{{ following.name }}</p>
          <button>跟隨</button>
        </div>
        <div>
          <p>{{ following.introduction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { fromNowFilter } from "./../utils/mixins";
const dummyData = {
  followings: [
    {
      id: 1,
      account: "limecorner",
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      introduction: "Nulla Lorem mollit cupidatat irure. Laborum magna",
    },
    {
      id: 2,
      account: "limecorner",
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      introduction: "Nulla Lorem mollit cupidatat irure. Laborum magna",
    },
    {
      id: 3,
      account: "limecorner",
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      introduction: "Nulla Lorem mollit cupidatat irure. Laborum magna",
    },
  ],
};

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      followings: [],
    };
  },
  created() {
    const userId = this.$route.params.id;
    console.log("id followings", userId);
    this.fetchFollowings(userId);
  },
  methods: {
    async fetchFollowings(userId) {
      try {
        // const response = await usersAPI.getUserFollowings(userId);
        // console.log("response", response);
        // const { data } = response;
        // this.followings = data.followings; 改名
        this.followings = dummyData.followings;
        console.log(this.followings);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>