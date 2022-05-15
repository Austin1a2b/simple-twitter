<template>
  <div>
    <button
      class="btn-edit-info mr-3 mb-4"
      data-toggle="modal"
      data-target="#user-info-edit-modal"
    >
      編輯個人資料
    </button>

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