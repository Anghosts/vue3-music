<template>
  <div class="home-top-nav">
    <van-icon name="wap-nav" size="0.8rem" @click="showBottom = true"/>
    <div class="nav-list">
      <span 
        v-for="nav in navList" 
        :key="nav.id" 
        :class="{active: nav.id==active}"
        @click="handleNav(nav)"
      >{{ nav.title }}</span>
    </div>
    <van-icon name="search" size="0.7rem" @click="$router.push('/search')"/>
  </div>
  <van-action-sheet
    v-model:show="showBottom"
    :actions="actions"
    cancel-text="取消"
    @select="onSelect"
  />
  <van-tabs v-model:active="active" swipeable class="container">
    <van-tab  title="我的">
      <User/>
    </van-tab>
    <van-tab  title="发现">
      <Home/>
    </van-tab>
    <van-tab  title="云村">
      云村
    </van-tab>
    <van-tab  title="视频">
      视频
    </van-tab>
  </van-tabs>
</template>

<script setup>
  import { ref,reactive,watch } from 'vue';
  import { useRouter } from 'vue-router';
  import Home from '@/views/Home/index.vue';
  import User from '@/views/User/index.vue';
  import { useUser } from '@/store/user';
  import { logout } from '@/api/user';
  
  const active = ref(parseInt(localStorage.getItem('tapBar')));
  const router = useRouter();
  const showBottom = ref(false);
  const userStore = useUser();

  // 导航栏数据
  const navList = reactive([
    {id:0,title:'我的',to:'/user'},
    {id:1,title:'发现',to:'/home'},
    {id:2,title:'云村',to:'/'},
    {id:3,title:'视频',to:'/'},
  ])

  // 导航栏切换
  function handleNav(nav) {
    active.value = nav.id;
    router.push(nav.to);
    localStorage.setItem('tapBar', active.value);
  }

  watch(active, (val) => {
    router.push(navList[val].to);
    localStorage.setItem('tapBar', val);
  })

  // 底部动作面板数据
  const actions = [
    { name: '退出登录' },
  ]
  // 动作面板选项点击事件
  async function onSelect(item) {
    // 退出登录
    if (item.name == '退出登录') {
      await logout();
      userStore.removeCookie();
      userStore.isLogin = false;
      showBottom.value = false;
    }
  }

</script>

<style lang="scss" scoped>
.home-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .nav-list {
    span {
      padding: 0 10px;
      font-size: 18px;
      &.active {
        font-weight: bold;
        color: #dd001b;
      }
    }
  }
}
.container {
  :deep(.van-tabs__wrap) {
    display: none;
  }
}
</style>
