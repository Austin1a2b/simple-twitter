<template>
  <div class="user-page d-flex justify-content-between">
    <!-- NavBar -->
    <NavBar class="sidebar" />

    <div class="setting-area">
      <div>帳戶設定</div>
      <form @submit.prevent.stop="handleSubmit">
        <div class="form-wrapper mt-4" :class="{ wrong: error }" height="54px">
          <label for="account">帳號</label>
          <div>
            <input
              id="account"
              v-model="account"
              name="account"
              type="text"
              class="form"
              placeholder="請輸入帳號"
              required
              autofocus
            />
          </div>
        </div>
        <!--顯示錯誤文字用-->
        <div class="errorMesssage">
          <span v-show="error">{{ errorMesssage }}</span>
        </div>

        <div class="form-wrapper mt-2" :class="{ wrong: error }" height="54px">
          <label for="account">名稱</label>
          <div>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              class="form"
              placeholder="請輸入使用者名稱"
              required
              autofocus
            />
          </div>
        </div>

        <div class="form-wrapper mt-4" :class="{ wrong: error }" height="54px">
          <label for="account">Email</label>
          <div>
            <input
              id="name"
              v-model="email"
              name="name"
              type="email"
              class="form"
              placeholder="請輸入 Email"
              required
              autofocus
            />
          </div>
        </div>

        <div class="form-wrapper mt-4" :class="{ wrong: error }" height="54px">
          <label for="password">密碼</label>
          <div>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              class="form"
              placeholder="請輸入密碼"
              required
            />
          </div>
        </div>

        <div class="form-wrapper mt-4" :class="{ wrong: error }" height="54px">
          <label for="checkPassword">密碼確認</label>
          <div>
            <input
              id="checkPassword"
              v-model="checkPassword"
              name="checkPassword"
              type="password"
              class="form"
              placeholder="請再次輸入密碼"
              required
            />
          </div>
        </div>

        <div class="mt-4">
          <button
            :disabled="isProcessing"
            type="submit"
            class="btn btn-info btn-w88"
          >
            儲存
          </button>
        </div>
      </form>
    </div>
    <div class="sidebar"></div>
  </div>
</template>


<script>
import NavBar from "./../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 16%;
}

.user-section {
  width: 55%;
}

.setting-area {
  width: 40%;
}
</style>