<template>
  <router-view />
  <div class="music-control" @click.self="showDetail = true" v-show="$route.meta.hidden ? false : true">
    <div class="left" @click="showDetail = true">
      <van-image
        width="1.2rem"
        height="1.2rem"
        :src="nowPlayData.al.picUrl"
      />
      <div class="song-name">
        <span class="base-line-one">{{ nowPlayData.name }}</span>
        <span>这里是歌词~</span>
      </div>
    </div>
    <div class="right">
      <van-icon name="play-circle-o"  size="1rem" 
        color="#666" style="margin-right:0.8rem" 
        @click="store.setPlayStatus(true)" v-if="!playStatus"/>
      <van-icon name="pause-circle-o" size="1rem" 
        color="#666" style="margin-right:0.8rem;" 
        @click="store.setPlayStatus(false)" v-else/>
      <base-icon size="0.8rem" color="#666" name="icon-bofangduilie"/>
      <audio 
        :src="`https://music.163.com/song/media/outer/url?id=${nowPlayData.id}.mp3`" 
        ref="audio"
        @ended="store.setPlayIndex(1)"
        @timeupdate="audioTime"
        @error="audioError"
        @canplay="store.setDuration"
      ></audio>
    </div>
  </div>
  <van-popup 
    v-model:show="showDetail" 
    position="right" 
    :style="{ height: '100%', width: '100%' }"
    class="music-detail">
    <MusicDetail/>
  </van-popup>
</template>

<script>
  import { ref,onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMusicControl } from '@/store/musicControl';
  import MusicDetail from './MusicDetail.vue';

  export default {
    name: 'MusicControl',
    components: {
      MusicDetail
    },
    setup() {
      // store
      const store = useMusicControl();
      // audio DOM元素
      const audio = ref();
      // 对 store 进行解构
      const { playList,playListIndex,playStatus,showDetail,nowPlayData } = storeToRefs(store);

      function audioTime(e) {
        store.currentTime = e.target.currentTime;
      }
      function audioError() {
        alert('播放错误，需要登录或者需要VIP');
      }

      onMounted(() => {
        store.el = audio.value;
      })

      return {
        store,
        playList,
        playListIndex,
        playStatus,
        audio,
        showDetail,
        nowPlayData,
        audioTime,
        audioError
      }
    }
  }
</script>

<style lang="scss" scoped>
  .music-control {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 58px;
    padding: 0 7px;
    background-color: #fff;

    .left {
      display: flex;
      align-items: center;
      :deep(img) {
        border-radius: 0.6rem;
      }
      .song-name {
        display: flex;
        flex-flow: column;
        margin-left: 10px;
        max-width: 190px;
        span:first-child {
          font-size: 17px;
        }
        span:last-child {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
</style>

<style>
  .music-detail {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    background-color: #2b2b2b;
  }
</style>
