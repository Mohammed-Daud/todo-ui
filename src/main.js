// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Master from './components/layout/Master'
import Auth from './packages/auth/Auth'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueFlashMessage from 'vue-flash-message';
require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.use(VueFlashMessage);

Vue.config.productionTip = false

Vue.use(Auth);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Master },
  template: '<Master/>'
})
