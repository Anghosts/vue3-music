<template>
  <div class="play-header">
    <div class="bg"><img :src="playListData.coverImgUrl" /></div>
    <div class="top-nav" :style="{backgroundColor:`rgba(100,100,100,${opacity})`}">
      <div class="left">
        <van-icon name="arrow-left" size="0.7rem" @click="$router.go(-1)"/>
        <span class="text">歌单</span>
      </div>
      <div class="right">
        <van-icon name="search" size="0.7rem" style="margin-right: 20px;"/>
        <van-icon name="wap-nav" size="0.8rem" />
      </div>
      <div class="bg"><img :src="playListData.coverImgUrl" :style="{opacity}"/></div>
    </div>
    <div class="play-info">
      <div class="left">
        <van-image
          width="4rem"
          height="4rem"
          :src="playListData.coverImgUrl"
        />
      </div>
      <div class="right">
        <p class="base-line-two">{{ playListData.description }}</p>
        <div class="creator">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="playListData.creator.avatarUrl"
          />
          <span class="nickname">{{ playListData.creator.nickname }}</span>
          <van-icon name="arrow" color="#d3d3d3" size="0.4rem"/>
        </div>
        <p class="signature base-line-two">{{ playListData.creator.signature }}</p>
      </div>
    </div>
    <IconNav :iconNavList="iconNavList" textColor="#fff" class="icon-nav"/>
  </div>
  <MusicList 
    :songs="songs" 
    :subscribedCount="playListData.subscribedCount" 
    :isFixed="isFixed" 
  />
</template>

<script>
  import { useRoute } from 'vue-router';
  import { reactive,toRefs,onBeforeUnmount,onMounted } from 'vue';
  import { useMusicControl } from '@/store/musicControl';
  import { getPlayListDetail,getAllMusic } from '@/api/playListDetail';
  import getScrollTop from '@/utils/getScrollTop';

  export default {
    name: 'PlayListDetail',
    setup() {
      const state = reactive({
        // 歌单详情信息
        playListData: {
          coverImgUrl: '',
          description: '',
          creator: {
            avatarUrl: '',
            nickname: '',
            signature: ''
          }

        },
        // 导航选项
        iconNavList: [
          {title:'评论',icon:'chat-o'},
          {title:'分享',icon:'link-o'},
          {title:'下载',icon:'down'},
          {title:'多选',icon:'passed'},
        ],
        // 歌曲信息
        songs: [],
        // 头部导航背景透明度
        opacity: 0,
        // 音乐列表头部是否固定
        isFixed: false,
      })
      
      getDetail();
      // 获取歌单详情数据
      async function getDetail() {
        let id = useRoute().query.id;
        let { playlist } = await getPlayListDetail(id);
        state.playListData = playlist;
        getSongs(id);
      }
      // 获取歌单全部歌曲信息
      async function getSongs(id, limit=20, offset=0) {
        let { songs } = await getAllMusic(id, limit, offset);
        state.songs = songs;
      }

      function handleScroll() {
        var header = document.querySelector('.play-header');
        var nav = document.querySelector('.top-nav');

        window.onscroll = function() {
          let navHeight = nav.offsetHeight;
          let headerHeight = header.offsetHeight ;
          let baseHeight = headerHeight + navHeight;
          let scrollTop = getScrollTop();
          let y = header.getBoundingClientRect().bottom.toFixed(0)
          
          if (y <= navHeight) {
            state.isFixed = true;
            state.opacity = 1;
          }
          if (y == baseHeight || y > navHeight) {
            state.isFixed = false;
            state.opacity = 0;
          }
          if (y > navHeight && y < baseHeight) {
            state.opacity = (scrollTop / headerHeight).toFixed(2);
          }
        }
      }

      onMounted(() => {
        handleScroll();
      })
      onBeforeUnmount(() => {
        window.onscroll = null;
      })

      return {
        ...toRefs(state),
      }
    }
  }
</script>

<style lang="scss" scoped>
 .play-header {
    position: relative;
    height: 240px;
    .bg {
      position: absolute;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(25px);
        transform: scale(1.5);
      }
  }
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .left {
      padding: 10px;
      display: flex;
      align-items: center;
      .text {
        margin-left: 10px;
        font-size: 20px;
      }
    }
    .right {
      padding: 10px;
    }
    .bg {
      overflow: hidden;
    }
  }
  .play-info {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px 10px;
    padding-top: 0;
    margin-top: 51px;
    overflow: hidden;
    .left {
      margin-right: 10px;
      :deep(img) {
        border-radius: 10px;
      }
    }
    .right {
      p {
        margin: 0;
        font-size: 18px;
        color: #fff;
        text-align: justify;
      }
      .creator {
        display: flex;
        align-items: center;
        margin: 10px 0;
        .nickname {
          max-width: 130px;
          margin-left: 7px;
          margin-right: 5px;
          font-size: 16px;
          color: #d3d3d3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .signature {
        font-size: 14px;
        color: #ddd;
      }
    }
  }
  :deep(.icon-nav) {
    .icon-nav-item span {
      margin-top: 5px;
    }
  }
 }
</style>
