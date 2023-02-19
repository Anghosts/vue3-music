import { defineStore } from 'pinia';

export const useMusicControl = defineStore('musicControl', {
  state: () => {
    return {
      playList: [{
        al: {
          picUrl: ''
        },
        name: '',
        id: 0
      }],
      playListIndex: 0,
      playStatus: false,
      el: null,
    }
  },
  actions: {
    setPlayStatus(status) {
      status ? this.el.play() : this.el.pause();
      this.playStatus = status;
    },
  },
  getters: () => {

  }
})