import { createRouter,createWebHashHistory } from "vue-router";
import MusicControl from '@/components/MusicControl/index.vue';

// 创建路由规则
const routes = [{
    path: '/',
    component: MusicControl,
    children: [{
      path: '',
      component: ()=>import('@/views/Home/index.vue')
    }]
  }, {
    path: '/playlistdetail',
    component: MusicControl,
    children: [{
      path: '',
      component: ()=>import('@/views/PlayListDetail/index.vue')
    }]
  }, {
    path: '/search',
    component: MusicControl,
    meta: {
      hidden: true
    },
    children: [{
      path: '',
      component: ()=>import('@/views/Search/index.vue'),
    }]
  }]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;