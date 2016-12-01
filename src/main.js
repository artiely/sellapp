import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueResource)
Vue.use(VueRouter)




// 引入路由（路由是一个对象）
//把整个路由配置单立成一个文件引入
// import Routerconfig from './routerconfig.js'(这里路径必须是绝对路径)
import Routerconfig from './routerconfig.js'

//这里就是routerconfig.js返回的路由
const router = new VueRouter(Routerconfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
