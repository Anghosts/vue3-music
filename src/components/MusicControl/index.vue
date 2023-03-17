<template>
  <div class="music-control" @click.self="showDetail = true" v-show="$route.meta.hidden ? false : true">
    <div class="left" @click="showDetail = true">
      <van-image
        width="1.2rem"
        height="1.2rem"
        round
        :src="nowPlayData.al.picUrl"
        :class="{play: playStatus, pause: !playStatus}"
        :error-icon="getAssetsFile('images/disc_default.png')"
        :loading-icon="getAssetsFile('images/disc_default.png')"
        class="music-image"
      />
      <span class="van-ellipsis song-name">{{ nowPlayData.name }}</span>
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
  import getAssetsFile from '@/utils/getAssetsFile';

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
        console.log('播放错误，以为您自动切换下一首！');
        store.setPlayIndex(1);
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
        audioError,
        getAssetsFile
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
      .music-image {
        animation: 20s linear 0s infinite paused play;

        &.play {
          animation-play-state: running;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
      .song-name {
        display: flex;
        flex-flow: column;
        margin-left: 10px;
        max-width: 190px;
        font-size: 17px;
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
