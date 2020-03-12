import Vue from 'vue'
import App from './App.vue';

Vue.config.productionTip = false

// 导入语路由
import router from './router'

// 导入全局默认基础样式
import './assets/css/base.css'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
