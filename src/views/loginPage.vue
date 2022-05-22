<template>
  <div class="mx-auto" style="width: 400px">
    <div class="mx-auto" style="width: 40px">
      <img
        class="mx-auto mt-5"
        width="40px"
        src="https://i.postimg.cc/Qx2dm12F/Pclogo.png"
        alt=""
      />
    </div>
    <h3 class="text-center font-weight-bold">登入 Alphitter</h3>

    <form @submit.prevent.stop="handleSubmit">
      <div class="form-wrapper mt-5" height="54px">
        <label for="account">帳號</label>
        <div>
          <input
            id="account"
            v-model="account"
            name="account"
            type="text"
            class="form"
            :class="{ wrong: showError }"
            placeholder="請輸入帳號"
            required
            autofocus
          />
        </div>
      </div>
      <div class="error-message">
        <span v-show="showError">{{ errorMessage }} </span>
      </div>

      <div
        class="form-wrapper mt-4"
        :class="{ wrong: showError }"
        height="54px"
      >
        <label for="password">密碼</label>
        <div>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="form"
            :class="{ wrong: showError }"
            placeholder="請輸入密碼"
            autocomplete="current-password"
            required
          />
        </div>
      </div>

      <div class="mt-4">
        <button
          :disabled="isProcessing"
          type="submit"
          class="btn btn-info btn-singin"
        >
          登入
        </button>
      </div>
    </form>
    <div class="d-flex mt-4 justify-content-end">
      <router-link class="mx-1" to="/regist"> 註冊 </router-link>
      ・
      <router-link class="mx-1" to="/admin/login"> 後台登入 </router-link>
    </div>
  </div>
</template>


<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      showError: false,
      errorMessage: "",
    };
  },

  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填寫帳號/密碼",
          });
          return;
        }
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        // console.log("伺服器回應", response);
        const { data } = response;
        if (data.status === "error") {
          this.showError = true;
          this.password = "";
          this.errorMessage = data.message;
          return;
        }
        localStorage.setItem("token", data.token);
        const id = data.user.id;
        this.$router.push(`/home`);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error,
        });
      }
    },
  },
};
</script>