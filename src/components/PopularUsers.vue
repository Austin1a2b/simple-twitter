<template>
  <div class="p-3" style="background: white; width: 320px">
    <section class="popular-users">
      <div
        class="card-header"
        style="background-color: #fafafb; border-radius: 30px 30px 0 0"
      >
        <h4 class="mt-2">人氣用戶</h4>
      </div>
      <div class="popular-card" v-for="topUser in topUsers" :key="topUser.id">
        <div class="d-flex">
          <router-link
            :to="{ name: 'user-tweets', params: { id: topUser.id } }"
          >
            <img
              class="avatar mr-1"
              :src="topUser.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
              alt=""
            />
          </router-link>
          <div class="d-flex flex-column justify-content-center">
            <span class="user-name">{{ topUser.name }}</span>
            <span class="account-time">@{{ topUser.account }}</span>
          </div>
        </div>
        <div v-if="currentUser.id !== topUser.id">
          <button
            v-if="topUser.isFollowing"
            @click.stop.prevent="cancelFollowing(topUser.id)"
            class="btn-is-following"
          >
            正在跟隨
          </button>
          <button
            v-else
            @click.stop.prevent="addFollowing(topUser.id)"
            class="btn-not-following"
          >
            跟隨
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      topUsers: [],
    };
  },
  methods: {
    async fetchTopUsers() {
      try {
        const response = await usersAPI.getTopUsers();
        const data = response.data.result;
        this.topUsers = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addFollowing(followingId) {
      try {
        const response = await usersAPI.addFollowing(followingId);

        this.topUsers = this.topUsers.map((user) => {
          if (user.id === followingId) {
            return {
              ...user,
              isFollowing: !user.isFollowing,
            };
          } else {
            return user;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async cancelFollowing(id) {
      try {
        const response = await usersAPI.cancelFollowing(id);
        this.topUsers = this.topUsers.map((user) => {
 
          if (user.id === id) {
            return {
              ...user,
              isFollowing: !user.isFollowing,
            };
          } else {
            return user;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchTopUsers();
  },
};
</script>

<style scoped>
.popular-users {
  background-color: #fafafb;
  border-radius: 30px;
}

.popular-card {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.btn-is-following {
  width: 110px;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
  outline: none;
}

.btn-not-following {
  width: 65px;
  height: 40px;
  background-color: white;
  border: solid 1.5px #ff6600;
  border-radius: 23px;
  color: #ff6600;
  outline: none;
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
h4 {
  font-family: "Roboto", sans-serif;
}
.user-name:hover {
  cursor: pointer;
}
.user-name {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 18px;
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
</style>