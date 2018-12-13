import Vue from 'vue'
import App from './App.vue'

import store from 'ui-common/store/index.js'
import Keyboard from 'ui-common/services/Keyboard.js';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
