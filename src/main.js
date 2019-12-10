import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from "./store"
import layer from 'vue-layer'

import { Button, Select ,Dialog} from 'element-ui';
import { Modal,Tabs} from "at-ui";
Vue.use(Dialog,Tabs,Modal)
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false
// axios.defaults.baseURL="http://localhost:8099/"
// axios.defaults.withCredentials=true;
new Vue({
  el:"#app",
  render: h => h(App),
  router:router,
  store:store
})

