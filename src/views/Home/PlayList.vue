<template>
  <div class="play-list">
    <div class="title">
      <span>发现好歌单</span>
      <span class="more">查看更多</span>
    </div>
    <van-swipe :loop="false" :width="130" :show-indicators="false" class="list-swipe">
      <van-swipe-item v-for="item in playList" :key="item.id" @click="gotoPlayListDetail(item.id)">
        <div class="image-info">
          <van-image
            width="100%"
            height="100%"
            :src="item.picUrl"
          />
          <div class="info">
            <van-icon name="play" color="#fff" size="0.5rem"/>
            <span class="count">{{ formatPlayCount(item.playCount) }}</span>
          </div>
        </div>
        <p class="play-name base-line-two">{{ item.name }}</p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { onMounted,reactive,toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import { getPlayList } from '@/api/home';

  export default {
    name: 'PlayList',
    setup() {
      const state = reactive({
        playList: []
      })
      const router = useRouter();

      // 获取歌单数据
      async function getData() {
        let { result } = await getPlayList();
        state.playList = result;
      }
      // 格式化播放数量
      function formatPlayCount(count) {
        if (count >= 100000000) {
          count = (count / 100000000).toFixed(2) + '亿';
        } else if (count >= 10000) {
          count = (count / 10000).toFixed(2) + '万';
        }
        return count;
      }
      // 跳转歌单详情界面
      function gotoPlayListDetail(id) {
        router.push({
          path: '/playlistdetail',
          query: { id }
        })
      }

      onMounted(() => {
        getData();
      })

      return {
        ...toRefs(state),
        formatPlayCount,
        gotoPlayListDetail
      }
    }
  }

</script>

<style lang="scss" scoped>
  .play-list {
    margin-top: 20px;
    padding: 0 10px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      span {
        font-size: 14px;
        &:first-child {
          font-size: 18px;
          font-weight: bold;
        }
        &:last-child {
          padding: 5px 10px;
          border: 1px solid #ddd;
          border-radius: 30px;
        }
      }
    }
    .list-swipe {
      height: 175px;
      
      :deep(.van-swipe-item) {
        img {
          border-radius: 10px;
        }
        &:first-child .image-info {
          padding-left: 0;
        }
        &:last-child .image-info {
          padding-right: 0;
        }
      }
      .play-name {
        box-sizing: border-box;
        padding: 0 6px;
        margin: 0;
        height: 39px;
        line-height: 1.5;
        font-size: 13px;
      }
      .image-info {
        position: relative;
        padding: 5px;
        padding-bottom: 0;
        box-sizing: border-box;
        
        .info {
          position: absolute;
          top: 7px;
          right: 10px;
          display: flex;
          color: #fff;
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>