import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 导入全局自定义组件
import IconNav from './components/IconNav.vue'
import MusicControl from './components/MusicControl.vue'

import './styles/index.scss'
// import 'amfe-flexible'

createApp(App)
  .use(router)
  .use(createPinia())
  .component(IconNav.name ,IconNav)
  .component(MusicControl.name ,MusicControl)
  .mount('#app')
