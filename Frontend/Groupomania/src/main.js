import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import {
  FormGroupPlugin
} from 'bootstrap-vue'


// import {
//   library
// } from '@fortawesome/fontawesome-svg-core'
// import {
//   fas
// } from '@fortawesome/free-solid-svg-icons'
// import {
//   FontAwesomeIcon
// } from '@fortawesome/vue-fontawesome'

// library.add(fas)
// Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(FormGroupPlugin)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')