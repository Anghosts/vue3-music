<template>
  <img :src="qrimg" alt="" class="qr-image" :class="{show: qrimg}">
  <br>
  <van-button color="linear-gradient(to right, #ff6034, #dd001b)" class="login-btn" @click="getQr">
    扫码登录
  </van-button>
</template>

<script>
  import { reactive,toRefs } from 'vue';
  import { getQrKey,getQrData,getQrStatus } from '@/api/user';
  import { useUser } from '@/store/user';
  export default {
    name: 'Login',
    setup() {
      const state = reactive({
        qrimg: '',
        timer: null
      })
      const store = useUser();

      // 获取二维码图片
      async function getQr() {
        let {data: {unikey: key}} = await getQrKey();
        let {data: {qrimg}} = await getQrData(key);
        state.qrimg = qrimg;
        // 轮询
        clearInterval(state.timer);
        state.timer = setInterval(() => {
          getStatus(key);
        }, 1500)
      }
      // 检测二维码状态
      async function getStatus(key) {
        let result = await getQrStatus(key);
        if (result.code === 803) {
          // 登录成功，保存cookie
          store.setCookie(result.cookie);
          store.isLogin = true;
          clearInterval(state.timer);
        } else {
          console.log(result.message);
        }
      }
      
      return {
        ...toRefs(state),
        getQr,
      }
    }
  }

</script>

<style lang="scss" scoped>
.qr-image {
    width: 180px;
    height: 180px;
    visibility: hidden;
    &.show {
      visibility: inherit;
    }
  }
  .login-btn {
    padding: 10px 40px;
    border-radius: 26px;
  }
</style>
