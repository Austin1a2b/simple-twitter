<template>
  <div class="user-page d-flex justify-content-between">
    <!-- NavBar -->
    <NavBar />

    <!-- UserSection -->
    <section class="user-section">
      <div>
        <div class="d-flex align-items-center ml-4 mt-2">
          <div style="cursor: pointer" @click="$router.back()">←</div>
          <div class="ml-4">
            <h3 class="font-weight-bold font-size-18">
              {{ user.name }}
            </h3>
            <p class="text-secondary font-size-14">
              {{ user.tweetCount }} 推文
            </p>
          </div>
        </div>
        <div class="image-wrapper" style="margin-bottom: 50px">
          <img
            class="cover-image"
            :src="
              user.cover_image ||
              'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'
            "
            alt=""
          />
          <img
            class="avatar"
            :src="user.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
            alt=""
          />
        </div>
        <div class="d-flex justify-content-end">
          <!-- user-info-edit-modal btn-->
          <button
            v-if="Number(currentUser.id) === Number(userId)"
            class="btn-edit-info mr-3"
            data-toggle="modal"
            data-target="#user-info-edit-modal"
            @click="copyOriginalInfo"
          >
            編輯個人資料
          </button>
          <button v-else class="btn-edit-info mr-3" style="visibility: hidden">
            登入者再看別人的資料
          </button>
        </div>

        <div class="mt-3">
          <div class="pl-1">
            <h4 class="user-name">
              {{ user.name }}
              <div class="account-time">@{{ user.account }}</div>
            </h4>
          </div>
          <p class="description pl-1">
            {{ user.introduction }}
          </p>
          <div class="d-flex pl-1 mb-3">
            <router-link
              :to="{
                name: 'user-followings',
                params: { id: userId },
              }"
              class="mr-4 account-time"
              style="color: black"
              >{{ user.folloingCount }}個<span class="account-time"
                >跟隨中</span
              >
            </router-link>
            <router-link
              :to="{
                name: 'user-followers',
                params: { id: userId },
              }"
              class="account-time"
              style="color: black"
              >{{ user.followerCount }}位<span class="account-time"
                >跟隨者</span
              >
            </router-link>
          </div>
        </div>
      </div>

      <!-- 巢狀路由 -->
      <div>
        <div class="pt-2 d-flex">
          <router-link
            :to="{ name: 'user-tweets', params: { id: userId } }"
            class="tap text-center"
          >
            <div style="font-weight: 800">推文</div>
          </router-link>

          <router-link
            :to="{ name: 'user-replies', params: { id: userId } }"
            class="tap text-center"
          >
            <div style="font-weight: 800">回覆</div>
          </router-link>
          <router-link
            :to="{ name: 'user-likes', params: { id: userId } }"
            class="tap text-center"
          >
            <div style="font-weight: 800">喜歡的內容</div>
          </router-link>
        </div>
        <router-view />
      </div>
    </section>

    <!-- PopularUsers -->
    <PopularUsers class="popular-users" />

    <!-- user-info-edit-modal -->
    <div
      class="modal"
      id="user-info-edit-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="user-info-edit-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <form
            @submit.stop.prevent="handleSubmit"
            method="PUT"
            enctype="multipart/form-data"
          >
            <div class="modal-header">
              <div>
                <button
                  type="button"
                  class="close pl-1"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="returnOriginalInfo"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <h5 class="modal-title">編輯個人資料</h5>

              <input
                :disabled="isProcessing"
                type="submit"
                class="submit-btn"
                value="儲存"
              />
            </div>
            <div class="modal-body">
              <div>
                <div class="image-wrapper">
                  <img
                    class="cover-image"
                    :src="currentUserInfo.cover_image"
                    style="height: 180px"
                    alt=""
                  />
                  <div class="edit-image-wrapper">
                    <label>
                      <input
                        v-show="false"
                        id="image1"
                        type="file"
                        name="cover_image"
                        accept="image/*"
                        class="cover-image-btn"
                        @change="handleFile1Change"
                      />
                      <img
                        class="camera-1"
                        src="https://i.postimg.cc/mDQ7TQTd/camera.png"
                      />
                    </label>
                  </div>

                  <img
                    class="modal-avatar"
                    :src="currentUserInfo.avatar"
                    alt=""
                  />
                  <div class="edit-image-wrapper ml-3">
                    <label>
                      <input
                        v-show="false"
                        id="image2"
                        type="file"
                        name="avatar"
                        accept="image/*"
                        class="avatar-btn"
                        @change="handleFile2Change"
                      />
                      <img
                        class="camera-2"
                        src="https://i.postimg.cc/mDQ7TQTd/camera.png"
                      />
                    </label>
                  </div>
                </div>
                <div class="p-4 mt-4">
                  <div class="form-wrapper mb-3 d-flex flex-column">
                    <label for="name">名稱</label>
                    <textarea
                      id="name"
                      v-model="currentUserInfo.name"
                      name="name"
                      type="text"
                      rows="1"
                      class="form"
                      required
                    >
                    </textarea>
                  </div>
                  <span
                    v-show="currentUserInfo.name.length > 50"
                    class="error-message"
                    style="background-color: white"
                    >字數超出上限！</span
                  >
                  <span
                    v-show="currentUserInfo.name.trim().length === 0"
                    class="error-message"
                    style="background-color: white"
                    >名稱不可空白</span
                  >

                  <div class="form-wrapper mt-2 d-flex flex-column">
                    <label for="introduction">自我介紹</label>
                    <textarea
                      id="introduction"
                      v-model="currentUserInfo.introduction"
                      name="introduction"
                      rows="6"
                      type="text"
                      class="form"
                      required
                    >
                    </textarea>
                  </div>
                  <span
                    v-show="currentUserInfo.introduction.length > 160"
                    class="error-message"
                    style="background-color: white"
                    >字數超出上限！</span
                  >
                  <span
                    v-show="currentUserInfo.introduction.trim().length === 0"
                    class="error-message"
                    style="background-color: white"
                    >自我介紹不可空白</span
                  >
                  <!-- v-show="currentUserInfo.introduction.length > 160" -->
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- user-info-edit-modal -->
  </div>
</template>



<script>
import NavBar from "./../components/NavBar.vue";
import PopularUsers from "./../components/PopularUsers.vue";
import usersAPI from "./../apis/users";
import { mapState } from "vuex";
import { Toast } from "./../utils/helpers";
import $ from "jquery";

const dummyUser = {
  user: {
    id: 124,
    account: "limecorner",
    name: "limecorner",
    email: "limecorner@example.com",
    avatar: "https://loremflickr.com/280/280/admin",
    role: "user",
    introduction: "Nihil nulla necessitatibus fugiat.",
    followingCount: 10,
    followerCount: 20,
    tweetCount: 4,
  },
};

export default {
  components: {
    NavBar,
    PopularUsers,
  },
  data() {
    return {
      user: {}, // 此 user 是 clickedUser
      name: "",
      introduction: "",
      userId: 1, // 此 userId 是 clickedUser 的
      editSuccessfully: false,
      currentUserInfo: {
        cover_image: "",
        avatar: "",
        name: "",
        introduction: "",
      },
      currentUserInfoCopy: {},
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.userId = this.$route.params.id; // id從首頁來
    // this.userId = 14; // id從首頁來
    // console.log("UserPage created this.$route.params.id ", this.userId);
    this.fetchClickedUser(this.userId);
    this.fetchCurrentUserInfo();
  },
  beforeRouteUpdate(to, from, next) {
    this.userId = this.$route.params.id;
    const { id } = to.params;

    // 若點頁籤前後的userId不同
    if (Number(this.$route.params.id) !== Number(id)) {
      this.userId = id; // userId 給新值
      this.fetchClickedUser(this.userId);
      // console.log("this.userId", this.userId);
    }

    next();
  },
  methods: {
    async fetchClickedUser(userId) {
      try {
        const response = await usersAPI.getUser(userId);
        const { data } = response;
        this.user = data;

        // this.user = dummyUser.user;
        // console.log("UserPage user", this.user);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentUserInfo() {
      try {
        const response = await usersAPI.getOriginalInfo();
        // console.log("fetchCurrentUserInfo", response);
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.currentUserInfo = { ...data.user };
        // console.log("currentUserInfo", this.currentUserInfo);
      } catch (error) {
        console.log(error);
      }
    },
    handleFile1Change(e) {
      const files = e.target.files;
      // console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUserInfo.cover_image = "";
        return;
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.currentUserInfo.cover_image = imageURL;
      }
    },
    handleFile2Change(e) {
      const files = e.target.files;
      // console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUserInfo.avatar = "";
        return;
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.currentUserInfo.avatar = imageURL;
      }
    },
    copyOriginalInfo() {
      this.currentUserInfoCopy = { ...this.currentUserInfo };
      // console.log("currentUserInfoCopy", this.currentUserInfoCopy);
    },
    returnOriginalInfo() {
      if (this.editSuccessfully) {
        this.editSuccessfully = false;
        return;
      }
      this.currentUserInfo = {
        ...this.currentUserInfo,
        ...this.currentUserInfoCopy,
      };
    },

    async handleSubmit(e) {
      try {
        if (
          !this.currentUserInfo.name.trim() ||
          !this.currentUserInfo.introduction.trim()
        ) {
          Toast.fire({
            icon: "warning",
            title: "未輸入編輯名稱或自我介紹！無法編輯",
          });
          return;
        }

        if (this.currentUserInfo.name.length > 50) {
          Toast.fire({
            icon: "warning",
            title: "字數超出上限！無法編輯",
          });
          return;
        }
        if (this.currentUserInfo.introduction.length > 160) {
          Toast.fire({
            icon: "warning",
            title: "字數超出上限！無法編輯",
          });
          return;
        }
        this.isProcessing = true;
        const form = e.target;
        const formData = new FormData(form);
        // console.log("this.currentUser.id", this.currentUser.id);
        // console.log("formData", formData);
        const response = await usersAPI.editCurrentUserInfo(
          this.currentUser.id,
          formData
        );
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.editSuccessfully = true;
        // console.log("handleSubmit", response);
        const { avatar, cover_image, name, introduction } = data.userUpdate;
        this.currentUserInfo = {
          ...this.currentUserInfo,
          avatar,
          cover_image,
          name,
          introduction,
        };
        this.user = {
          ...this.user,
          avatar,
          cover_image,
          name,
          introduction,
        };
        // console.log("currentUserInfo", this.currentUserInfo);
        Toast.fire({
          icon: "success",
          title: "編輯成功",
        });
        this.isProcessing = false;
        $("#user-info-edit-modal").modal("hide");
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "warning",
          title: "編輯失敗",
        });
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
.user-section {
  width: 55%;
}

.popular-users {
  width: 25%;
}

/* user-section  */
.image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
}

.cover-image {
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
  z-index: 1;
}

.avatar:hover {
  cursor: pointer;
}
.avatar {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 10px;
  top: 120px;
  border: white 3px solid;
  border-radius: 50%;
}
.edit-image-wrapper {
  /* outline: 2px solid red; */
  position: relative;
}
.camera-1,
.camera-2 {
  position: absolute;
  width: 22px;
}

.camera-1 {
  left: 50%;
  transform: translateX(-50%);
  bottom: 115px;
}

.camera-2 {
  left: 60px;
  bottom: 46px;
}

/* .user-name:hover {
  cursor: pointer;
} */
.user-name {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  line-height: 20px;
}

.account-time:hover {
  color: #808080;
  /* cursor: pointer; */
}
.account-time {
  margin-top: 2px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #92929d;
  line-height: 22px;
}

.description:hover {
  cursor: default;
}
.description {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

.btn-edit-info {
  /* margin-top: -56px; */
  width: 128px;
  height: 40px;
  background-color: white;
  border: solid 1.5px #ff6600;
  border-radius: 23px;
  color: #ff6600;
}

/* 巢狀路由 */
.tap {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  width: 150px;
  height: 30px;
  font-size: 14px;
  color: #92929d;
  text-decoration: none;
}

.router-link-exact-active {
  color: #ff6600;
  border-bottom: solid 1px #ff6600;
}

/* modal */

.background-img {
  position: relative;
  background: url("https://ibw.bwnet.com.tw/ac_gallery/2019/10/50e5bba8-a1bd-5410-9f7e-0a5e4bb83b76_620.jpg");
  width: 100%;
  height: 50px;
  margin-bottom: 16px;
}
.modal-header {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0px;
  height: 56px;
}
.modal-title {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin-left: 15px;
  margin-right: 265px;
}

.modal-body {
  padding: 0;
}

.cover-image-btn {
  position: absolute;
  z-index: 2;
  left: 190px;
  top: 80px;
}
textarea {
  resize: none;
}
label {
  margin-bottom: 0px;
}
.avatar-btn {
  position: absolute;
  left: 30px;
  top: 165px;
}
.label {
  position: absolute;
  z-index: 1;
  widows: 20px;
  height: 20px;
}
.modal-avatar {
  position: absolute;
  height: 120px;
  width: 120px;
  left: 25px;
  top: 120px;
  border: 3px white solid;
  border-radius: 50%;
}
.close {
  font-size: 50px;
  font-weight: 100;
  color: orangered;
}

.submit-btn {
  outline: none;
  width: 60px;
  height: 35px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}
</style>