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
    :loading="loading"
    :offsetTop="offsetTop"
    :maxCount="maxCount"
    @onLoad="onLoadListplay"
  />
</template>

<script>
  import { useRoute } from 'vue-router';
  import { reactive,toRefs,onBeforeUnmount,onMounted } from 'vue';
  import { getPlayListDetail,getAllMusic } from '@/api/playListDetail';

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
        // 歌曲加载
        loading: true,
        // 歌曲列表头部距离视口的距离
        offsetTop: 0,
        // 页码
        pager: 1,
        // 最大歌曲数
        maxCount: 0
      })

      const route = useRoute();
      
      getDetail();
      // 获取歌单详情数据
      async function getDetail() {
        let id = route.query.id;
        let { playlist } = await getPlayListDetail(id);
        state.playListData = playlist;
        state.maxCount = playlist.trackCount;
        getSongs(id);
      }
      // 获取歌单全部歌曲信息
      function getSongs(id, limit=20, offset=0) {
        return new Promise((resolve, reject) => {
          getAllMusic(id, limit, offset).then(result => {
            state.songs = result.songs;
            state.loading = false;
            resolve(result);
          }).catch(err => {
            reject(err);
          })
        })
      }

      // 头部导航栏根据滚动变化背景颜色
      function handleScroll() {
        var header = document.querySelector('.play-header');
        var nav = document.querySelector('.top-nav');
        var app = document.querySelector('#app');
        state.offsetTop = nav.offsetHeight;

        app.onscroll = function(e) {
          let navHeight = nav.offsetHeight;
          let headerHeight = header.offsetHeight ;
          let baseHeight = headerHeight + navHeight;
          let scrollTop = e.target.scrollTop;
          let y = header.getBoundingClientRect().bottom.toFixed(0)
          
          if (y <= navHeight) {
            state.opacity = 1;
          }
          if (y == baseHeight || y > navHeight) {
            state.opacity = 0;
          }
          if (y > navHeight && y < baseHeight) {
            state.opacity = (scrollTop / headerHeight).toFixed(2);
          }
        }
      }

      // 歌单音乐列表加载事件
      function onLoadListplay() {
        let limit = state.pager * 20;
        getSongs(route.query.id, limit).then(result => {
          if (result.code == 200) {
            state.pager += 1;
          }
        }).catch(err => {
          console.log(err);
        })
      }

      onMounted(() => {
        handleScroll();
      })
      onBeforeUnmount(() => {
        window.onscroll = null;
      })

      return {
        ...toRefs(state),
        onLoadListplay
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
          color: #ddd;
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
    .icon-nav-item {
      span {
        margin-top: 5px;
      }
    }
  }
 }
</style>
