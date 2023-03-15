<template>
  <MusicList 
    :songs="store.songs" 
    :showSubscribed="false" 
    :loading="store.loading"
    :offsetTop="store.navHeight"
    class="search-list"
    :style="{'padding-top': store.navHeight + 'px'}"
  />
</template>

<script>
  import { onMounted } from 'vue';
  import { useSearch } from '@/store/search';

  export default {
    name: 'SearchList',
    setup() {
      const store = useSearch();

      onMounted(() => {
        // 首先清空数据
        store.songs = [];
        store.reqSearchList();
      })

      return {
        store,
      }
    }
  }

</script>

<style lang="scss" scoped>
.search-list {
  min-height: 100vh;
  border-radius: 0;
  padding-bottom: 0;
}
</style>
