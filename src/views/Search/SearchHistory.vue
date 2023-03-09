<template>
  <div class="search-history" v-show="searchHistory.length">
    <div class="title">
      <h2>搜索历史</h2> 
      <van-icon name="delete-o" size="0.6rem" 
        color="#c8c9cc" class="del" @click="removeHistory"
      />
    </div>
    <van-tag 
      color="#ffe1e1" 
      text-color="#ad0000" 
      v-for="(item,index) in searchHistory" 
      :key="index" 
      size="large" 
      class="search-item"
      @click="$emit('reqSearchList', item)"
    >
      {{ item }}
    </van-tag>
  </div>
</template>

<script>
  export default {
    name: 'SearchHistory',
    props: ['searchHistory'],
    setup(props) {
      function removeHistory() {
        localStorage.removeItem('searchHistory');
        props.searchHistory = [];
      }

      return {
        removeHistory,
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
