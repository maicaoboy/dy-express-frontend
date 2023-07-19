import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './utils/error-log' // error log
import request from '@/utils/request'

import * as filters from './filters' // global filters
import { hasPermission, hasNoPermission, hasAnyPermission } from './utils/permissionDirect'
import BaiduMap from 'vue2-baidu-map'

import moment from 'moment'
Vue.prototype.$moment = moment

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'U9u1roqcdMuofmIqs8Tl6Lk31ybdrUqC'
})

import Vuex from 'vuex'
Vue.use(Vuex)

const Plugins = [
  hasPermission,
  hasNoPermission,
  hasAnyPermission
]

Plugins.map((plugin) => {
  Vue.use(plugin)
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$post = request.post
Vue.prototype.$get = request.get
Vue.prototype.$put = request.put
Vue.prototype.$delete = request.delete
Vue.prototype.$download = request.download
Vue.prototype.$upload = request.upload
Vue.prototype.$login = request.login

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
