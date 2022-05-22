<template>
  <div>
    <img :src="logo" />
    <img v-if="home" :src="PcHome" @click.stop.prevent="active('home')" />
    <img v-else :src="PcHomeActive" />
    <div class="Pchomeicon"></div>
    <div class="homeIcon active"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      logo: "https://i.postimg.cc/Qx2dm12F/Pclogo.png",
      PcHome: "https://i.postimg.cc/L4rVt08L/PcHome.png",
      PcHomeActive: "https://i.postimg.cc/nh1YtFYG/Pc-Home-Active.png",
      PcSetting: "https://i.postimg.cc/nVQ4hYGz/Pc-Setting.png",
      PcSettingActive: "https://i.postimg.cc/pdT8bDdP/Pc-Setting-Active.png",
      PcUser: "https://i.postimg.cc/qvB6y8y2/PcUser.png",
      PcUserActive: "https://i.postimg.cc/28kSKCyD/Pc-User-Active.png",
      PadPost: "https://i.postimg.cc/cLGXS5q0/PadPost.png",
      postIcon2: "https://i.postimg.cc/Y93L2z3G/icon.png",
      notification: "https://i.postimg.cc/RFjXJnGn/btn-notfi.png",
      notificationActive: "https://i.postimg.cc/NFbh64nz/Ellipse-2.png",
      logoOut: "https://i.postimg.cc/NjVnH4Yp/logoOut.png",
      iconX: "https://i.postimg.cc/CxWv1xH2/X-button.png",
      message: "https://i.postimg.cc/3Rb08d24/message.png",
      iconLiked: "https://i.postimg.cc/DwdWWCqK/icon-Liked.png",
      iconLike: "https://i.postimg.cc/YSdhRhnn/iconLike.png",
      camera: "https://i.postimg.cc/mDQ7TQTd/camera.png",
    };
  },
};
</script>
