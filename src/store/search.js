import { defineStore } from 'pinia';
import { getSearchList } from '@/api/search';

// 获取搜索历史
function getHistory() {
  return JSON.parse(localStorage.getItem('searchHistory')) || []
}

export const useSearch = defineStore('search', {
  state: () => {
    return {
      searchHistory: getHistory(),
      songs: [],
      keyword: '',
      loading: true,
      navHeight: 0,
      songCount: 0,
      pager: 1
    }
  },
  actions: {
    // 获取搜索历史
    getSearchHistory() {
      return getHistory();
    },
    // 更新搜索历史
    setSearchHistory() {
      if (!this.keyword.trim()) return;
      this.searchHistory.unshift(this.keyword);
      // 搜索历史去重
      this.searchHistory = [...new Set(this.searchHistory)];
      // 搜索历史限制长度
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop();
      }
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    },
    // 删除搜索历史
    removeSearchHistory() {
      localStorage.removeItem('searchHistory');
      this.searchHistory = [];
    },
    // 发送请求，根据关键字进行搜索
    async reqSearchList(limit) {
      // 判断搜索关键字是否为空，如果为空，就取搜索历史第一项
      if (!this.keyword) {
        let history = this.getSearchHistory();
        this.keyword = history.length > 0 ? history[0] : '';
      }
      // 请求数据
      let { result } = await getSearchList(this.keyword, limit);
      this.loading = false;
      if (result && result !== {}) {
        // 请求成功后，保存数据
        this.songs = result.songs;
        this.songCount = result.songCount;
        return Promise.resolve(result);
      } else {
        return Promise.reject();
      }
    }
  },
  getters: {}
})