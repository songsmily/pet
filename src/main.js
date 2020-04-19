import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from "./store"
import layer from 'vue-layer'
import util from "./utils/util"
import adminUtil from "./utils/adminUtil"
import { Button, Select ,Dialog,Message,MessageBox,Alert} from 'element-ui';
import { Modal,Tabs,LoadingBar,Notification} from "at-ui";
import { NavBar as VanNavBar, Sticky,Icon as AntIcon, Popup as AntPopup, ActionSheet as AntActionSheet,Toast,Form as VanForm,
        Field as VanField, Button as VanButton, Picker as VanPicker, Calendar as VanCalendar, DatetimePicker as VanDatetimePicker,
        RadioGroup as VanRadioGroup, Radio as VanRadio, Uploader as VanUploader,Notify as VanNotify,Tag as VanTag ,Dialog as VanDialog, Divider as VanDivider,
        Cell as VanCell, CellGroup as VanCellGroup, Panel as VanPanel,Collapse as VanCollapse, CollapseItem  as VanCollapseItem} from 'vant';

Vue.use(VanNavBar).use(Sticky).use(AntIcon).use(AntPopup).use(AntActionSheet).use(VanForm).use(VanField).use(VanButton).use(VanPicker).use(VanCalendar)
    .use(VanDatetimePicker).use(VanRadioGroup).use(VanRadio).use(VanUploader).use(VanTag).use(VanDivider).use(VanCell).use(VanCellGroup).use(VanPanel)
    .use(VanCollapse).use(VanCollapseItem);
Vue.use(Dialog,Tabs,Modal)
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.prototype.$Toast = Toast
Vue.prototype.$VanNotify = VanNotify
Vue.prototype.$VanDialog = VanDialog
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$Alert = MessageBox;
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


