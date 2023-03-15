import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
  state: () => {
    return {
      cookie: localStorage.getItem('cookie') || '',
      isLogin: false,
    }
  },
  actions: {
    // 保存cookie
    setCookie(cookie) {
      localStorage.setItem('cookie', encodeURIComponent(cookie))
    },
    // 删除cookie
    removeCookie() {
      this.cookie = '';
      localStorage.removeItem('cookie');
    }
  },
  getters: {}
})