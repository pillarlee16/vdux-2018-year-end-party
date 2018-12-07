import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Mobile from './mobile/index.vue';
import Screen from './screen/index.vue';
import Admin from './admin/index.vue';
import store from './store/index.js'

Vue.use(VueRouter)
Vue.config.productionTip = false


const routes = [
  { path: '/', name: 'mobile-page', component: Mobile },
  { path: '/screen', name: 'screen-page', component: Screen },
  { path: '/admin', name: 'admin-page', component: Admin },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
