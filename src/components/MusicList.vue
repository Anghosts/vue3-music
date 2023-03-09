<template>
  <div class="music">
    <div class="header-play" :class="{fixed:isFixed}" v-if="showHeader">
      <div class="left">
        <base-icon name="icon-shipin-r" size="0.7rem"/>
        <strong>播放全部</strong>
        <span>（共{{ songs.length }}首）</span>
      </div>
      <div class="right">
        <van-button 
          icon="plus" 
          type="danger"
          color="#dd1818"  
          class="star"
        >收藏 {{ subscribedCount }}</van-button>
      </div>
    </div>
    <div class="music-list" :class="{fixed:isFixed}">
      <div 
        class="music-list-item"
        :class="{active: song.id == nowPlayData.id}"
        v-for="(song, index) in songs" 
        :key="song.id" 
        @click="playMusic(index)"
      >
        <div class="left">
          <span class="index" v-if="song.id !== nowPlayData.id">{{ index + 1 }}</span>
          <div class="play-status" v-else>
            <van-icon name="play" color="#dd1818" size="0.7rem" v-show="!playStatus"/>
            <van-icon name="pause" color="#dd1818" size="0.7rem" v-show="playStatus"/>
          </div>
          <div class="music-info">
            <span class="title base-line-one">{{ song.name }}</span>
            <div class="author base-line-one">
              <span v-for="author in song.ar" :key="author.id">{{ author.name }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <base-icon 
            name="icon-shipin" 
            color="#999"
            style="margin-right:20px" 
            v-if="song.mv || song.mvid" 
          />
          <van-icon name="wap-nav" color="#999" size="0.6rem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeToRefs } from 'pinia';
  import { useMusicControl } from '@/store/musicControl';

  export default {
    name: 'MusicList',
    props: {
      songs: {
        type: Array,
        default: []
      },
      subscribedCount: {
        type: Number,
        default: 0
      },
      isFixed: {
        type: Boolean,
        default: false
      },
      showHeader: {
        type: Boolean,
        default: true
      }
    },
    setup(props) {
      // store
      const musicControl = useMusicControl();
      // 播放状态
      const { playStatus,playList,playListIndex,nowPlayData } = storeToRefs(musicControl);

      // 播放音乐
      function playMusic(index) {
        musicControl.playList = props.songs;
        musicControl.setPlayIndex(0, index);
      }

      return {
        playMusic,
        playListIndex,
        playStatus,
        playList,
        nowPlayData,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .music {
    overflow: hidden;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    .header-play {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 20px 20px 0 0;
      padding: 5px;
      z-index: 10;
      transition: border-radius .25s;
      background-color: #fff;
      &.fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 50px;
        border-radius: 0;
      } 
      .left {
        display: flex;
        align-items: center;
        strong {
          margin-left: 8px;
          font-size: 18px;
        }
        span {
          font-size: 14px;
          color: #666;
        }
      }
      .right {
        .star {
          border-radius: 22px;
        }
      }
    }
    .music-list {
      padding-bottom: 58px;
      &.fixed {
        margin-top: 53px;
      }
      .music-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        &:active {
          background-color: #eee;
        }
        &.active {
          .title {
            color: #dd1818;
          }
        }
        .left {
          display: flex;
          align-items: center;
          .index {
            width: 25px;
            margin-right: 10px;
            text-align: center;
            font-size: 15px;
            color: #777;
          }
          .play-status {
            width: 25px;
            margin-right: 10px;
          }
          .music-info {
            display: flex;
            flex-direction: column;
            .title {
              max-width: 240px;
              font-size: 17px;
            }
            .author {
              max-width: 240px;
              margin-top: 3px;
              font-size: 12px;
              color: #777;
              span {
                margin-right: 7px;
              }
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
