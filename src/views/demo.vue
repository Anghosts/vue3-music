<template>
  <!-- <div class="h" :style="{height: '100px'}"></div> -->
    <van-sticky  :offset-top="10">
      <van-button type="primary">基础用法</van-button>
    </van-sticky>
  <section class="demo-sticky" ref="container">
    <div class="title">标题</div>
    <div class="box"></div>
  </section>
  
</template>

<script>
  import { ref } from 'vue';
  export default {
    name: '',
    setup() {
      const container = ref();
      return { container };
    }
  }

</script>

<style lang="scss" scoped>
.demo-sticky {
  height: 300px;
  // overflow: scroll;
  background-color: #fff;
  .title {
    height: 100px;
  }
  .btn {
    position: sticky;
    top: 10px;
  }
  .box {
    height: 1000px;
    background-color: #333;
  }
}
</style>
