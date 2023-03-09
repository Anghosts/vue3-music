<template>
  <div class="top-nav" ref="nav">
    <div class="left" @click="store.showDetail = false">
      <van-icon name="arrow-left" size="0.7rem" color="#fff"/>
    </div>
    <Vue3Marquee>
      <p class="title">{{ store.nowPlayData.name }}</p>
    </Vue3Marquee>
    <div class="right">
      <base-icon name="icon-fenxiang" color="#fff"/>
    </div>
  </div>
  <div class="center-container" ref="center">
    <div class="cd" v-show="!showLyric" @click="showLyric = true">
      <img :src="getAssetsFile('images/needle-ab.png')" alt="" :class="{play: playStatus}">
      <div :class="{play: playStatus, pause: !playStatus}">
        <img :src="getAssetsFile('images/disc.png')" alt="">
        <img :src="store.nowPlayData.al.picUrl" alt="" v-if="store.nowPlayData.al">
        <img :src="getAssetsFile('images/disc_default.png')" alt="" v-else>
      </div>
    </div>
    <div class="lyric" v-show="showLyric" @click="showLyric = false" ref="lyric">
      <p 
        v-for="(lyric,index) in lyricList" 
        :key="index" 
        :class="{active: (currentTime * 1000 >= lyric.time) && (currentTime * 1000 < lyric.pre)}"
      >
        {{ lyric.lyric }}
      </p>
    </div>
  </div>
  <div class="bottom-control">
    <IconNav :iconNavList="iconNavList" iconColor="#aaa" class="top"/>
    <div class="time-bar">
      <span>{{ formatData(currentTime) }}</span>
      <p class="progress" @click="handleProgress"><span :style="{width: progress + '%'}"></span></p>
      <span>{{ formatData(duration) }}</span>
    </div>
    <div class="bottom">
      <base-icon name="icon-liebiaoxunhuan" color="#aaa" size="0.7rem"/>
      <base-icon name="icon-shangyiqu" color="#aaa" size="1.2rem" @click="store.setPlayIndex(-1)"/>
      <van-icon name="play-circle-o"  size="1.7rem" 
        color="#aaa" @click="store.setPlayStatus(true)" v-if="!playStatus"/>
      <van-icon name="pause-circle-o" size="1.7rem" 
        color="#aaa" @click="store.setPlayStatus(false)" v-else/>
      <base-icon name="icon-xiayiqu" color="#aaa" size="1.2rem" @click="store.setPlayIndex(1)"/>
      <base-icon size="0.7rem" color="#aaa" name="icon-bofangduilie"/>
    </div>
  </div>
</template>

<script>
  import { reactive,onMounted,toRefs,computed,watch,ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMusicControl } from '@/store/musicControl';
  import getAssetsFile from '@/utils/getAssetsFile';
  import { getMusicLyric } from '@/api/musicControl';
  

  export default {
    name: 'MusicDetail',
    setup() {
      const state = reactive({
        iconNavList: [
          {icon: 'like-o'},
          {icon: 'upgrade', style:'transform:rotate(180deg)'},
          {icon: 'link-o'},
          {icon: 'chat-o'},
          {icon: 'ellipsis'},
        ],
        showLyric: false,
        timer: null,
        lyricTemp: {
          y: 0,
          scrollTop: 0,
          isFirst: true,
          count: 0
        }
      })
      const store = useMusicControl();
      const { playList,playListIndex,playStatus,currentTime,duration } = storeToRefs(store);

      // 获取歌词
      async function getLyric() {
        let { lrc } = await getMusicLyric(store.nowPlayData.id);
        store.lyric = lrc.lyric;
      }

      // 格式化时间
      function formatData(time) {
        const minute = parseInt(time / 60 % 60)
        const second = Math.ceil(time % 60)    
        const formatSecond = second > 59 ? 59 : second
        return `${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
      }
      // 设置进度条时间
      function handleProgress(e) {
        let offsetLeft = e.offsetX;
        let width = e.currentTarget.offsetWidth;
        let value = duration.value * ((offsetLeft / width));
        store.setCurrentTime(value);
      }

      // 歌词列表
      const lyricList = computed(() => {
        let list = [];
        if (store.lyric) {
          list = store.lyric.split(/[\n]+/g).map(item => {
            if (item) {
              let min = item.slice(1,3);
              let sec = item.slice(4,6);
              let millSec = item.match(/\d{2,3}(?=])/);
              millSec = millSec ? millSec[0] : '';
              let lyric = item.match(/([^\]]+)$/) ;
              lyric = lyric ? lyric[0] : '';
              let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + millSec * 1;
              return {min,sec,millSec,lyric,time};
            } else {
              return {};
            }
          })
          list.forEach((item,index) => {
            if (index == list.length - 1) {
              item.pre = 0;
            } else {
              item.pre = list[index + 1].time || 0;
            }
          })
        }
        return list;
      })
      // 进度条进度
      const progress = computed(() => {
        return ((currentTime.value / duration.value) * 100).toFixed(1);
      })

      const lyric = ref();
      const center = ref();
      const nav = ref();
      // 监视歌曲播放时间变化，自动滚动歌词
      watch(()=>currentTime.value, () => {
        if (!lyric.value) return;
        let p = lyric.value.querySelector('p.active');
        let centerEle = center.value;
        let centerHeight = centerEle.offsetHeight;
        let navHeight = nav.value.offsetHeight;
        let scrollTop = p ? p.getBoundingClientRect().top : null;

        let y = 0;
        // 计算出滚动条需要滚动的高度
        if (p && p.offsetHeight && scrollTop) {
          if (scrollTop > centerHeight / 2 + navHeight || scrollTop < 0) {
            y = p.offsetTop - navHeight - centerHeight / 2;
          }
          if (y) {
            clearInterval(state.timer);
            y = parseInt(y.toFixed(0));
            state.timer = setInterval(() => {
              let top = parseInt(centerEle.scrollTop.toFixed(0));
              if (top == y || p.className != 'active' || !y) clearInterval(state.timer)
              if (state.lyricTemp.count > 30) {
                state.lyricTemp.count = 0;
                clearInterval(state.timer);
              }

              state.lyricTemp.y = y;
              state.lyricTemp.scrollTop = top;

              let offset = (y - top) / 10;
              centerEle.scrollTop += offset;

              if (y == state.lyricTemp.y && top == state.lyricTemp.scrollTop) {
                state.lyricTemp.count++;
              }
            }, 15)
          }
        }
      })

      onMounted( () => {
        getLyric();
      })

      return {
        ...toRefs(state),
        store,
        playList,
        playListIndex,
        playStatus,
        currentTime,
        duration,
        getAssetsFile,
        lyricList,
        lyric,
        center,
        nav,
        formatData,
        progress,
        handleProgress,
      }
    }
  }

</script>

<style lang="scss" scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .title {
    font-size: 18px;
    color: #fff;
    padding: 0 15px;
  }
  .left {
    margin-right: 15px;
  }
  .right {
    margin-left: 30px;
  }
}
.center-container {
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  transition: all .2s;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .cd {
    display: flex;
    flex-flow: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    width: 100%;
    >img {
      position: absolute;
      width: 85px;
      left: 46%;
      transition: transform .5s;
      transform-origin: 13px 13px;
      transform: rotate(-35deg);
      &.play {
        transform: rotate(-5deg)
      }
    }
    div {
      position: relative;
      margin-top: 67px;
      width: 70%;
      z-index: -1;
      animation: 15s linear 0s infinite paused play;
      &.play {
        animation-play-state: running;
      }
      &.pause {
        animation-play-state: paused;
      }
      img {
        width: 100%;
        &:last-child {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: scale(0.63);
        }
      }
    }
  }
  .lyric {
    margin: 20px 0;
    padding: 0 15px;
    text-align: center;
    font-size: 18px;
    color: #aaa;
    p {
      line-height: 2;
      transition: color .2s;
      &.active {
        color: #eee;
        font-size: 18px;
      }
    }
  }
}
.bottom-control {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 10px 0 15px;
  text-align: center;
  background-color: #2b2b2b;
  :deep(i) {
    flex: 1;
    &:active {
      color: #ccc !important;
    }
  }
  .top {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px; 
  }
  .time-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #aaa;
    margin: 20px 0;
    padding: 0 20px;
    width: 100%;
    font-size: 16px;
    .progress {
      position: relative;
      flex: 1;
      height: 3px;
      margin: 0 8px;
      border-radius: 1.5px;
      background-color: #aaa;
      span {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: #eee;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}
</style>
