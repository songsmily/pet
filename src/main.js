import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from "./store"
import layer from 'vue-layer'
import util from "./utils/util"
import adminUtil from "./utils/adminUtil"
import { Button, Select ,Dialog,Message,MessageBox} from 'element-ui';
import { Modal,Tabs,LoadingBar,Notification} from "at-ui";
Vue.use(Dialog,Tabs,Modal)
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$Notify= Notification
Vue.prototype.$axios = axios
Vue.prototype.$util =  util
Vue.prototype.$adminUtil =  adminUtil
Vue.config.productionTip = false
// axios.defaults.baseURL="http://localhost:8099/"
// axios.defaults.withCredentials=true;
new Vue({
  el:"#app",
  render: h => h(App),
  router:router,
  store:store
})


