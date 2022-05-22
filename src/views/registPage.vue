<template>
  <div class="mx-auto" style="width: 400px">
    <div class="mx-auto" style="width: 40px">
      <img
        class="mx-auto mt-4"
        width="40px"
        src="https://i.postimg.cc/Qx2dm12F/Pclogo.png"
        alt=""
      />
    </div>
    <h3 class="text-center font-weight-bold">建立你的帳號</h3>

    <form @submit.prevent.stop="handleSubmit">
      <div class="form-wrapper mt-4" height="54px">
        <label for="account">帳號</label>
        <div>
          <input
            id="account"
            v-model="account"
            name="account"
            type="text"
            class="form"
            :class="{ wrong: accountError }"
            placeholder="請輸入帳號"
            required
            autofocus
          />
        </div>
      </div>
      <!--顯示錯誤文字用-->
      <div class="error-message">
        <span v-if="account.length > 50">字數超出上限！</span>
        <span v-if="accountError">帳號已經被註冊！</span>
      </div>

      <div class="form-wrapper mt-2" height="54px">
        <label for="name">名稱</label>
        <div>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            class="form"
            :class="{ wrong: name.length > 50 }"
            placeholder="請輸入使用者名稱"
            required
          />
        </div>
      </div>
      <!--顯示錯誤文字用-->
      <div class="error-message">
        <span v-show="name.length > 50">字數超出上限 50字！</span>
      </div>

      <div class="form-wrapper mt-2" height="54px">
        <label for="email">Email</label>
        <div>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            class="form"
            :class="{ wrong: emailError }"
            placeholder="請輸入 Email"
            required
          />
        </div>
      </div>
      <div class="error-message">
        <span v-if="emailError">Email 已經被註冊！</span>
      </div>

      <div class="form-wrapper mt-2" height="54px">
        <label for="password">密碼</label>
        <div>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class="form"
            :class="{ wrong: passwordError }"
            placeholder="請輸入密碼"
            required
          />
        </div>
      </div>
      <div class="error-message">
        <span v-if="passwordError">密碼與確認密碼不符。</span>
      </div>

      <div class="form-wrapper mt-2" height="54px">
        <label for="checkPassword">密碼確認</label>
        <div>
          <input
            id="checkPassword"
            v-model="checkPassword"
            name="checkPassword"
            type="password"
            class="form"
            :class="{ wrong: passwordError }"
            placeholder="請再次輸入密碼"
            required
          />
        </div>
      </div>
      <div class="error-message">
        <span v-if="passwordError">密碼與確認密碼不符。</span>
      </div>

      <div class="mt-4">
        <button
          :disabled="isProcessing"
          type="submit"
          class="btn btn-info btn-singin"
        >
          註冊
        </button>
      </div>
    </form>

    <div class="d-flex mt-4 justify-content-center">
      <router-link class="mx-1" to="/login"> 取消 </router-link>
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
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      accountError: false,
      nameError: false,
      emailError: false,
      passwordError: false,
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.name.length > 50) {
          return;
        }
        if (
          !this.account ||
          !this.name ||
          !this.email ||
          !this.password ||
          !this.checkPassword
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認已填寫所有欄位",
          });
          return;
        }
        //先將錯誤清除 , 待後續判斷
        this.accountError = false;
        this.emailError = false;
        this.passwordError = false;

        const response = await authorizationAPI.regist({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        });
        if (response.data.status === "error") {
          const errorMessage = response.data.message;
          if (errorMessage === "帳號已經註冊。") {
            this.accountError = true;
            return;
          } else if (errorMessage === "Email 已經註冊。") {
            this.emailError = true;
            return;
          } else if (errorMessage === "密碼與確認密碼不符。") {
            this.passwordError = true;
            return;
          }
        } else if (response.data.message === "註冊成功") {
          Toast.fire({
            icon: "success",
            title: "註冊成功，3秒後導至登入頁面",
          });
        }
        setTimeout(() => {
          this.$router.push("/login");
        }, "5000");


      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
  },
};
</script>