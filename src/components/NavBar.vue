<template>
  <div class="sidebar-navbar-wrapper">
    <section class="sidebar-navbar">
      <div>
        <img
          class="product-mark mb-4"
          src="https://i.postimg.cc/Qx2dm12F/Pclogo.png"
          alt=""
        />
        <router-link
          :to="{ name: 'home' }"
          @click.stop.prevent="navbarHandler('home')"
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
          <p :class="{ active: navbarHome }">首頁</p>
        </router-link>

        <router-link
          :to="{ name: 'user-tweets', params: { id: currentUser.id } }"
          @click.stop.prevent="navbarHandler('profile')"
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
          <p :class="{ active: navbarprofile }">個人資料</p>
        </router-link>

        <router-link
          :to="{ name: 'setting' }"
          @click.stop.prevent="navbarHandler('Setting')"
          class="tab"
        >
          <img
            class="icon"
            src="https://i.postimg.cc/nVQ4hYGz/Pc-Setting.png"
            alt=""
          />
          <img
            class="icon-active"
            src="https://i.postimg.cc/pdT8bDdP/Pc-Setting-Active.png"
            alt=""
          />
          <p :class="{ active: navbarSetting }">設定</p>
        </router-link>
        <button
          class="btn btn-primary btn-post-tweet"
          data-toggle="modal"
          data-target="#postTwitterModal"
        >
          推文
        </button>
      </div>

      <div
        @click.prevent.stop="logoutHandler"
        style="cursor: pointer"
        class="d-flex ml-2"
      >
        <img
          class="logout"
          src="https://i.postimg.cc/NjVnH4Yp/logoOut.png"
          alt=""
        />
        <p class="ml-2">登出</p>
      </div>
    </section>
    <!-- Modal -->
    <div>
      <div
        class="modal fade"
        id="postTwitterModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="postTwitterModal"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <button class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div class="row p-2">
              <div class="col-1">
                <div class="avatar-container pl-4">
                  <img class="avatar" :src="currentUser.avatar" alt="" />
                </div>
              </div>

              <div class="col-11">
                <div class="d-flex justify-content-center">
                  <form class="pl-3">
                    <textarea
                      cols="45"
                      rows="8"
                      placeholder="你有什麼新鮮事？"
                      required
                      v-model="tweetMessageModal"
                    ></textarea>
                    <div
                      class="
                        d-flex
                        justify-content-end
                        align-items-center
                        mt-2
                        mb-3
                      "
                      style="width: 430px"
                    >
                      <div class="mr-4">
                        <span
                          class="error-notice"
                          v-show="tweetMessageModal.length > 140"
                        >
                          字數不可超過140字
                        </span>
                        <span
                          class="error-notice"
                          v-show="
                            blankContent && tweetMessageModal.length === 0
                          "
                        >
                          內容不可空白
                        </span>
                      </div>
                      <button
                        type="button"
                        @click.prevent.stop="postTweetModal"
                        class="replyBtn"
                      >
                        推文
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  </div>
</template>



<script>
import userAPI from "./../apis/users";
import { mapState } from "vuex";
import $ from "jquery";
import { Toast } from "./../utils/helpers";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      tweetMessageModal: "",
      navbarHome: false,
      navbarprofile: false,
      navbarSetting: false,
      id: "",
      blankContent: false,
    };
  },
  methods: {
    postTweetModal() {
      if (this.tweetMessageModal.trim().length === 0) {
        this.blankContent = true;
        return;
      } else if (this.tweetMessageModal.length > 140) {
        return;
      }
      this.$emit("modal-sbmit", this.tweetMessageModal);
      this.tweetMessageModal = "";
      this.blankContent = false;
      $("#postTwitterModal").modal("hide");
    },
    navbarHandler(name) {
      if (name === "home") {
        this.navbarHome = true;
        this.navbarprofile = false;
        this.navbarSetting = false;
        this.$router.push(`/home`);
      } else if (name === "profile") {
        this.navbarHome = false;
        this.navbarprofile = true;
        this.navbarSetting = false;
        this.$router.push(`/users/${this.id}/tweets`);
      } else if (name === "Setting") {
        this.navbarHome = false;
        this.navbarprofile = false;
        this.navbarSetting = true;
        this.$router.push("/setting");
      }
    },
    logoutHandler() {
      localStorage.setItem("token", "");
      this.$store.commit("revokeAuthentication");
      Toast.fire({
        icon: "success",
        title: "已成功登出，於3秒後跳轉至登入頁面",
      });
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    },
    async getAccountInfo() {
      try {
        const response = await userAPI.getAccountInfo();
        this.id = response.data.user.id;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getAccountInfo();
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
}

.tab {
  display: flex;
  margin-bottom: 12px;
  text-decoration: none;
  color: #44444f;
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
  width: 80%;
  height: 42px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

.modal-footer {
  border-top: 0px;
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
/* modal */

.avatar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.avatar:hover {
  cursor: pointer;
}
.avatar {
  width: 50px;
  height: 50px;
  align-self: center;
  border-radius: 50%;
}

.close {
  color: orangered;
  font-size: 45px;
  line-height: 18px;
  padding-left: 5px;
}
.modal-header {
  height: 50px;
  padding-left: 0px;
}

.replyBtn {
  outline: none;
  width: 15%;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

textarea {
  margin-top: 10px;
  outline: none;
  resize: none;
  border-color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #92929d;
}
textarea::placeholder {
  font-family: "Roboto", sans-serif;
  color: #92929d;
  font-weight: 400;
  font-size: 14px;
}
</style>