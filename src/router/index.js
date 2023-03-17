import { createRouter,createWebHashHistory } from "vue-router";
import TapBar from '@/components/TapBar.vue';

// 创建路由规则
// const routes = [{
//     path: '/',
//     component: ()=>import('@/views/Home/index.vue')
//   }, {
//     path: '/playlistdetail',
//     component: ()=>import('@/views/PlayListDetail/index.vue')
//   }, {
//     path: '/search',
//     meta: {
//       hidden: true
//     },
//     component: ()=>import('@/views/Search/index.vue'),
//     children: [{
//       path: '',
//       component: ()=>import('@/views/Search/SearchHistory.vue')
//     }, {
//       path: 'list',
//       component: ()=>import('@/views/Search/SearchList.vue')
//     }]
//   }]

const routes = [{
  path: '/',
  component: TapBar,
  children: [{
    path: '',
    component: ()=>import('@/views/Home/index.vue')
  }, {
    path: 'home',
    component: ()=>import('@/views/Home/index.vue')
  }, {
    path: 'user',
    component: ()=>import('@/views/User/index.vue')
  }]
}, {
  path: '/playlistdetail',
  component: ()=>import('@/views/PlayListDetail/index.vue')
}, {
  path: '/search',
  meta: {
    hidden: true
  },
  component: ()=>import('@/views/Search/index.vue'),
  children: [{
    path: '',
    component: ()=>import('@/views/Search/SearchHistory.vue')
  }, {
    path: 'list',
    component: ()=>import('@/views/Search/SearchList.vue')
  }]
}]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;