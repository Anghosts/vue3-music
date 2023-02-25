import { defineStore } from 'pinia';
import { nextTick } from 'vue';
import { getMusicLyric } from '@/api/musicControl';

export const useMusicControl = defineStore('musicControl', {
  state: () => {
    return {
      playList: [{        // 播放列表
        al: {
          id: 143247696,
          name: '月亮列车',
          picUrl: 'https://p2.music.126.net/h4AausrvLAktqbYWDOR1yw==/109951167268051499.jpg',
          pic_str: '109951167268051499',
        },
        name: '月亮列车',
        id: 1936609700
      }],
      playListIndex: 0,   // 当前播放音乐列表的索引
      playStatus: false,  // 播放状态
      showDetail: false,  // 歌曲详情界面的显示状态
      el: null,           // audio DOM元素
      lyric: '',          // 当前播放音乐的歌词
      duration: 0,        // 歌曲播放总时间
      currentTime: 0      // 当前播放时间
    }
  },
  actions: {
    // 设置播放状态
    setPlayStatus(status) {
      // 播放或者暂停
      status ? this.el.play() : this.el.pause();
      this.playStatus = status;
    },

    /**
     * 设置播放下标，切换音乐
     * @param {Number} value 基于当前下标值进行切换
     * @param {Number} indexValue 直接赋予下标值
     */
    async setPlayIndex(value,indexValue=null) {
      if (this.playList.length == 0) return
      let index = 0;
      if (value) {
        index = this.playListIndex + value;     
      } else if (indexValue !== null) {
        index = indexValue;
      } 
      // 校验
      if (index < 0) { index = this.playList.length - 1 }
      if (index > this.playList.length - 1) { index = 0 }
      this.playListIndex = index;
      // 获取歌词
      let { lrc } = await getMusicLyric(this.nowPlayData.id);
      this.lyric = lrc.lyric;
      
      nextTick(() => {
        this.setPlayStatus(true);
      })
    },
    // 获取歌曲播放时间
    setDuration() {
      this.duration = this.el.duration;
    },
    // 设置当前播放时间
    setCurrentTime(time) {
      this.el.currentTime = time;
    }
  },
  getters: {
    // 当前正在播放的音乐数据
    nowPlayData(state) {
      return state.playList[state.playListIndex];
    }
  }
})