import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 导入全局组件
import Vue3Marquee from 'vue3-marquee'
import IconNav from './components/IconNav.vue'
import BaseIcon from './components/BaseIcon.vue'

import 'vue3-marquee/dist/style.css'
import './styles/index.scss'
// 导入字体图标
import '@/assets/iconfont/iconfont.css';
// import 'amfe-flexible'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3Marquee)
  .component(IconNav.name ,IconNav)
  .component(BaseIcon.name ,BaseIcon)
  .mount('#app')
