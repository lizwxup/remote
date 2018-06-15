import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import iView from 'iview'
import Vuex from 'vuex'
import $ from 'jquery'
import http from "./utils/https.js"; 
import store from './vuex/store' 
import 'babel-polyfill'
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import dateTransfer from "./utils/dateFormat.js"; 
import common from "./utils/common.js";  //公共方法
import dock from "./utils/dataDocking.js";  //公共方法
//import '../theme/index.css'
//import '../static/style/commonMain.less'
import './mythemes/index.less';
import './mythemes/commonMain.less';

//公共组件
//import Aside from './components/Common/Aside'
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.http = http
Vue.prototype.dateTransfer = dateTransfer
Vue.prototype.common = common
Vue.prototype.dock = dock
console.log(dock)
Vue.use(ElementUI)
Vue.use(iView);
Vue.use(Vuex)
//Vue.component('Aside', Aside)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
