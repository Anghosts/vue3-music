<template>
  <van-swipe :autoplay="3000" lazy-render class="swipe">
    <van-swipe-item v-for="image in images" :key="image" class="swipe-item">
      <img :src="image.pic || image.imageUrl" class="swipe-image"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  import { reactive,toRefs,onMounted } from 'vue';
  import { getBanner } from '@/api/home';

  export default { 
    name: 'TopSwiper',
    setup() {
      const state = reactive({
        images: []
      })

      onMounted(async () => {
        let { banners } = await getBanner();
        state.images = banners;
      })

      return {
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swipe {
    height: 4.71333rem;
  }
  .swipe-item {
    padding: 8px;
    padding-bottom: 0;
    box-sizing: border-box;
  }
  .swipe-image {
    height: 4.5rem;
    width: 100%;
    border-radius: 10px;
  }
  :deep(.van-swipe__indicator--active) {
    background-color: #dd001b;
  }
</style>
