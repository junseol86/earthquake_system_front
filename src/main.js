import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

export const bus = new Vue()
Vue.prototype.$bus = bus
Vue.prototype.$axios = axios
Vue.prototype.$serverApi = 'http://35.229.252.63:8080/'

new Vue({
  render: h => h(App)
}).$mount('#app')
