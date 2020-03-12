// 导入vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// use一下
Vue.use(VueRouter)

// 导入组件
import login from '../views/login'
import home from '../views/home'

// 准备路由规则
const routes = [
  { path: '/login', component: login },
  { path: '/home', component: home },
]

// 创建路由对象
const router = new VueRouter({
  routes
})


// 暴露路由
export default router;