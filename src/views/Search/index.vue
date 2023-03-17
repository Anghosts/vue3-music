<template>
  <div class="search-container">
    <div class="top-nav" ref="topNav">
      <div class="left">
        <van-icon name="arrow-left" size="0.7rem" @click="$router.go(-1)"/>
      </div>
      <van-field
        v-model="store.keyword"
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
    <router-view />
  </div>
</template>

<script>
  import { ref,onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSearch } from '@/store/search';
  
  export default {
    name: 'Search',
    setup() {
      const router = useRouter();
      const store = useSearch();

      // 搜索事件
      function handleSearch() {
        // 持久化存储搜索历史
        store.setSearchHistory();
        store.reqSearchList();
        // 初始化页码
        store.pager = 1;
        router.push('/search/list');
      }
      
      const topNav = ref();
      onMounted(() => {
        store.navHeight = topNav.value.offsetHeight - 1;
      })
      return {
        handleSearch,
        store,
        topNav
      }
    }
  }

</script>

<style lang="scss" scoped>
.search-container {
  min-height: 100%;
  background-color: #f8f9fd;
}
.top-nav {
  padding: 8px;
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
