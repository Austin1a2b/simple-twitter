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
      <div class="form-wrapper mt-5" :class="{ wrong: error }" height="54px">
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

      <div class="errorMesssage">
        <span v-show="error">{{ errorMesssage }}</span>
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
export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      error: false,
      errorMesssage: "帳號不存在",
    };
  },

  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          return;
        }

        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        console.log(response);
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        // // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);
        // 透過 setCurrentUser  將資料 傳給 vuex
        // this.$store.commit('vuex, store的方法名稱' , 帶入的資料 )
        // this.$store.commit('setCurrentUser',data.user)

        // // 成功登入後轉址到.....
        const id = data.user.id;
        this.$router.push(`/home/${id}`);
      } catch (error) {
        // 將密碼欄位清空
        this.password = "";
        // 顯示錯誤提示
        this.isProcessing = false;
        console.log("error", error);
      }
    },
  },
};
</script>
