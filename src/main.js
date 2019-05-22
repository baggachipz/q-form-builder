import Vue from 'vue'
import App from './App.vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import Quasar from 'quasar'

Vue.use(Quasar, {
  config: {}
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
