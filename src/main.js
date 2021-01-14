import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import './assets/fonts/iconfont.js'
import axios from 'axios'


Vue.config.productionTip = false

// 后端请求的配置
// Vue.prototype.$http = axios
// axios.defaults.baseURL = "后端接口"
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
