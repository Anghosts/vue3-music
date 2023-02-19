<template>
  <router-view />
  <div class="music-control">
    <div class="left">
      <van-image
        width="1.2rem"
        height="1.2rem"
        :src="playList[playListIndex].al ? playList[playListIndex].al.picUrl : playList[playListIndex].picUrl"
      />
      <div class="song-name">
        <span class="base-line-one">{{ playList[playListIndex].name }}</span>
        <span>横滑切换歌曲哦~</span>
      </div>
    </div>
    <div class="right">
      <van-icon name="play-circle-o"  size="1rem" 
        color="#666" style="margin-right:20px;" 
        @click="autoplay(true)" v-if="!playStatus"/>
      <van-icon name="pause-circle-o" size="1rem" 
        color="#666" style="margin-right:20px;" 
        @click="autoplay(false)" v-else/>
      <van-icon name="bars" size="0.9rem" color="#666"/>
      <audio 
        :src="playList[playListIndex].id ? 
          `https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3` :
          ''" 
        ref="audio"
      ></audio>
    </div>
  </div>
</template>

<script>
  import { reactive,toRefs,ref,onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMusicControl } from '@/store/musicControl';
  import { getNewMusic } from '@/api/musicControl';

  export default {
    name: 'MusicControl',
    setup() {
      const store = useMusicControl();
      // audio DOM元素
      const audio = ref();
      // 对 store 进行解构
      const { playList,playListIndex,playStatus } = storeToRefs(store);

      // 获取随机歌曲
      getMusic();
      async function getMusic(limit=1) {
        let { result } = await getNewMusic(limit);
        store.playList = result;
      }

      // 播放音乐
      function autoplay(status) {
        store.setPlayStatus(status);
      }

      onMounted(() => {
        store.el = audio.value;
      })

      return {
        playList,
        playListIndex,
        playStatus,
        audio,
        autoplay
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
    border-top: 1px solid #999;
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
