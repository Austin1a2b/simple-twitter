<template>
  <section class="popular-users">
    <h1 class="font-size-24">跟隨誰</h1>
    <div class="popular-card">
      <div class="d-flex">
        <img
          class="avatar mr-1"
          src="https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2020/07/04/20200704-125106_U5965_M622512_2945.png?itok=jD_-1XjG"
          alt=""
        />
        <div>
          <h4 class="font-size-16">Pizza Hut</h4>
          <p class="font-size-14">@pizzahut</p>
        </div>
      </div>

      <button class="btn-is-following">正在跟隨</button>
    </div>
    <div class="popular-card">
      <div class="d-flex">
        <img
          class="avatar"
          src="https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2020/07/04/20200704-125106_U5965_M622512_2945.png?itok=jD_-1XjG"
          alt=""
        />
        <div>
          <h4 class="font-size-16">Pizza Hut</h4>
          <p class="font-size-14">@pizzahut</p>
        </div>
      </div>

      <button class="btn-not-following">跟隨</button>
    </div>
  </section>
</template>

<style scoped>
.popular-users {
  outline: solid 1px green;
  padding: 10px;
  background-color: #fafafb;
}

.popular-card {
  display: flex;
  justify-content: space-between;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.btn-is-following {
  width: 40%;
  height: 40px;
  background-color: #ff6600;
  border-color: transparent;
  border-radius: 23px;
  color: white;
}

.btn-not-following {
  width: 27%;
  height: 40px;
  background-color: white;
  border: solid 1.5px #ff6600;
  border-radius: 23px;
  color: #ff6600;
}
</style>