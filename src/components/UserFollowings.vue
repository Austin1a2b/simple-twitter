<template>
  <div>
    <div
      v-for="following in followings"
      :key="following.followingId"
      class="row card"
    >
      <div class="col-1">
        <router-link
          class="avatar-container"
          :to="{ name: 'user-tweets', params: { id: following.followingId } }"
        >
          <img
            class="avatar"
            :src="following.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
            alt=""
          />
        </router-link>
      </div>

      <div class="col-11">
        <div class="p-1 d-flex justify-content-between align-items-center">
          <h5 class="font-size-18">{{ following.name }}</h5>
          <template
            v-if="Number(currentUser.id) !== Number(following.followingId)"
          >
            <button
              class="btn-not-following"
              v-if="!following.isFollowing"
              @click.prevent.stop="addFollowing(following.followingId)"
            >
              跟隨
            </button>
            <button
              class="btn-is-following"
              v-else
              @click.prevent.stop="deleteFollowing(following.followingId)"
            >
              正在跟隨
            </button>
          </template>
        </div>
        <div class="p-1 font-size-16">
          <p>{{ following.introduction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { fromNowFilter } from "../utils/mixins";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

const dummyData = {
  followings: [
    {
      followingId: 1,
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      introduction: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      isFollowing: true,
      // followingId: 10,
    },
    {
      followingId: 2,
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      introduction: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      isFollowing: true,
      // userId: 20,
    },
    {
      followingId: 3,
      name: "limecorner",
      avatar: "https://loremflickr.com/280/280/admin",
      introduction: "Nulla Lorem mollit cupidatat irure. Laborum magna",
      isFollowing: true,
      // userId: 30,
    },
  ],
};

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      followings: [],
      // following:{}
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const userId = this.$route.params.id;
    // console.log("followings this.$route.params.id", userId);
    this.fetchFollowings(userId);
  },
  methods: {
    async fetchFollowings(userId) {
      try {
        const response = await usersAPI.getUserFollowings(userId);
        // console.log("followings response", response);
        const { data } = response;
        if (data.status === "error") {
          this.followings = [];
          throw new Error(data.message);
        }
        this.followings = data;
        // this.followings = dummyData.followings;
        // console.log(this.followings);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "沒有追隨者名單",
        });
        console.log(error);
      }
    },
    async deleteFollowing(followingId) {
      try {
        // console.log("deleteFollowing ");

        const response = await usersAPI.deleteUserFollowing(followingId);
        // console.log("deleteFollowing response", response);
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followings = this.followings.map((following) => {
          if (following.followingId === followingId) {
            return {
              ...following,
              isFollowing: false,
            };
          } else {
            return following;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤",
        });
        console.log(error);
      }
    },
    async addFollowing(followerId) {
      try {
        // console.log("addFollowing followerId", followerId);

        const response = await usersAPI.addUserFollowing(followerId);
        const { data } = response;
        // console.log("addFollowing response", response);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followings = this.followings.map((following) => {
          if (following.followingId === followerId) {
            return {
              ...following,
              isFollowing: true,
            };
          } else {
            return following;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤",
        });
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
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
.card {
  height: 130px;
  padding: 10px;
}
h5 {
  font-family: "Roboto", sans-serif;
}
p {
  font-family: "Roboto", sans-serif;
}

.btn-is-following {
  width: 20%;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

.btn-not-following {
  width: 14%;
  height: 40px;
  background-color: white;
  border: solid 1.5px #ff6600;
  border-radius: 23px;
  color: #ff6600;
}
</style>