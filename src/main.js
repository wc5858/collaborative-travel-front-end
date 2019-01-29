import Vue from 'vue'
import App from './App'
import util from '@/utils/index';

Vue.prototype.$callApi = util.callApi;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
