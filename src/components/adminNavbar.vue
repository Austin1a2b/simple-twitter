<template >
  <div class="sidebar-navbar-wrapper">
    <section class="sidebar-navbar">
      <div>
        <img
          class="product-mark mb-4"
          src="https://i.postimg.cc/Qx2dm12F/Pclogo.png"
          alt=""
        />
        <router-link
          :to="{ name: 'admimTweet' }"
          @click.stop.prevent="navbarHandler('tweetList')"
          class="tab"
        >
          <img
            class="icon"
            src="https://i.postimg.cc/L4rVt08L/PcHome.png"
            alt=""
          />
          <img
            class="icon-active"
            src="https://i.postimg.cc/nh1YtFYG/Pc-Home-Active.png"
            alt=""
          />
          <p :class="{ active: tweetList }">推文清單</p>
        </router-link>
        <router-link
          :to="{ name: 'admimUser' }"
          @click.stop.prevent="navbarHandler('userList')"
          class="tab"
        >
          <img
            class="icon"
            src="https://i.postimg.cc/qvB6y8y2/PcUser.png"
            alt=""
          />
          <img
            class="icon-active"
            src="https://i.postimg.cc/28kSKCyD/Pc-User-Active.png"
            alt=""
          />
          <p :class="{ active: userList }">使用者列表</p>
        </router-link>
      </div>

      <div
        @click.prevent.stop="logoutHandler"
        class="logout-button d-flex ml-2"
      >
        <img
          class="logout"
          src="https://i.postimg.cc/NjVnH4Yp/logoOut.png"
          alt=""
        />
        <p class="ml-2">登出</p>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userList: false,
      tweetList: false,
    };
  },

  methods: {
    navbarHandler(name) {
      if (name === "tweetList") {
        this.tweetList = true;
        this.userList = false;
        this.$router.push(`/admin/tweet`);
      } else if (name === "userList") {
        this.userList = false;
        this.userList = true;
        this.$router.push(`/admin/user`);
      }
    },
    logoutHandler() {
      localStorage.setItem("token", "");
      this.$router.push("/login");
    },
  },
};
</script>


<style scoped>
.sidebar-navbar-wrapper {
  width: 16vw;
}

.sidebar-navbar {
  width: 16vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: fixed;
  padding-left: 130px;
}

.tab {
  display: flex;
  margin-bottom: 12px;
  text-decoration: none;
  color: #44444f;
}

.tab:hover,
.logout-button:hover {
  cursor: pointer;
}

.product-mark {
  width: 50px;
  height: 50px;
}

.icon {
  margin-left: 8px;
  margin-right: 8px;
}

.icon,
.logout {
  width: 24px;
  height: 24px;
}

.btn-post-tweet {
  width: 100%;
  height: 46px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

.active {
  color: #ff6600;
}

.tab .icon-active {
  display: none;
  margin-left: 8px;
  margin-right: 8px;
  width: 24px;
  height: 24px;
}

.router-link-exact-active {
  color: #ff6600;
}

.router-link-exact-active .icon {
  display: none;
}

.router-link-exact-active .icon-active {
  display: block;
  width: 24px;
}
</style>