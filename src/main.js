import Vue from 'vue'
import './plugins/axios'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'particles.js';
import particleJSON from './assets/particles.json';

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



window.particlesJS('app', particleJSON);
