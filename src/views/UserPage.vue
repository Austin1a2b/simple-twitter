<template>
  <div class="user-page d-flex justify-content-between border border-secondary">
    <!-- NavBar -->
    <NavBar  />

    <!-- UserSection -->
    <section class="user-section">
      <div>
        <div class="d-flex align-items-center ml-4 mt-2">
          <div>上頁</div>
          <div class="ml-4">
            <h3 class="font-weight-bold font-size-18">{{ user.name }}</h3>
            <p class="text-secondary font-size-14">25 推文</p>
          </div>
        </div>
        <div class="cover-image">
          <img class="avatar" :src="user.avatar" alt="" />
        </div>
        <div class="d-flex justify-content-end">
          <!-- user-info-edit-modal btn-->
          <button
            class="btn-edit-info mr-3 mb-4"
            data-toggle="modal"
            data-target="#user-info-edit-modal"
          >
            編輯個人資料
          </button>
        </div>

        <div>
          <div>
            <h4 class="font-size-18">{{ user.name }}</h4>
            <p class="font-size-14">{{ user.account }}</p>
          </div>
          <p>
            {{ user.introduction }}
          </p>
          <div class="d-flex">
            <p class="font-size-14">XX 個跟隨中</p>
            <p class="font-size-14">XX 位跟隨者</p>
          </div>
        </div>
      </div>

      <!-- 巢狀路由 -->
      <div>
        <div class="mb-4">
          <router-link
            :to="{ name: 'user-tweet', params: { id: 1 } }"
            class="mr-3"
            >推文</router-link
          >
          <router-link
            :to="{ name: 'user-reply', params: { id: 1 } }"
            class="mr-3"
            >回覆</router-link
          >
          <router-link :to="{ name: 'user-like', params: { id: 1 } }"
            >喜歡的內容</router-link
          >
        </div>
        <router-view />
      </div>
    </section>

    <!-- PopularUsers -->
    <PopularUsers class="popular-users" />

    <!-- user-info-edit-modal -->
    <div
      class="modal fade"
      id="user-info-edit-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="user-info-edit-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="user-info-edit-modal">
              編輯個人資料 ( 後續將關閉"X"符號 往左邊移動)
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form action="">
            <div class="cover-image">
              <img
                class="avatar"
                src="https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2020/07/04/20200704-125106_U5965_M622512_2945.png?itok=jD_-1XjG"
                alt=""
              />
            </div>
            <div>
              <label for="account">名稱</label>
              <div class="form-wrapper mt-2">
                <input
                  id="name"
                  v-model="name"
                  name="name"
                  type="text"
                  class="form"
                  placeholder="請輸入使用者名稱"
                  required
                />
              </div>

              <label for="introduction">自我介紹</label>
              <div class="form-wrapper mt-2">
                <textarea
                  id="introduction"
                  v-model="introduction"
                  name="introduction"
                  type="text"
                  class="form"
                  placeholder="請輸入自我介紹"
                  required
                ></textarea>
              </div>
            </div>

            <button type="button" class="btn btn-info btn-w64">儲存</button>
          </form>
          <div class="modal-footer"></div>
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
      name: "",
      introduction: "",
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
        const response = await usersAPI.getUser(userId);
        console.log("response", response);
        const { data } = response;
        this.user = data.user;
        // 改名;

        // this.user = currentUser.user;
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

.user-section {
  width: 55%;
}

.popular-users {
  width: 25%;
}

/* user-section  */
.cover-image {
  position: relative;
  background: url("https://ibw.bwnet.com.tw/ac_gallery/2019/10/50e5bba8-a1bd-5410-9f7e-0a5e4bb83b76_620.jpg");
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
}

.avatar {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 10px;
  top: 120px;
  border-radius: 50%;
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
</style>