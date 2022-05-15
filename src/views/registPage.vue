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
      <div
        class="form-wrapper mt-4"
        :class="{ wrong: accountError }"
        height="54px"
      >
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
        <span v-show="accountError">{{ errorMesssage }}</span>
      </div>

      <div
        class="form-wrapper mt-2"
        :class="{ wrong: nameError }"
        height="54px"
      >
        <label for="name">名稱</label>
        <div>
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
      </div>

      <div
        class="form-wrapper mt-4"
        :class="{ wrong: emailError }"
        height="54px"
      >
        <label for="email">Email</label>
        <div>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            class="form"
            placeholder="請輸入 Email"
            required
          />
        </div>
      </div>

      <div
        class="form-wrapper mt-4"
        :class="{ wrong: passwordError }"
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
            placeholder="請輸入密碼"
            required
          />
        </div>
      </div>

      <div
        class="form-wrapper mt-4"
        :class="{ wrong: passwordCheckError }"
        height="54px"
      >
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
      passwordCheckError: false,
      errorMesssage: "還沒決定好 如何呈現到 各欄位",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
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
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: "warning",
            title: "前端 , 兩次輸入的密碼不同",
          });
          this.checkPassword = "";
          return;
        }

        const { data } = await authorizationAPI.regist({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$router.push("/login");
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: error,
        });
      }
    },
  },
};
</script>