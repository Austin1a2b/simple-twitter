<template>
  <div>
    <div v-for="follower in followers" :key="follower.id" class="d-flex">
      <img class="avatar" :src="follower.avatar" alt="" />
      <div>
        <div class="d-flex justify-content-between">
          <p>{{ follower.name }}</p>
          <button>跟隨</button>
        </div>
        <div>
          <p>{{ follower.introduction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { fromNowFilter } from "./../utils/mixins";
const dummyData = {
  followers: [
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
      followers: [],
    };
  },
  created() {
    const userId = this.$route.params.id;
    console.log("id followers", userId);
    this.fetchFollowers(userId);
  },
  methods: {
    async fetchFollowers(userId) {
      try {
        // const response = await usersAPI.getUserFollowers(userId);
        // console.log("response", response);
        // const { data } = response;
        // this.followers = data.followers; 改名
        this.followers = dummyData.followers;
        console.log(this.followers);
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