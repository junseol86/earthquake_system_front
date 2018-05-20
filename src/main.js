import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
  render: h => h(App)
}).$mount('#app')
