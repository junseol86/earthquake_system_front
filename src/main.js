import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import util from './util'
import querystring from 'query-string'
import cookie from 'js-cookie'

Vue.config.productionTip = false

export const bus = new Vue()
Vue.prototype.$bus = bus
Vue.prototype.$axios = axios
Vue.prototype.$serverApi = 'http://35.229.252.63:8080/'
// Vue.prototype.$serverApi = 'http://localhost:8080/'
Vue.prototype.$util = util
Vue.prototype.$qs = querystring
Vue.prototype.$cookie = cookie

new Vue({
  render: h => h(App)
}).$mount('#app')
