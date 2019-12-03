import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from "./store"
// import "skplayer/dist/skPlayer.min"
Vue.config.productionTip = false
axios.defaults.baseURL="http://localhost:8099/"
new Vue({
  el:"#app",
  render: h => h(App),
  router:router,
  store:store
})

