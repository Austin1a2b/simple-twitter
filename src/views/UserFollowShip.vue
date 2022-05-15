<template>
  <div class="user-page d-flex justify-content-between border border-secondary">
    <!-- NavBar -->
    <NavBar class="sidebar" />

    <!-- UserSection -->
    <section class="user-section">
      <!-- 巢狀路由 -->
      <div>
        <div class="mb-4">
          <router-link
            :to="{ name: 'user-follower', params: { id: 1 } }"
            class="mr-3"
            >追隨者</router-link
          >
          <router-link
            :to="{ name: 'user-following', params: { id: 1 } }"
            class="mr-3"
            >正在追隨</router-link
          >
        </div>
        <router-view />
      </div>
    </section>

    <!-- PopularUsers -->
    <PopularUsers class="popular-users" />
  </div>
</template>

<script>
import NavBar from "./../components/NavBar.vue";
import PopularUsers from "./../components/PopularUsers.vue";
import usersAPI from "./../apis/users";

const currentUser = {
  user: {
    id: 124,
    account: "limecorner",
    name: "limecorner",
    email: "limecorner@example.com",
    avatar: "https://loremflickr.com/280/280/admin",
    role: "user",
    introduction: "Nihil nulla necessitatibus fugiat.",
  },
};

export default {
  components: {
    NavBar,
    PopularUsers,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    const userId = this.$route.params.id;
    console.log("currentUser ", userId);
    this.fetchCurrentUser(userId);
  },
  methods: {
    async fetchCurrentUser(userId) {
      try {
        // const response = await usersAPI.getUser(userId);
        // console.log("response", response);
        // const { data } = response;
        // this.user = data.user;
        // 改名;

        this.user = currentUser.user;
        // console.log(this.user);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .user-page {
    max-width: 960px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1200px) {
  .user-page {
    max-width: 1140px;
  }
}

/* 大區塊 */
.user-page {
  border: solid 1px;
}

.sidebar {
  width: 16%;
}

.user-section {
  width: 55%;
}

.popular-users {
  width: 25%;
}

/* user-section  */

.avatar {
  width: 30px;
  height: 30px;
}

/* 巢狀路由 */
.router-link-exact-active {
  color: #ff6600;
  border-bottom: solid 1px #ff6600;
}
</style>