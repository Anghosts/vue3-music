<template>
  <MusicList :songs="songs" :showHeader="false" class="search-list"/>
</template>

<script>
  import { ref } from 'vue';
  import { getSearchList } from '@/api/search';

  export default {
    name: 'SearchList',
    props: ['kw'],
    setup(props) {
      const songs = ref([]);

      // 发送请求，根据关键字进行搜索
      reqSearchList();
      async function reqSearchList() {
        // 请求数据
        let { result } = await getSearchList(props.kw);
        if (result !== {}) {
          // 请求成功后，保存数据
          songs.value = result.songs;
        }
      }

      return {
        songs,
        reqSearchList,
      }
    }
  }

</script>

<style lang="scss" scoped>
.search-list {
  border-radius: 0;
  :deep(.music-list) {
    padding-bottom: 0;
    padding-top: 55px;
  }
}
</style>
