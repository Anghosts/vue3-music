<template>
  <div class="search-history" v-show="store.searchHistory.length">
    <div class="title">
      <h2>搜索历史</h2> 
      <van-icon name="delete-o" size="0.6rem" 
        color="#c8c9cc" class="del" @click="store.removeSearchHistory"
      />
    </div>
    <van-tag 
      color="#ffe1e1" 
      text-color="#ad0000" 
      v-for="(item,index) in store.searchHistory" 
      :key="index" 
      size="large" 
      class="search-item"
      @click="handleSearchTag(item)"
    >
      {{ item }}
    </van-tag>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useSearch } from '@/store/search';

  export default {
    name: 'SearchHistory',
    setup() {
      const router = useRouter();
      const store = useSearch();

      // 点击搜索历史记录项
      function handleSearchTag(kw) {
        store.keyword = kw;
        store.pager = 1;

        // 将当前项放置第一位
        store.$patch(state => {
          for (let i = 0; i < state.searchHistory.length; i++) {
            if (kw == state.searchHistory[i]) {
              state.searchHistory.splice(i, 1);
              state.searchHistory.unshift(kw);
              return;
            }
          }
        })
        store.setSearchHistory();
        router.push('/search/list');
      }

      return {
        handleSearchTag,
        store
      }
    }
  }

</script>

<style lang="scss" scoped>
.search-history {
  padding: 10px;
  padding-top: 55px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      margin: 8px 0;
      font-size: 16px;
      color: #555;
    }
    .del {
      &:active {
        color: #999 !important;
      }
    }
  }
  
  .search-item {
    margin-right: 8px;
  }
}
</style>
