<template>
  <MusicList 
    :songs="store.songs" 
    :showSubscribed="false" 
    :loading="store.loading"
    :offsetTop="store.navHeight"
    class="search-list"
    :style="{'padding-top': store.navHeight + 'px'}"
    @onLoad="onLoadList"
    :maxCount="100"
  />
</template>

<script>
  import { onMounted } from 'vue';
  import { useSearch } from '@/store/search';

  export default {
    name: 'SearchList',
    setup() {
      const store = useSearch();

      // 歌曲列表加载事件
      function onLoadList() {
        let limit = store.pager * 20;
        store.reqSearchList(limit).then(() => {
          store.pager += 1;
        }).catch(err => err)
      }

      onMounted(() => {
        // 首先清空数据
        store.songs = [];
        store.reqSearchList();
      })

      return {
        store,
        onLoadList,
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
