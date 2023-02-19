<template>
  <div class="home-container">
    <TopNav />
    <TopSwiper />
    <IconNav :iconNavList="iconNavList" size="1rem" iconColor="#dd1818" class="icon-nav"/>
    <PlayList />
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import TopNav from './TopNav.vue';
  import TopSwiper from './TopSwiper.vue';
  import PlayList from './PlayList.vue';

  const iconNavList = reactive([
    {title:'每日推荐',icon:'flower-o'},
    {title:'私人FM',icon:'service-o'},
    {title:'歌单',icon:'music-o'},
    {title:'排行榜',icon:'bar-chart-o'},
  ])

</script>

<script>
export default { name: "PageHome" }
</script>

<style scoped>
  .icon-nav {
    margin-top: 10px;
  }
</style>