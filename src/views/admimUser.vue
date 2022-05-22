<template>
  <div>
    <div>
      <!-- Navbar  -->
      <adminNavbar />
    </div>
    <div class="userlist">
      <div class="container">
        <h4 class="mt-3">使用者列表</h4>
        <div class="row" id="user-panel">
          <div v-for="user in users" :key="user.id">
            <div class="col">
              <div class="mb-2">
                <div class="card">
                  <div>
                    <img
                      class="cover"
                      :src="
                        user.cover_image ||
                        'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'
                      "
                      alt="背景圖片"
                    />
                  </div>
                  <img
                    class="avatar"
                    :src="user.avatar || 'https://i.imgur.com/hAKcS3E.jpg'"
                    alt="使用者頭貼"
                  />
                  <div class="card-body">
                    <h5>{{ user.name }}</h5>
                    <p class="font-color-light font-size-14">
                      @{{ user.account }}
                    </p>
                    <div
                      class="d-grid gap-2 d-md-flex justify-content-center mt-2"
                    >
                      <img
                        class="tweet-count"
                        src="https://i.postimg.cc/Y93L2z3G/icon.png"
                        alt=""
                      />
                      <span class="font-size-15 pl-1"
                        >{{ user.tweetCount }}
                      </span>
                      <img
                        class="user-like-count"
                        src="https://i.postimg.cc/YSdhRhnn/iconLike.png"
                        alt=""
                      />
                      <span class="font-size-15 pl-1"
                        >{{ user.likeCount }}
                      </span>
                    </div>
                    <div
                      class="d-grid gap-2 d-md-flex justify-content-center mt-2"
                    >
                      <span class="font-size-14"
                        >{{ user.followingCount }} 個<span
                          class="font-color-light"
                          >跟隨中</span
                        ></span
                      >
                      <span class="font-size-14"
                        >{{ user.followerCount }} 位<span
                          class="font-color-light"
                          >跟隨中</span
                        ></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from "./../apis/admin.js";
import { fromNowFilter } from "./../utils/mixins";
import adminNavbar from "./../components/adminNavbar.vue";

export default {
  components: {
    adminNavbar,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.adminGetUsersList();
        const { data } = response;
        this.users = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.userlist {
  margin-left: 100px;
}

.row {
  margin-top: 91px;
}

.card {
  width: 250px;
  height: 315px;
  border-radius: 10px;
  position: relative;
  background-color: #f6f7f8;
}

.cover {
  width: 248px;
  height: 140px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
}

.avatar {
  width: 100px;
  height: 100px;
  margin: 64px 75px 0px 74px;
  border: 4px solid #ffffff;
  border-radius: 50%;
  z-index: 1;
}

.card-body {
  margin: 0;
  padding: 0;
}

h5 {
  text-align: center;
  padding: 15px 0 0 0;
  margin: 0;
}

p {
  padding: 0;
  margin: 0;
  text-align: center;
}

.font-size-15,
.font-size-14 {
  padding-right: 10px;
}

.tweet-count,
.user-like-count {
  height: 21px;
  width: 23px;
}

.icon-group {
  outline: solid 1px green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 38px;
}

.icon {
  width: 13px;
  height: 13px;
}
</style>