<template>
  <div class="top-nav">
    <div class="left">
      <van-icon name="arrow-left" size="0.7rem" @click="HandleLast"/>
    </div>
    <van-field
      v-model="keyword"
      class="search"
      left-icon="search"
      clear-icon="cross"
      placeholder="搜索"
      :autofocus="true"
      :clearable="true"
      @keydown.enter="handleSearch"
    />
    <div class="right" @click="handleSearch">搜索</div>
  </div>
  <SearchHistory v-if="scene == 1" :searchHistory="searchList" @reqSearchList="reqSearchList"/>
  <SearchList v-if="scene == 2" :kw="keyword" />
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import SearchHistory from './SearchHistory.vue';
  import SearchList from './SearchList.vue';
  
  export default {
    name: 'Search',
    components: {
      SearchHistory,
      SearchList
    },
    setup() {
      const state = reactive({
        keyword: '',
        searchList: [],
        songs: [],
        scene: 1,  // 1: 显示搜索历史，2: 显示搜索结果
      })
      const router = useRouter();

      // 读取搜索历史
      state.searchList = JSON.parse(localStorage.getItem('searchHistory')) || [];

      // 搜索事件
      function handleSearch() {
        if (!state.keyword.trim()) return;
        state.searchList.unshift(state.keyword);
        // 搜索历史去重
        state.searchList = [...new Set(state.searchList)];
        // 搜索历史限制长度
        if (state.searchList.length > 10) {
          state.searchList.pop();
        }
        // 持久化存储搜索历史
        localStorage.setItem('searchHistory', JSON.stringify(state.searchList));
        reqSearchList();
      }
      // 切换搜索列表
      function reqSearchList(kw=null) {
        if (kw) state.keyword = kw;
        state.scene = 2;
      }
      // 后退按钮
      function HandleLast() {
        if (state.scene == 2) {
          state.scene = 1;
        } else {
          router.go(-1);
        }
      }

      return {
        ...toRefs(state),
        handleSearch,
        reqSearchList,
        HandleLast,
      }
    }
  }

</script>

<style lang="scss" scoped>
.top-nav {
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fd;
  .left {
    margin-right: 10px;
  }
  .search {
    padding: 5px 15px;
    border-radius: 22px;
    font-size: 16px;
    border: 1px solid #eee;
    :deep(.van-icon) {
      font-size: 0.6rem;
      color: #c8c9cc;
    }
  }
  .right {
    padding-left: 10px;
    font-size: 16px;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
