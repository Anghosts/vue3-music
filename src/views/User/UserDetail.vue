<template>
  <div class="detail-header">
    <van-image
      round
      width="2rem"
      height="2rem"
      fit="cover"
      :src="profile.avatarUrl"
      class="avatar"
    />
    <div class="user-info">
      <h2>{{ profile.nickname }}</h2>
      <div class="other">
        <span>{{ profile.follows }} 关注</span>
        <span>{{ profile.followeds }} 粉丝</span>
        <span>Lv.{{ level }}</span>
      </div>
    </div>
  </div>
  <IconNav 
    :iconNavList="iconNavList" 
    iconColor="#dd001b" 
    size="0.85rem" 
    textSize="0.35rem"
    textColor="#666"
    class="icon-nav"
  />
  <div class="my-like-music" @click="$router.push('/playlistdetail?id=' + likePlaylist.id)">
    <img :src="likePlaylist.coverImgUrl" alt="" class="first-music">
    <div class="like-text">
      <p>我喜欢的音乐</p>
      <span>{{ likeCount }}首</span>
    </div>
  </div>
  
  <van-tabs v-model:active="playlistActive" scrollspy class="playlist-nav">
    <van-tab 
      :title="playlistItem.title" 
      class="playlist-item" 
      v-for="(playlistItem,index) in playlist" 
      :key="index"
    >
      <div class="header">
        <div class="left">{{ `${playlistItem.title}（${playlistItem.list.length}个）` }}</div>
        <div class="right" v-if="index==0"><van-icon name="plus" size="0.55rem" color="#aaa"/></div>
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text=""
        @load="loadPlaylist"
      >
        <van-cell 
          center
          @click="$router.push('/playlistdetail?id=' + item.id)"
          v-for="item in playlistItem.list" 
          :key="item.id" 
          :title="item.name" 
          :label="`
            ${item.trackCount}首
            ${item.subscribed ? '，by ' + item.creator.nickname : ''}`"
          title-style="margin-left: 10px;"
          title-class="van-ellipsis"
          label-class="van-ellipsis"
          clickable
          style="padding-left:15px;padding-right:15px;"
        >
          <template v-slot:icon>
            <van-image 
              width="1.5rem"
              height="1.45rem"
              radius="10px"
              :src="item.coverImgUrl" 
            />
          </template>
          <template #right-icon>
            <van-icon name="ellipsis" size="0.55rem" color="#999" style="transform:rotate(90deg)" />
          </template>
        </van-cell>
      </van-list>
    </van-tab>
  </van-tabs>
  <!-- <button @click="handleLogout">退出登录</button> -->
  
</template>

<script>
  import { reactive,toRefs } from 'vue';
  import { useUser } from '@/store/user';
  import { getAccountInfo,getUserDetail,getUserPlaylist,logout } from '@/api/user';

  export default {
    name: 'UserDetail',
    setup() {
      const state = reactive({
        profile: {},
        level: '',
        uid: '',
        likeCount: 0,
        playlistActive: 0,
        loading: false,
        finished: false,
        likePlaylist: [],
        playlist: [
          { title: '创建歌单', list: [], pager: 1 },
          { title: '收藏歌单', list: [], pager: 1 },
        ],
        iconNavList: [
          {title:'最近播放', icon:'clock'},
          {title:'我的好友', icon:'friends'},
          {title:'收藏和赞', icon:'star'},
          {title:'本地/下载', icon:'music'},
        ]
      })
      const store = useUser();

      // 退出登录
      async function handleLogout() {
        let result = await logout();
        store.removeCookie();
        store.isLogin = false;
      }

      // 获取用户信息
      getInfo();
      async function getInfo() {
        // 获取账号信息
        let { profile: { userId } } = await getAccountInfo();
        // 获取用户详情
        let { profile, level } = await getUserDetail(userId);
        // 保存账号信息
        state.profile = profile || {};
        state.level = level;
        state.uid = userId;
        loadPlaylist();
      }

      // 加载用户歌单
      async function loadPlaylist() {
        if (!state.uid) return
        
        // 计算数据偏移量
        let offset = 0;
        let limit = 30;
        // if (state.playlist[0].list.length >= state.playlist[0].pager * limit) {
        //   state.finished = false;
        //   state.playlist[0].pager += 1;
        //   offset = (state.playlist[0].pager - 1) * limit;
        // } 
        // if (state.playlist[1].list.length >= state.playlist[1].pager * limit) {
        //   state.finished = false;
        //   state.playlist[1].pager += 1;
        //   offset = (state.playlist[1].pager - 1) * limit;
        // }

        // 请求数据
        let { playlist } = await getUserPlaylist(state.uid, limit, offset);
        // 保存歌单数据
        state.playlist[0].list = playlist.filter((item,index) => {
          return !item.subscribed && index != 0;
        })
        state.playlist[1].list = playlist.filter(item => {
          return item.subscribed;
        })
        state.likePlaylist = playlist[0];
        // 保存我喜欢的音乐列表歌曲数量
        state.likeCount = playlist[0].trackCount;
        state.loading = false;

        // 数据加载完成
        if (playlist.length <= state.playlist[0].pager * limit || playlist.length <= state.playlist[1].pager * limit) {
          state.finished = true;
        }
    };

      return {
        ...toRefs(state),
        handleLogout,
        getInfo,
        loadPlaylist
      }
    }
  }

</script>

<style lang="scss" scoped>
.detail-header {
  margin-top: 40px;
  position: relative;
  .avatar {
    position: absolute;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
  .user-info {
    padding: 45px 0 15px;
    border-radius: 10px;
    filter: drop-shadow(0 0 8px #eee);
    background-color: #fff;
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 400;
    }
    .other {
      margin-top: 8px;
      font-size: 14px;
      color: #777;
      span {
        padding: 0 8px;
        border-right: 1px solid #eee;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
.icon-nav {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  :deep(.icon-nav-item) {
    span {
      margin-top: 4px;
    }
  }
}
.my-like-music {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    margin: 0 auto;
    height: 100%;
    width: 0px;
    background-color: #eee;
  }
  &:active {
    &::before {
      animation: scale .25s;
    }
  }
  .first-music {
    z-index: 10;
    width: 58px;
    height: 55px;
    border-radius: 7px;
  }
  .like-text {
    z-index: 10;
    text-align: left;
    margin-left: 10px;
    font-size: 16px;
    span {
      font-size: 12px;
      color: #777;
    }
  }
}
.playlist-nav {
  margin-top: 10px;
  :deep(.van-tabs__wrap) {
    display: block !important;
    .van-tabs__nav--line {
      --van-tabs-bottom-bar-color: #dd001b;
      --van-tabs-nav-background: transparent;
      .van-tabs__line {
        bottom: 22px;
      }
    }
  }
  .playlist-item {
    // padding: 15px;
    margin-top: 10px;
    border-radius: 10px;
    text-align: left;
    background-color: #fff;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      padding: 15px 15px 0;
      .left {
        font-size: 14px;
        color: #777;
      }
    }
    :deep(.van-cell) {
      &::after {
        border: none;
      }
    }
  }
}

</style>
