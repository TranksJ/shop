import Vue from 'vue'
import App from './App.vue'
// 引入路由组件
import router from './router'
// 引入饿了么组件
import './plugins/element.js'
// 引入全局css
import './assets/css/global.css'
// 引入axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://localhost/'
// axios 挂载到vue原型对象上，使用
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
