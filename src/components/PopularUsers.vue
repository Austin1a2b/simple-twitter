<template>
  <section class="popular-users">
    <h1 class="font-size-24">跟隨誰</h1>

    <div class="popular-card" v-for="topUser in topUsers" :key="topUser.id">
      <div class="d-flex">
        <img class="avatar mr-1" :src="topUser.avatar" alt="" />
        <div>
          <h4 class="font-size-16">{{ topUser.name }}</h4>
          <p class="font-size-14">@{{ topUser.account }}</p>
        </div>
      </div>
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
  </section>
</template>

<script>
import usersAPI from "./../apis/users";

export default {
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
        console.log(id);
        this.topUsers = this.topUsers.map((user) => {
          console.log(this.isFollowing);
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
  outline: solid 1px green;
  padding: 10px;
  background-color: #fafafb;
}

.popular-card {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.btn-is-following {
  width: 40%;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

.btn-not-following {
  width: 27%;
  height: 40px;
  background-color: white;
  border: solid 1.5px #ff6600;
  border-radius: 23px;
  color: #ff6600;
}
</style>